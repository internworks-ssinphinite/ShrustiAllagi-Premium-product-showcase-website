// Simple localStorage wrapper for demo purposes (replace with real backend later)

type Json = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

export const storage = {
	get<T = unknown>(key: string, fallback: T): T {
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return fallback;
			return JSON.parse(raw) as T;
		} catch (_e) {
			return fallback;
		}
	},
	set(key: string, value: Json) {
		localStorage.setItem(key, JSON.stringify(value));
	},
};


