# Catálogo de Comandos

Esta página reúne os comandos atualmente disponíveis na Beako.

Os comandos são carregados através do registry localizado em:

```text
src/commands/index.ts
```

O prefixo utilizado pelo bot pode variar conforme a configuração definida em:

```env
WA_COMMAND_PREFIX
```

Para informações sobre permissões, processamento interno, tempo limite de execução e recursos automáticos como Anti-Link, consulte a documentação da arquitetura de comandos.

---

## Informações Gerais

### Comandos Administrativos

Alguns comandos exigem permissões elevadas dentro do grupo.

Para que a operação seja executada com sucesso normalmente é necessário:

* o usuário possuir privilégios administrativos
* o bot possuir permissões compatíveis
* o comando ser executado dentro de um grupo

### Formatos de Alvo

Dependendo do comando, usuários podem ser identificados por:

* número de telefone
* menção direta
* resposta a uma mensagem

Exemplos:

```text
5511999999999
@usuario
(responder uma mensagem)
```

---

# Utilitários

## check

Verifica se a instância está online e respondendo normalmente.

Exemplo:

```text
?check
```

---

## menu

Exibe os comandos atualmente registrados no sistema.

Exemplo:

```text
?menu
```

---

# Figurinhas e Conversão de Mídia

## sticker

Aliases:

```text
?sticker
?s
?st
```

Cria uma figurinha a partir de uma imagem, vídeo ou mídia compatível.

A mídia pode ser obtida através de:

* legenda da própria mídia
* resposta a uma mensagem
* conteúdo recente identificado pelo runtime

Exemplos:

```text
?s
?s Minha Figurinha
?s Pack Especial
```

Ajuda rápida:

```text
?s -h
?s --help
```

Observações:

* suporta personalização de pacote
* pode reutilizar modelos previamente salvos
* possui limites operacionais definidos pelo sistema

---

## toimg

Converte uma figurinha para imagem.

Uso:

```text
?toimg
```

Normalmente requer responder a uma figurinha existente.

---

## togif

Converte uma figurinha animada para GIF.

Uso:

```text
?togif
```

Normalmente requer responder a uma figurinha.

---

# Administração de Grupos

## antilink

Gerencia o sistema de proteção contra links.

Exemplos:

```text
?antilink
?antilink on
?antilink off
```

Controle de links de convite:

```text
?antilink invite on
?antilink invite off
```

Gerenciamento de domínios permitidos:

```text
?antilink allow list
?antilink allow add exemplo.com
?antilink allow remove exemplo.com
```

Funções:

* visualizar configuração atual
* ativar ou desativar proteção
* controlar exceções para convites
* administrar whitelist de domínios

---

## add

Adiciona participantes ao grupo.

Exemplos:

```text
?add 5511999999999
?add @usuario
```

---

## kick

Remove participantes do grupo.

Exemplos:

```text
?kick @usuario
?kick 5511999999999
```

---

## ban

Executa a remoção de um participante.

Exemplo:

```text
?ban @usuario
```

---

## promote

Concede privilégios administrativos.

Exemplo:

```text
?promote @usuario
```

---

## demote

Remove privilégios administrativos.

Exemplo:

```text
?demote @usuario
```

---

## grupo

Controla o envio de mensagens.

Exemplos:

```text
?grupo on
?grupo off
```

---

## lock

Controla quem pode editar informações do grupo.

Exemplos:

```text
?lock on
?lock off
```

---

## assunto

Atualiza o nome do grupo.

Exemplo:

```text
?assunto Equipe de Desenvolvimento
```

---

## descricao

Define ou remove a descrição do grupo.

Exemplos:

```text
?descricao Regras e avisos importantes
?descricao limpar
```

---

## linkgrupo

Mostra o link de convite ativo.

Exemplo:

```text
?linkgrupo
```

---

## revogarlink

Gera um novo link de convite e invalida o anterior.

Exemplo:

```text
?revogarlink
```

---

## ephemeral

Gerencia mensagens temporárias.

Exemplos:

```text
?ephemeral off
?ephemeral 24h
?ephemeral 7d
?ephemeral 90d
```

Também aceita valores em segundos:

```text
?ephemeral 604800
```

---

# Situações Comuns

O sistema pode recusar a execução de um comando quando:

* não estiver em um grupo
* o usuário não possuir permissão suficiente
* o bot não possuir privilégios necessários
* a mídia necessária não estiver disponível
* o alvo informado não puder ser identificado

---

# Atualização da Documentação

Sempre que houver alterações no registry de comandos (`src/commands/index.ts`), recomenda-se revisar esta página para manter a documentação sincronizada com a implementação atual.

---

**Beako Wiki · Referência de Comandos**


---

**Beako Wiki** • Última atualização: 12/06/2026
