export type Unpack<T> = T extends Array<infer U> ? U : T;

export const ifDefined = <T, R>(value: T | undefined, replacement: R): T | R => {
    return value === undefined ? replacement : value;
}

/**
 * assumes that at least of the args (the last) will always be defined
 * and throws an error otherwise, rather than allowing undefined in the return type
 */
export const firstDefined = <T extends any[]>(...args: T): Exclude<Unpack<T>, undefined> => {
    for ( let arg of args ) {
        if ( arg !== undefined ) {
            return arg;
        }
    }
    throw new Error("all arguments were undefined");
};
