export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if (data === null) {
        return null;
    }
    return JSON.parse(data);
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}