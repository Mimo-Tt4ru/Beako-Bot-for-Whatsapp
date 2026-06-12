# Wiki da Beako

Bem-vindo à documentação oficial da **Beako**.

Este espaço reúne informações sobre arquitetura, configuração, persistência, operação e manutenção da plataforma. Aqui você encontrará os principais conceitos necessários para desenvolver, administrar ou contribuir com o projeto.

Se estiver começando agora, recomenda-se ler primeiro o arquivo principal do repositório:

```text
README.md
```

Para detalhes avançados do sistema de comandos:

```text
docs/README-COMMANDS.md
```

---

# Estrutura da Documentação

A documentação está organizada em diferentes níveis de profundidade.

| Documento            | Finalidade                                     |
| -------------------- | ---------------------------------------------- |
| `README.md`          | Introdução rápida e primeiros passos           |
| `docs/wiki/`         | Guias operacionais e visão geral da plataforma |
| `README-COMMANDS.md` | Arquitetura detalhada do runtime de comandos   |
| `exemplodbmodel.md`  | Estrutura completa do banco de dados           |

---

# Sobre a Plataforma

A Beako é uma plataforma de automação para WhatsApp construída sobre Baileys, projetada para oferecer flexibilidade, escalabilidade e organização operacional.

Entre seus principais objetivos estão:

* execução modular de comandos
* suporte a múltiplas conexões
* persistência híbrida
* auditoria operacional
* gerenciamento de mídia
* sincronização de grupos e canais
* estabilidade em ambientes de produção

---

# Visão Geral da Arquitetura

A plataforma pode ser dividida em quatro grandes blocos.

## Autenticação e Conexões

Responsável por:

* gerenciamento de sessões
* autenticação
* reconexões automáticas
* recuperação de credenciais

---

## Sistema de Eventos

Responsável por:

* receber eventos do WhatsApp
* distribuir eventos internamente
* atualizar estados da aplicação
* alimentar mecanismos de auditoria

---

## Persistência

Responsável por:

* armazenamento durável
* histórico de mensagens
* gerenciamento de mídia
* auditoria operacional
* sincronização de dados

As tecnologias utilizadas podem incluir:

* MySQL
* Redis
* armazenamento local

---

## Runtime de Comandos

Responsável por:

* identificar comandos
* processar argumentos
* aplicar regras automáticas
* executar ações através do contexto da plataforma

---

# Informações Operacionais

Algumas características importantes da Beako:

* conexões são isoladas por `connection_id`
* múltiplas sessões podem coexistir no mesmo ambiente
* o sistema suporta autenticação distribuída
* comandos utilizam filas independentes por conversa
* mecanismos de backfill auxiliam na recuperação de consistência
* auditoria é registrada durante toda a operação da plataforma

---

# Guias por Objetivo

## Quero instalar e testar

Comece por:

* Instalação
* Configuração
* Comandos
* Eventos

Objetivo: colocar a aplicação em funcionamento e entender o fluxo básico do sistema.

---

## Quero desenvolver recursos

Recomenda-se:

* Comandos
* Comandos - Referência
* Eventos
* Banco de Dados

Objetivo: compreender a arquitetura e adicionar novas funcionalidades com segurança.

---

## Quero administrar produção

Recomenda-se:

* Produção
* Persistência
* Banco de Dados
* Backfill

Objetivo: manter o ambiente estável, seguro e observável.

---

## Quero investigar problemas

Recomenda-se:

* Troubleshooting
* Persistência
* Backfill
* Produção

Objetivo: localizar falhas, entender comportamentos inesperados e restaurar a operação.

---

# Índice Rápido

## Primeiros Passos

* Instalação
* Configuração

## Desenvolvimento

* Comandos
* Comandos - Referência
* Eventos

## Dados e Persistência

* Banco de Dados
* Persistência
* Backfill

## Operação

* Produção
* Troubleshooting

## Comunidade

* Código de Conduta

---

# Uso Responsável

A Beako deve ser utilizada de forma ética e responsável, respeitando:

* políticas das plataformas utilizadas
* legislação aplicável
* privacidade dos usuários
* boas práticas de segurança

O uso inadequado da plataforma pode causar impactos negativos tanto para operadores quanto para terceiros.

Para mais informações, consulte:

* Código de Conduta
* CODE_OF_CONDUCT.md

---

**Beako Documentation Hub**


---

**Beako Wiki** • Última atualização: 12/06/2026
