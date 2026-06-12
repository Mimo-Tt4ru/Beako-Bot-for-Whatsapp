# Beako Command System

Documentação central da arquitetura da Beako.

Este guia reúne os conceitos fundamentais relacionados a:

* sistema modular de comandos
* persistência de dados com MySQL
* práticas operacionais da plataforma
* diretrizes de expansão e manutenção

O objetivo deste documento é servir como referência principal para desenvolvedores e mantenedores do projeto.

## Visão Geral

A plataforma Beako foi construída para:

* processar eventos do WhatsApp em tempo real
* executar comandos independentes da camada de transporte
* fornecer persistência consistente e rastreável
* suportar múltiplas conexões de forma isolada
* facilitar futuras expansões do ecossistema

## Sistema de Comandos

### Conceito

A arquitetura de comandos abstrai completamente o acesso direto ao socket do WhatsApp.

Cada comando recebe um objeto `CommandContext` (`ctx`), responsável por disponibilizar todas as operações necessárias para interação com a plataforma.

Essa abordagem oferece diversas vantagens:

* menor dependência da implementação de transporte
* padronização das operações mais utilizadas
* manutenção simplificada
* preparação para plugins, middlewares e carregamento dinâmico
* redução significativa de código duplicado

### Ciclo de Execução

Fluxo padrão de processamento:

1. Um evento é recebido e normalizado.
2. O processador identifica o comando e seus argumentos.
3. O runtime cria o contexto de execução.
4. O comando é executado de forma isolada.
5. Logs, métricas e tratamento de erros são processados pela camada central.

Arquivos principais:

* `src/core/command-runtime/context.ts`
* `src/core/command-runtime/processor.ts`
* `src/core/command-runtime/admin.ts`
* `src/commands/types.ts`
* `src/commands/`

### Estrutura Base

```ts
export type Command = {
  name: string
  description: string
  execute: (ctx: CommandContext) => Promise<void>
}
```

### Recursos Disponíveis

O contexto disponibiliza funcionalidades comuns para os comandos:

* `ctx.reply(text)`
* `ctx.react(emoji)`
* `ctx.isAdmin()`
* `ctx.kick(jid | jids)`
* `ctx.ban(jid | jids)`
* `ctx.promote(jid | jids)`
* `ctx.demote(jid | jids)`
* `ctx.admin.*`
* `ctx.isGroup`
* `ctx.args`
* `ctx.text`
* `ctx.sender`
* `ctx.chatId`

A maioria das operações pode ser realizada sem acesso direto ao socket principal.

### Exemplo

```ts
import type { Command } from './types.js'

export const ola: Command = {
  name: 'ola',
  description: 'Comando de demonstração',

  async execute(ctx) {
    await ctx.react('👋')
    await ctx.reply(`Olá @${ctx.sender.split('@')[0]}`)
  },
}
```

## Persistência de Dados

### Diretrizes

O modelo de dados da Beako segue alguns princípios fundamentais:

* isolamento por conexão
* identidade desacoplada de JID, PN e LID
* armazenamento de payloads completos para auditoria
* rastreabilidade nativa de operações e eventos

### Estrutura de Domínios

#### Conexão e autenticação

* `connections`
* `auth_creds`
* `signal_keys`

#### Identidade

* `users`
* `user_identifiers`
* `user_aliases`
* `lid_mappings`
* `user_devices`

#### Estado do WhatsApp

* `chats`
* `wa_contacts_cache`
* `groups`
* `group_participants`

#### Mensagens

* `messages`
* `message_media`
* `message_text_index`
* `message_users`
* `chat_users`

#### Eventos e auditoria

* `events_log`
* `events_log_archive`
* `message_events`
* `group_events`
* `commands_log`
* `message_failures`
* `bot_sessions`

#### Recursos auxiliares

* `labels`
* `label_associations`
* `blocklist`

#### Newsletters

* `newsletters`
* `newsletter_participants`
* `newsletter_events`

#### Stickers

* `user_sticker_templates`
* `user_generated_stickers`

#### Solicitações de entrada

* `group_join_requests`

### Benefícios

* separação segura entre múltiplas conexões
* histórico consistente de atividades
* suporte facilitado por trilhas de auditoria
* consultas rápidas através de índices especializados
* flexibilidade para evolução do schema

### Considerações

* `db:init` cria estruturas inexistentes, mas não altera tabelas existentes
* tabelas de mensagens e eventos podem crescer rapidamente
* payloads armazenados em JSON podem exigir índices específicos para consultas complexas

## Operação

### Scripts

```bash
npm run db:init
```

Cria estruturas ausentes no banco.

```bash
npm run db:verify
```

Executa verificações de integridade.

```bash
npm run pm2:start
```

Inicializa a aplicação em ambiente de produção.

### Variáveis de Ambiente

* `WA_COMMAND_PREFIX`
* `WA_CONNECTION_ID`
* `WA_CONNECTION_IDS`
* `MYSQL_URL`
* `WA_REDIS_URL`

## Próximos Passos

Melhorias recomendadas para futuras versões:

1. implementação de middlewares globais
2. carregamento dinâmico de comandos
3. sistema formal de migrações
4. políticas automáticas de retenção e arquivamento
5. ampliação de métricas e observabilidade

## Documentação Complementar

### Modelo de Banco de Dados

* `docs/exemplodbmodel.md`

### Wiki

* `docs/wiki/Home.md`
