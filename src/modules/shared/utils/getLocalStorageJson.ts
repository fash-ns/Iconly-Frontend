export default function getLocalStorageJson(key: string, defaultVal: any = null): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal
}