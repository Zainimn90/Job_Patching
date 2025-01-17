function validate(ctx) {
    if (ctx.update.message.chat.id != process.env.CHAT_ID) {
        ctx.reply(''+ctx.update.message.chat.id)
        ctx.reply('Not Allowed')
        return false
    }
    return true
}

module.exports = validate;