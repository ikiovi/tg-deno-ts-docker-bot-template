import { env } from "./env.ts";
import { colorConsole } from 'tracer';

export const logger = colorConsole({
    level: env.logLevel,
    format: (env.disableLogTimestamp ? '' : '{{timestamp}} ') + '[{{title}}] ({{file}}:{{line}}): {{message}}',
    dateformat: env.dateFormat
});
