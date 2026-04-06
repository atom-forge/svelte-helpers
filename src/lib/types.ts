import type {Snippet} from "svelte";

export type AtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>; }[keyof T];

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
// let a: XOR<{}, XOR<{ a:boolean }, {b:boolean}>> = {a: true}

type AllKeys<T> = T extends unknown ? keyof T : never;
type Exclusive<T, Union> = T extends unknown
	? T & { [K in Exclude<AllKeys<Union>, keyof T>]?: never }
	: never;

export type XOR<
	T1,
	T2,
	T3 = never,
	T4 = never,
	T5 = never,
	T6 = never,
	T7 = never,
	T8 = never
> = Exclusive<
	T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, // A 'T' (aktuális elem)
	T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8  // A 'Union' (teljes halmaz)
>;

export type ChildrenProp<Parameters extends unknown[] = []> = { children: Snippet<Parameters> };
export type ChildrenPropOptional<Parameters extends unknown[] = []> = { children?: Snippet<Parameters> };
export type ClassProp = { class?: string }
export type AnyProp = { [key: string]: any }
