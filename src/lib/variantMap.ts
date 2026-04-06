export function variantMap<T extends Record<string, boolean | undefined>, D extends string>(
	map: T,
	defaultValue: D
): Extract<keyof T, string> | D {
	for (const [key, val] of Object.entries(map)) {
		if (val) return key as Extract<keyof T, string>;
	}
	return defaultValue;
}
