"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const quizTextParser_1 = __importDefault(require("./quizTextParser"));
require('dotenv').config({
    path: './.env'
});
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.on('text', (ctx) => {
    try {
        const quiz = quizTextParser_1.default(ctx.message.text);
        ctx.replyWithQuiz(quiz.questionText, quiz.optionTexts, {
            is_anonymous: false,
            correct_option_id: quiz.correctOptionIndex
        });
    }
    catch (e) {
        ctx.replyWithMarkdown(`### Error\n${e}`);
    }
});
bot.launch();
