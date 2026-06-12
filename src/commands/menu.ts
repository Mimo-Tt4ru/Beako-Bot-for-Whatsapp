import { config } from '../config/index.js'
import type { Command } from './types.js'
import fs from 'node:fs'

type CommandsProvider = () => Record<string, Command>

/**
 * Cria o comando de menu com leitura dinâmica do registry de comandos.
 */
export const createMenuCommand = (): Command => ({
  name: 'menu',
  description: 'Mostra os comandos disponíveis',
    async execute(ctx) {
const menu = `
╭─────────────────────────╮
│      🤖 BEAKO BOT       │
╰─────────────────────────╯

📚 COMANDOS DISPONÍVEIS

━━━━━━━━━━━━━━━━━━━━

⚙️ GERAIS

🟢 ?menu
└ Mostra esta lista de comandos.

🟢 ?check
└ Verifica se o bot está online.

━━━━━━━━━━━━━━━━━━━━

🎵 MÍDIA

🟢 ?play
└ Busca um áudio por nome ou URL e envia em MP3.

🟢 ?playvid
└ Busca um vídeo por nome ou URL e envia em MP4.

━━━━━━━━━━━━━━━━━━━━

🖼️ FIGURINHAS

🟢 ?s (?sticker, ?st)
└ Converte imagens e vídeos em figurinhas.

🟢 ?toimg
└ Converte figurinhas WebP para PNG.

🟡 ?togif
└ Converte figurinhas WebP para GIF.
└ Atualmente em desenvolvimento.

━━━━━━━━━━━━━━━━━━━━

👑 ADMINISTRAÇÃO

🟢 ?add
└ Adiciona participantes ao grupo.

🟢 ?ban
└ Remove participantes do grupo.

🟢 ?kick
└ Expulsa participantes do grupo.

🟢 ?promote
└ Promove participantes para administrador.

🟢 ?demote
└ Remove o cargo de administrador.

━━━━━━━━━━━━━━━━━━━━

🛡️ GERENCIAMENTO DE GRUPO

🟢 ?antilink
└ Controla o sistema anti-link do grupo.

🟢 ?assunto
└ Altera o nome do grupo.

🟢 ?descricao
└ Altera ou remove a descrição do grupo.

🟢 ?grupo
└ Abre ou fecha o grupo para mensagens.

🟢 ?lock
└ Trava ou destrava as configurações do grupo.

🟢 ?ephemeral
└ Controla mensagens temporárias.

🟢 ?linkgrupo
└ Exibe o link atual do grupo.

🟢 ?revogarlink
└ Revoga o link atual e gera um novo.

━━━━━━━━━━━━━━━━━━━━

📊 STATUS

🟢 Online
🟡 Em desenvolvimento
🔴 Desativado
⚠️ Experimental
👑 Apenas administradores

Versão: v0.1.5
Prefixo: ?

━━━━━━━━━━━━━━━━━━━━
Powered by Beako Bot
`

const imagem = fs.readFileSync('./assets/beako-menu.png')

await ctx.sendImage({
  image: imagem,
  caption: menu,
})
}
,
})
