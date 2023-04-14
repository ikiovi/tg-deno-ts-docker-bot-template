import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Bot, I18n, logger, session } from './deps.ts';
import { MyContext } from './types/context.ts';

const token = Deno.env.get('TOKEN');
if (!token) throw new Error('TOKEN must be provided!');

const bot = new Bot<MyContext>(token);

const i18n = new I18n<MyContext>({
    defaultLocale: 'en',
    useSession: true,
    directory: 'locales'
});

bot.use(session({ initial: () => ({}) }));
bot.use(i18n);

bot.on('message').command('start', ctx => {
    ctx.reply(ctx.t('greeting', { userName: ctx.from?.username ?? ctx.from.first_name }))
});

bot.catch(err => logger.error(`${err.name} / ${err.message}`));
bot.start();

Deno.addSignalListener('SIGINT', bot.stop);