# Sistema de Eventos

A camada de eventos é responsável por conectar o WhatsApp ao restante da plataforma Beako.

Toda atividade recebida através do Baileys passa inicialmente por este subsistema antes de alcançar componentes como comandos, persistência, auditoria ou sincronização.

Ponto principal de entrada:

```text
src/events/register.ts
```

---

# Visão Geral

O sistema de eventos atua como a porta de entrada da aplicação.

Suas responsabilidades incluem:

* receber notificações do WhatsApp
* distribuir eventos para os subsistemas corretos
* atualizar estados internos
* registrar auditoria
* alimentar mecanismos de persistência
* iniciar processamentos secundários

Em termos práticos, praticamente tudo o que acontece na plataforma começa nesta camada.

---

# Tipos de Eventos

## Conexão e Sessão

Eventos relacionados ao ciclo de vida da conexão.

Principais exemplos:

```text
connection.update
creds.update
messaging-history.set
```

Esses eventos são utilizados para:

* autenticação
* reconexão automática
* exibição de QR Code
* sincronização inicial
* atualização de credenciais
* recuperação de sessão

---

## Mensagens

Eventos relacionados ao tráfego de mensagens.

Principais tipos:

```text
messages.upsert
messages.update
messages.media-update
messages.delete
messages.reaction
message-receipt.update
```

Entre eles, o mais importante para o runtime de comandos é:

```text
messages.upsert
```

Quando uma mensagem elegível é recebida, ela pode ser encaminhada para o sistema de processamento de comandos.

---

## Conversas e Contatos

Responsáveis por manter a visão atualizada dos chats conhecidos pela aplicação.

Eventos comuns:

```text
chats.upsert
chats.update
chats.delete

contacts.upsert
contacts.update

presence.update
```

Esses dados são utilizados por:

* cache local
* Redis
* banco de dados
* sincronização de estado

---

## Grupos e Comunidades

Eventos relacionados à estrutura social da plataforma.

Tipos mais relevantes:

```text
groups.upsert
groups.update
group-participants.update
group.join-request
group.member-tag.update
```

Esses eventos podem gerar:

* atualizações de participantes
* mudanças administrativas
* sincronização de comunidades
* registros de auditoria

---

## Recursos Administrativos

Eventos utilizados para recursos auxiliares e governança.

Exemplos:

```text
blocklist.set
blocklist.update

labels.edit
labels.association

call
```

---

## Canais e Newsletters

Eventos relacionados aos canais do WhatsApp.

Principais exemplos:

```text
newsletter.reaction
newsletter.view
newsletter-participants.update
newsletter-settings.update
```

Dependendo da configuração, a plataforma também pode atualizar informações complementares associadas aos canais.

---

# Fluxo de Processamento

O caminho padrão percorrido por um evento segue a seguinte sequência:

```text
WhatsApp
    ↓
Baileys
    ↓
register.ts
    ↓
Auditoria e Logging
    ↓
Persistência e Stores
    ↓
Router / Runtime
    ↓
Processamentos Complementares
```

Etapas detalhadas:

1. O Baileys recebe um evento.
2. O handler correspondente é acionado.
3. Logs estruturados são registrados.
4. Bancos e stores são atualizados quando necessário.
5. Eventos elegíveis são encaminhados para outros subsistemas.
6. Tarefas secundárias podem ser executadas.

---

# Integração com o Runtime de Comandos

O sistema de comandos não monitora diretamente o WhatsApp.

Toda execução de comando nasce a partir dos eventos processados por esta camada.

Fluxo simplificado:

```text
messages.upsert
        ↓
router
        ↓
processor
        ↓
CommandContext
        ↓
comando
```

Essa separação mantém o runtime desacoplado da implementação do transporte.

---

# Auditoria e Persistência

Diversos eventos são registrados para fins de rastreabilidade.

Entre as estruturas utilizadas estão:

* `events_log`
* `message_events`
* `group_events`
* `newsletter_events`
* `message_failures`

Esses registros auxiliam em:

* suporte técnico
* monitoramento
* investigação de falhas
* reconstrução de histórico
* processos de backfill

---

# Sincronizações Automáticas

Determinados eventos podem disparar tarefas complementares.

Exemplos:

### Atualização de grupos

Após autenticação ou mudanças estruturais, grupos podem ser sincronizados novamente.

### Atualização de comunidades

Comunidades podem ter participantes e relacionamentos atualizados.

### Atualização de canais

Metadados de newsletters podem ser recarregados quando informações incompletas forem detectadas.

### Recuperação de mídia

Em situações específicas, arquivos de mídia podem ser atualizados posteriormente.

---

# Diretrizes para Novos Handlers

Ao implementar novos processadores de eventos, recomenda-se:

* priorizar operações idempotentes
* preservar auditoria existente
* utilizar logs estruturados
* evitar bloqueios prolongados
* impedir que falhas locais interrompam o fluxo global
* adicionar testes próximos ao subsistema afetado

Essas práticas ajudam a manter a estabilidade do runtime mesmo em ambientes de alto volume.

---

# Consulte Também

* Comandos
* Banco de Dados
* Persistência
* Backfill

---

**Beako Event Architecture**

---

**Beako Wiki** • Última atualização: 12/06/2026
