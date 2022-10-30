import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { Bot, I18n, session } from './deps.ts';
import { MyContext } from './types/context.ts';

const token = Deno.env.get('TOKEN');
if (!token) throw new Error('TOKEN must be provided!');

const bot = new Bot<MyContext>(token);

const i18n = new I18n<MyContext>({
    defaultLocale: 'en',
    useSession: true,
    directory: 'locales'
});

bot.use(session());
bot.use(i18n);

bot.command('start', ctx => ctx.reply(ctx.t('greeting', { userName: ctx.from?.username ?? 'World' })));

bot.catch(err => {
    const date = new Date();
    const dateString = `\x1b[41m[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]\x1b[0m`;
    console.error(dateString, `${err.name}: ${err.message}`);
});

bot.start();

Deno.addSignalListener('SIGINT', () => bot.stop());