export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	delay = 300
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		return new Promise((resolve) => {
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				resolve(result);
			}, delay);
		});
	};
}

export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay = 300
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}
