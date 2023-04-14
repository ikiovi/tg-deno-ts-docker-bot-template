import * as logger from "https://deno.land/std@0.183.0/log/mod.ts";
export { Context, Bot, type SessionFlavor, session } from "https://deno.land/x/grammy@v1.12.0/mod.ts";
export { I18n, type I18nFlavor } from "https://deno.land/x/grammy_i18n@v1.0.1/mod.ts";

const formattedDate = (date: Date, format: Intl.Locale) => `${date.toLocaleDateString(format)} ${date.toLocaleTimeString(format)}`;

await logger.setup({
    handlers: {
        console: new logger.handlers.ConsoleHandler('NOTSET', {
            formatter: ({ levelName, msg, datetime }) => `[${levelName}]: [${formattedDate(datetime, new Intl.Locale('en-GB'))}] ${msg}`
        })
    },
    loggers: {
        default: {
            level: 'INFO',
            handlers: ['console']
        }
    }
});

export { logger };