import { Context, SessionFlavor, I18nFlavor } from "../deps.ts";

export type MyContext = Context & SessionFlavor<Session> & I18nFlavor;

interface Session {
    [key: string]: unknown;
}