# Sistema de Backfill

O mecanismo de backfill é responsável por manter a integridade e a qualidade dos dados armazenados pela Beako.

Em vez de depender exclusivamente do processamento em tempo real, a plataforma utiliza rotinas de reconciliação capazes de identificar informações ausentes, corrigir inconsistências e complementar registros derivados de forma contínua.

Arquivo principal:

```text
src/core/db/backfill.ts
```

## Visão Geral

Nem todos os dados podem ser resolvidos imediatamente durante o recebimento de eventos.

O backfill atua como uma camada de recuperação e enriquecimento responsável por revisar registros existentes e preencher informações que estejam incompletas ou defasadas.

Entre suas responsabilidades estão:

* associação de identidades
* correção de relacionamentos entre entidades
* enriquecimento de registros de mídia
* atualização de metadados derivados
* manutenção da consistência histórica

## Formas de Execução

### Modo Contínuo

Recomendado para ambientes de produção.

Neste modo o processo permanece ativo, executando ciclos periódicos de verificação e correção.

Vantagens:

* manutenção constante da qualidade dos dados
* menor volume de pendências acumuladas
* recuperação automática após falhas temporárias
* processamento incremental

### Modo Manual

Executa apenas uma passagem e encerra ao concluir o trabalho pendente.

Exemplo:

```bash
WA_BACKFILL_ONCE=true npm run db:backfill
```

Esse modo é útil para validações e intervenções específicas.

## Controle de Progresso

Para evitar reprocessamentos desnecessários, o sistema registra seu avanço através da tabela:

```text
backfill_checkpoints
```

Os checkpoints permitem:

* retomada após interrupções
* execução incremental
* redução de carga no banco
* controle preciso do estado de cada etapa

## Funcionamento Interno

O worker opera através de ciclos independentes.

Cada ciclo pode executar múltiplas rotinas de correção utilizando lotes configuráveis de registros.

Características gerais:

* processamento em batches
* execução por etapas
* métricas operacionais
* logs detalhados
* tolerância a dados parcialmente preenchidos
* enriquecimento progressivo

## Rotinas Executadas

Dependendo da configuração e do estado atual do banco, o backfill pode realizar operações como:

### Identidade

* consolidação de identificadores
* vinculação entre usuários e registros derivados
* preenchimento de relacionamentos pendentes

### Mensagens

* atualização de `sender_user_id`
* correção de vínculos entre eventos e mensagens
* reconciliação de históricos

### Contatos e Conversas

* atualização de nomes visíveis
* sincronização de informações derivadas
* complementação de relacionamentos entre chats e usuários

### Mídia

* atualização de metadados locais
* preenchimento de atributos ausentes
* validação de arquivos armazenados

## Prioridades Atuais

As etapas mais importantes do ciclo atual concentram-se em melhorar a qualidade dos dados de identificação e exibição.

Campos priorizados:

1. `wa_contacts_cache.user_id`
2. `lid_mappings.user_id`
3. `users.display_name`
4. `wa_contacts_cache.display_name`
5. `chats.display_name`

Esses campos impactam diretamente:

* execução de comandos
* auditoria
* observabilidade
* análise de eventos
* suporte operacional

## Enriquecimento de Mídia

Quando o download automático de mídia está habilitado:

```env
WA_MEDIA_AUTO_DOWNLOAD=true
```

O worker pode utilizar arquivos armazenados localmente para preencher atributos adicionais.

Exemplos:

* `message_media.file_length`
* `message_media.file_name`

As informações são extraídas diretamente do conteúdo já disponível no sistema.

## Boas Práticas

Antes de executar operações extensivas de backfill, recomenda-se:

* possuir backup atualizado do banco
* acompanhar o tempo médio dos ciclos
* monitorar consumo de recursos
* revisar métricas após alterações de configuração

Em ambientes com grande volume de dados, o tamanho dos lotes deve ser ajustado conforme a capacidade do banco.

## Ferramentas Relacionadas

Executar backfill:

```bash
npm run db:backfill
```

Verificar integridade:

```bash
npm run db:verify
```

Inspecionar campos pendentes:

```bash
npm run db:nulls
```

## Cenários de Uso para Execução Manual

O modo manual é recomendado quando for necessário:

* validar alterações recentes
* corrigir dados após incidentes
* testar novas regras de preenchimento
* medir impacto de mudanças antes da ativação permanente

## Documentação Relacionada

* Banco de Dados
* Persistência
* Ambiente de Produção
* Diagnóstico e Recuperação

---

**Beako Wiki** • Última atualização: 12/06/2026
