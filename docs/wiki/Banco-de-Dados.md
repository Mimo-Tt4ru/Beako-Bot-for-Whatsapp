# Estrutura de Banco de Dados

O banco de dados é uma das camadas centrais da Beako, responsável por armazenar informações persistentes utilizadas pelo sistema durante sua operação.

Toda a estrutura foi projetada para oferecer rastreabilidade, recuperação de estado, auditoria e suporte a múltiplas conexões simultâneas.

A definição completa das tabelas e relacionamentos pode ser encontrada em:

```text
docs/exemplodbmodel.md
```

## Visão Geral

A plataforma utiliza o MySQL 8 como armazenamento principal de longo prazo.

Enquanto memória e cache são utilizados para acelerar operações temporárias, o banco mantém os dados que precisam sobreviver a reinicializações, falhas e processos de manutenção.

Entre as responsabilidades do banco estão:

* armazenamento de sessões
* gerenciamento de identidades
* histórico de mensagens
* metadados de mídia
* eventos operacionais
* auditoria de comandos
* gerenciamento de grupos e contatos
* suporte ao processo de backfill

## Isolamento por Conexão

Grande parte das tabelas utiliza o campo:

```text
connection_id
```

Esse identificador permite separar completamente os dados pertencentes a diferentes instâncias da Beako.

Benefícios:

* compartilhamento seguro de um único banco
* separação entre ambientes e sessões
* auditoria individualizada
* manutenção sem interferência entre instâncias

## Estratégia de Armazenamento

A modelagem segue uma abordagem híbrida.

Os registros armazenam simultaneamente:

### Dados Originais

Payloads completos em formato JSON para preservar informações recebidas do WhatsApp.

### Dados Estruturados

Colunas derivadas e relacionais destinadas a consultas rápidas, filtros, relatórios e processamento interno.

Essa combinação oferece flexibilidade sem abrir mão de desempenho.

## Organização do Schema

### Sessão e Autenticação

Responsável por armazenar credenciais e informações necessárias para manter conexões ativas.

Tabelas:

* `connections`
* `auth_creds`
* `signal_keys`

---

### Sistema de Identidade

Camada responsável por unificar diferentes formas de identificação de um mesmo usuário.

Tabelas:

* `users`
* `user_identifiers`
* `user_aliases`
* `lid_mappings`
* `user_devices`

Permite relacionar:

* JID
* número de telefone
* LID
* aliases
* dispositivos

a um único registro lógico.

---

### Conversas e Mensagens

Conjunto responsável pelo armazenamento de interações.

Tabelas:

* `chats`
* `messages`
* `message_media`
* `message_text_index`
* `message_users`
* `chat_users`
* `message_events`
* `message_failures`

Funções principais:

* histórico de mensagens
* indexação textual
* rastreamento de mídia
* associação entre usuários e conversas

---

### Grupos

Responsável pela estrutura social dos grupos monitorados pela plataforma.

Tabelas:

* `groups`
* `group_participants`
* `group_events`
* `group_join_requests`
* `group_config`

---

### Logs e Auditoria

Camada dedicada à observabilidade do sistema.

Tabelas:

* `events_log`
* `events_log_archive`
* `commands_log`
* `bot_sessions`
* `blocklist`
* `labels`
* `label_associations`

Esses registros auxiliam em:

* monitoramento
* investigação de falhas
* suporte técnico
* análise operacional

---

### Newsletters e Canais

Tabelas:

* `newsletters`
* `newsletter_participants`
* `newsletter_events`

---

### Componentes Auxiliares

Tabelas utilizadas por funcionalidades complementares.

* `user_sticker_templates`
* `user_generated_stickers`
* `backfill_checkpoints`

## Componentes Fundamentais

### messages

Principal tabela de armazenamento de mensagens.

Contém identificadores, informações derivadas e o conteúdo bruto necessário para reconstrução histórica.

### message_media

Mantém informações relacionadas a arquivos enviados e recebidos.

Quando o download automático está ativo, também registra caminhos locais e atributos derivados dos arquivos.

### user_identifiers

Elemento central da camada de identidade.

Permite vincular diferentes identificadores de um mesmo usuário sem depender exclusivamente de números ou JIDs.

### events_log

Registro geral das atividades observadas pelo runtime.

Utilizado para monitoramento, análise e recuperação de informações operacionais.

### commands_log

Histórico de execução dos comandos processados pela plataforma.

### backfill_checkpoints

Responsável pelo acompanhamento do progresso das rotinas de backfill.

Permite retomadas seguras sem necessidade de reprocessar todo o banco.

## Por Que Utilizar um Banco Relacional?

Embora caches e estruturas em memória sejam importantes para desempenho, eles não substituem a função do banco de dados.

O MySQL fornece:

* persistência permanente
* histórico completo
* relacionamentos consistentes
* capacidade de auditoria
* recuperação após falhas
* base para processos de reconciliação

## Ferramentas de Administração

Comandos frequentemente utilizados:

```bash
npm run db:init
npm run db:verify
npm run db:nulls
npm run db:backfill
npm run db:delete-session
npm run db:repair-group-participants
```

## Evolução da Estrutura

A estratégia atual prioriza:

* inicialização segura e repetível
* alterações compatíveis com ambientes existentes
* redução de operações destrutivas
* correção posterior através de processos automatizados

Essa abordagem facilita atualizações contínuas sem comprometer a estabilidade do sistema.

## Consulte Também

* Persistência
* Backfill
* Produção
* `docs/exemplodbmodel.md`

---

**Documentação Técnica Beako**

---

**Beako Wiki** • Última atualização: 12/06/2026
