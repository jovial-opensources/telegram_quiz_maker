import { Telegraf } from "telegraf"
import quizTextParser from "./quizTextParser"
require('dotenv').config({
    path: './.env'
})


const bot = new Telegraf(process.env.BOT_TOKEN as string)

bot.on('text', (ctx) => {
    try {
        const quiz = quizTextParser(ctx.message.text)
        ctx.replyWithQuiz(
            quiz.questionText,
            quiz.optionTexts,
            {
                is_anonymous: false,
                correct_option_id: quiz.correctOptionIndex
            }
        )
    } catch (e) {
        ctx.replyWithMarkdown(`### Error\n${e}`)
    }
})

bot.launch()