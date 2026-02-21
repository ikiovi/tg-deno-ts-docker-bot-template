import { Bot } from 'grammy';
import { FetchOptions, RunOptions, run, sequentialize } from 'grammy_runner';
import { MyContext } from './context.ts';
import { logger } from "./logger.ts";
import { env } from "./env.ts";

const bot = new Bot<MyContext>(env.token);
logger.debug('Started!');

bot.use(sequentialize(ctx => ctx.from?.id.toString()));

bot.on('message').command('start', ctx => {
    ctx.reply(`Hello, ${ctx.from.username ?? ctx.from.first_name}!`);
});

bot.catch(err => logger.error(err.error));

const fetch: FetchOptions = { allowed_updates: [] };
const options: RunOptions<unknown> = { runner: { fetch }, sink: {}, source: {} };
const runner = run(bot, options);

const stopRunner = () => runner.isRunning() && runner.stop();
Deno.addSignalListener('SIGTERM', stopRunner);