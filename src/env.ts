export const env = {
    token: get('TOKEN', 'string'),
    logLevel: get('LOG_LEVEL', 'string', 'info'),
    disableLogTimestamp: get('DISABLE_LOG_TIMESTAMP', 'boolean', true),
    dateFormat: get('DATE_FORMAT', 'string', 'HH:MM dd.mm.yyyy')
}

const supportedPrimitives = ['string', 'number', 'boolean'] as const;

type Primitive<T extends typeof supportedPrimitives[number]> =
    T extends 'string' ? string :
    T extends 'number' ? number :
    T extends 'boolean' ? boolean :
    never;

function get<T extends typeof supportedPrimitives[number]>(name: string, type: T, defaultValue?: Primitive<T>): Primitive<T> {
    const value = Deno.env.get(name) ?? defaultValue;
    if (value == undefined || value == '') {
        throw new Error(`Environment variable [${name}] is required.`);
    }
    if (type === 'string') return <Primitive<T>>value;
    if (type === 'number') {
        const n = Number(value);
        if (Number.isNaN(n)) throw new Error(`Invalid value of [${name}]. Should be a number`);
        return <Primitive<T>>n;
    }
    if (type === 'boolean') {
        return <Primitive<T>>Boolean(value);
    }
    throw new Error(`Invalid type ${type}.`);
}