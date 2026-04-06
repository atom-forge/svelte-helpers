interface As {
	<T>(v: any): T;
	string: (v: any) => string;
	number: (v: any) => number;
	boolean: (v: any) => boolean;
	unknown: (v: any) => unknown;
	any: (v: any) => any;
	array: <T>(v: any) => T[];
	object: <T extends object>(v: any) => T;
	function: <T extends Function>(v: any) => T;
}

const asFn = <T>(v: any): T => v;

asFn.string = (v: any): string => v as string;
asFn.number = (v: any): number => v as number;
asFn.boolean = (v: any): boolean => v as boolean;
asFn.unknown = (v: any): unknown => v;
asFn.any = (v: any): any => v;
asFn.array = <T>(v: any): T[] => v as T[];
asFn.object = <T extends object>(v: any): T => v as T;
asFn.function = <T extends Function>(v: any): T => v as T;

export const as = asFn as As;
