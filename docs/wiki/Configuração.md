# Configuração da Plataforma

Esta documentação reúne as principais configurações utilizadas pela Beako durante a execução.

As definições padrão podem ser consultadas em:

```text
.env.example
```

O carregamento das configurações é realizado principalmente pelos seguintes módulos:

```text
src/config/index.ts
src/index.ts
```

Esses componentes são responsáveis pela leitura, validação e aplicação dos parâmetros definidos no ambiente.

---

# Arquitetura Multi-Conexão

A Beako foi desenvolvida para operar tanto com uma única sessão quanto com múltiplas conexões simultâneas.

Ao longo da documentação, três nomenclaturas podem aparecer:

| Nome               | Descrição                   |
| ------------------ | --------------------------- |
| `WA_CONNECTION_ID` | Variável de ambiente        |
| `connection_id`    | Identificador persistido    |
| `connectionId`     | Nome utilizado internamente |

Cada conexão possui seu próprio espaço lógico de dados, permitindo isolamento entre sessões e ambientes.

---

## Processo de Descoberta de Sessões

Durante a inicialização, o sistema procura conexões seguindo a seguinte ordem:

### 1. Lista explícita

```env
WA_CONNECTION_IDS
```

Quando definida, esta configuração possui prioridade máxima.

---

### 2. Sessões armazenadas

Caso nenhuma lista seja informada, a aplicação tenta localizar sessões persistidas através do banco de dados.

---

### 3. Modo legado

Se nenhuma sessão for encontrada, o sistema utiliza:

```env
WA_CONNECTION_ID
```

como fallback.

---

## Impacto do Connection ID

Esse identificador influencia diretamente:

* autenticação
* armazenamento de sessões
* cache Redis
* auditoria
* persistência SQL
* configurações de grupos
* checkpoints de backfill
* reconciliação de identidade

---

# Estratégia de Persistência de Sessão

A Beako suporta múltiplas fontes de armazenamento para credenciais.

A ordem de prioridade é:

1. MySQL
2. Redis
3. Arquivos locais

Quando uma estratégia superior não está disponível, mecanismos de fallback podem ser utilizados para preservar a continuidade da operação.

---

# Variáveis de Ambiente

## Configurações Gerais

Controlam comportamento básico da aplicação.

* `WA_CONNECTION_ID`
* `WA_CONNECTION_IDS`
* `WA_COMMAND_PREFIX`
* `WA_PRINT_QR`
* `LOG_LEVEL`
* `WA_ACCEPT_OWN_MESSAGES`
* `WA_IGNORE_STATUS_BROADCAST`

---

## Banco de Dados e Sessões

Responsáveis pela persistência e autenticação.

* `MYSQL_URL`
* `WA_DB_URL`
* `WA_REDIS_URL`
* `WA_REDIS_PREFIX`
* `WA_AUTH_DIR`
* `WA_AUTH_PERSIST_KEYS`

---

## Runtime de Comandos

Controlam execução, filas e cache.

* `WA_COMMAND_TIMEOUT_MS`
* `WA_ROUTER_MAX_PENDING_PER_QUEUE`
* `WA_MAX_CACHED_MESSAGES`

Essas configurações ajudam a evitar congestionamentos e execuções excessivamente longas.

---

## Armazenamento de Mídia

Parâmetros relacionados ao download e retenção de arquivos.

* `WA_MEDIA_AUTO_DOWNLOAD`
* `WA_MEDIA_DOWNLOAD_DIR`
* `WA_MEDIA_MAX_BYTES`
* `WA_MEDIA_RETENTION_DAYS`

---

## Proteção de Sessão e Controle de Risco

Recursos destinados à estabilidade operacional.

* `WA_ANTIBAN_ENABLED`
* `WA_ANTIBAN_LOGGING`
* `WA_ANTIBAN_MAX_PER_MINUTE`
* `WA_ANTIBAN_MAX_PER_HOUR`
* `WA_ANTIBAN_MAX_PER_DAY`
* `WA_ANTIBAN_MIN_DELAY_MS`
* `WA_ANTIBAN_MAX_DELAY_MS`
* `WA_ANTIBAN_NEW_CHAT_DELAY_MS`
* `WA_ANTIBAN_IDENTICAL_WINDOW_MS`
* `WA_ANTIBAN_DEAF_SESSION_ENABLED`
* `WA_ANTIBAN_DEAF_SESSION_TIMEOUT_MS`
* `WA_ANTIBAN_DEAF_SESSION_MIN_UPTIME_MS`
* `WA_ANTIBAN_DEAF_SESSION_AUTO_RECONNECT`
* `WA_ANTIBAN_JID_CANONICALIZER_ENABLED`
* `WA_ANTIBAN_LID_CANONICAL`
* `WA_ANTIBAN_METRICS_ENABLED`
* `WA_ANTIBAN_METRICS_HOST`
* `WA_ANTIBAN_METRICS_PORT`
* `WA_ANTIBAN_METRICS_PATH`

---

## Health Check e Infraestrutura

Configurações relacionadas à observabilidade e gerenciamento do processo.

* `WA_HEALTH_ENABLED`
* `WA_HEALTH_HOST`
* `WA_HEALTH_PORT`
* `WA_SHUTDOWN_TIMEOUT_MS`
* `WA_CREDS_DEBOUNCE_MS`
* `WA_RECONNECT_BASE_DELAY_MS`
* `WA_RECONNECT_MAX_DELAY_MS`
* `WA_RECONNECT_MAX_ATTEMPTS`
* `WA_MYSQL_RETRY_MS`

---

## Backfill

Parâmetros utilizados pelo mecanismo de correção e enriquecimento de dados.

* `WA_BACKFILL_INTERVAL_MS`
* `WA_BACKFILL_ONCE`
* `WA_BACKFILL_BATCH_SIZE`
* `WA_BACKFILL_MAX_FAILURES`
* `WA_BACKFILL_FAILURE_BACKOFF_MS`

---

# Cenários de Uso

## Desenvolvimento Local

Indicado para testes e desenvolvimento.

Exemplo:

```env
WA_CONNECTION_ID=default
MYSQL_URL=mysql://user:pass@localhost:3306/beako
WA_PRINT_QR=true
LOG_LEVEL=debug
```

---

## Múltiplas Sessões

Quando várias conexões devem compartilhar a mesma aplicação.

```env
WA_CONNECTION_IDS=default,loja1,suporte
```

Recomendado utilizar banco de dados e Redis compartilhados.

---

## Descoberta Automática

Permite que as sessões sejam identificadas automaticamente através do banco.

Requisitos:

* MySQL configurado
* sessões previamente armazenadas
* Redis opcional para otimização

---

## Ambiente de Produção

Sugestões para servidores permanentes:

```env
LOG_LEVEL=info
WA_PRINT_QR=false
WA_ANTIBAN_ENABLED=true
WA_HEALTH_ENABLED=true
```

---

## Docker Compose

A configuração padrão normalmente inclui:

```env
WA_CONNECTION_ID=default
WA_REDIS_URL=redis://redis:6379
MYSQL_URL=mysql://user:password@mysql:3306/beako
```

Esses valores podem ser ajustados conforme a infraestrutura utilizada.

---

# Exemplo Básico

```env
WA_CONNECTION_ID=default
WA_COMMAND_PREFIX=?
MYSQL_URL=mysql://user:pass@127.0.0.1:3306/beako
WA_REDIS_URL=redis://127.0.0.1:6379
LOG_LEVEL=info

WA_MEDIA_AUTO_DOWNLOAD=true
WA_MEDIA_DOWNLOAD_DIR=data/media
```

---

# Validação Pós-Configuração

Após alterar configurações importantes, recomenda-se executar:

```bash
npm run db:verify
npm run build
npm test
```

Também é recomendado verificar:

* logs de inicialização
* conexões carregadas
* status dos serviços auxiliares
* endpoints de health check
* métricas de observabilidade

---

# Documentação Relacionada

* Instalação
* Persistência
* Produção
* Troubleshooting

---

**Beako Configuration Guide**


---

**Beako Wiki** • Última atualização: 12/06/2026
