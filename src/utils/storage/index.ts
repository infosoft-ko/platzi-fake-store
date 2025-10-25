export default function getFromStorage<T>(key: string) {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return undefined;
    }
    return undefined;
}

export function setToStorage<T>(key: string, value: T) {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
}