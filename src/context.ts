import { Context, SessionFlavor } from "grammy";

export type MyContext = Context & SessionFlavor<Session>;

// Define your session schema
interface Session {
    [key: string]: unknown;
}