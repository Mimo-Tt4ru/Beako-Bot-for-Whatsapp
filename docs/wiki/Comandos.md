# Runtime de Comandos

Esta documentação descreve como a Beako processa comandos durante a execução da aplicação.

Caso esteja procurando apenas a lista de comandos disponíveis, consulte:

* `Comandos - Referência`

Para informações mais detalhadas sobre implementação e arquitetura interna:

* `docs/README-COMMANDS.md`

---

## Estrutura Geral

O sistema de comandos da Beako foi desenvolvido para manter os handlers desacoplados da camada de transporte, permitindo que a lógica de negócio permaneça organizada e independente do socket principal.

Arquivos centrais do subsistema:

```text id="d8w4kj"
src/commands/
src/commands/index.ts
src/core/command-runtime/context.ts
src/core/command-runtime/processor.ts
src/router/index.ts
```

Responsabilidades:

| Componente          | Função                              |
| ------------------- | ----------------------------------- |
| `commands/`         | Implementação dos comandos          |
| `commands/index.ts` | Registro central                    |
| `context.ts`        | Contexto compartilhado dos comandos |
| `processor.ts`      | Processamento e execução            |
| `router/`           | Controle de filas e ordenação       |

---

## Como uma Mensagem é Processada

O fluxo padrão ocorre da seguinte forma:

1. Uma nova mensagem é recebida.
2. O sistema identifica eventos elegíveis para processamento.
3. O router encaminha a mensagem para a fila correspondente.
4. O processor analisa prefixo, argumentos e comando solicitado.
5. Regras automáticas do runtime são avaliadas.
6. O comando é executado através de um `CommandContext`.
7. Logs, métricas e registros persistentes são atualizados quando necessário.

Essa separação permite que múltiplos chats sejam processados simultaneamente sem comprometer a ordem das mensagens dentro de uma mesma conversa.

---

## Controle de Filas

Para evitar congestionamento e consumo excessivo de recursos, o runtime utiliza filas independentes para cada conversa.

Características:

* ordenação por chat
* isolamento entre conversas
* controle de pendências
* proteção contra sobrecarga

Configurações disponíveis:

```env id="jfjk3u"
WA_ROUTER_MAX_PENDING_PER_QUEUE
```

Essa configuração limita quantas tarefas podem ficar aguardando execução em cada fila.

---

## Timeout de Execução

Comandos não devem permanecer executando indefinidamente.

Para evitar bloqueios, cada execução possui um limite máximo configurável.

Variável utilizada:

```env id="1jfo3d"
WA_COMMAND_TIMEOUT_MS
```

Quando o tempo máximo é atingido, a execução é encerrada e registrada pelo sistema.

---

## Contexto de Execução

Todos os comandos recebem um objeto de contexto responsável por fornecer acesso controlado aos recursos da plataforma.

Exemplos de informações disponíveis:

* identificador do chat
* remetente da mensagem
* argumentos recebidos
* conteúdo textual
* status de grupo

Exemplos de ações disponíveis:

* responder mensagens
* reagir com emojis
* enviar mídia
* executar ações administrativas
* acessar mensagens citadas
* utilizar recursos auxiliares do runtime

A utilização do contexto reduz dependências diretas e facilita a manutenção do código.

---

## Sistema Anti-Link

O Anti-Link possui dois papéis distintos dentro da plataforma.

### Configuração

O recurso pode ser administrado através do comando:

```text id="2u8m4s"
!antilink
```

Entre as opções disponíveis estão:

* ativar proteção
* desativar proteção
* permitir domínios específicos
* controlar exceções para convites do grupo

---

### Fiscalização Automática

Quando habilitado, o runtime passa a analisar mensagens enviadas no grupo.

Dependendo da configuração, o sistema pode:

* identificar links externos
* ignorar domínios autorizados
* aceitar links do próprio grupo
* aplicar regras diferentes para administradores
* remover mensagens
* remover participantes infratores
* executar ações complementares definidas pelo sistema

Dessa forma, o Anti-Link funciona como uma política automática aplicada continuamente, não apenas como um comando de configuração.

---

## Registro de Comandos

A lista oficial de comandos ativos é determinada pelo registry central:

```text id="d6ut4w"
src/commands/index.ts
```

Consequências práticas:

* o menu é gerado dinamicamente
* aliases dependem do registro atual
* novos comandos precisam ser adicionados ao registry
* a documentação deve acompanhar as alterações realizadas

---

## Recomendações para Desenvolvimento

Ao criar ou modificar comandos, recomenda-se:

* validar permissões logo no início
* verificar disponibilidade de mídia antes do processamento
* fornecer respostas claras ao usuário
* evitar dependências externas desnecessárias
* centralizar regras compartilhadas no runtime
* manter o comando focado em uma única responsabilidade

Essas práticas tornam o sistema mais previsível e fácil de manter.

---

## Documentação Relacionada

* Comandos - Referência
* Eventos
* Persistência
* README-COMMANDS

---

**Beako Runtime Documentation**

---

**Beako Wiki** • Última atualização: 12/06/2026
