import type { Command } from './types.js'


const getTarget = (ctx:
    Parameters<Command['execute']>[0]): string | null => { return ctx.mentionedJids[0] ?? ctx.quotedSender ?? null}

export const abracoCommand: Command = {name: 'abraço', description: 'Abraça outro usuário',

    async execute(ctx) { const alvo = getTarget(ctx)
        if (!alvo){ await ctx.reply('Use ?abraço marcando alguém ou responda a mensagem de alguém para abraçar!'); return 
         if (!ctx.isGroup) {
      await ctx.reply('❌ Este comando só funciona em grupos.')
      return
    }}

const alvoMencao =`@${alvo.split('@')[0]}`

const mensagens = [
    `${ctx.pushName} abraçou ${alvoMencao}! 🤗`,
    `${ctx.pushName} deu um abraço apertado em ${alvoMencao}! 🤗`,
    `${alvoMencao} recebeu um abraço cheio de carinho de ${ctx.pushName}! 🤗`,
    `${ctx.pushName} deu um abraço virtual para ${alvoMencao}! 🤗`,
    `${ctx.pushName} deu um abraço cheio de carinho para ${alvoMencao}! 🤗`
]

const msg = mensagens[Math.floor(Math.random() * mensagens.length)]

await ctx.send({
  text: msg,
  mentions: [alvo]
})

}}