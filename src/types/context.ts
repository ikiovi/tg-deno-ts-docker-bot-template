import { Context,SessionFlavor,I18nFlavor } from "../deps.ts";

export type MyContext = Context & SessionFlavor<{ [key: string]: unknown }> & I18nFlavor;