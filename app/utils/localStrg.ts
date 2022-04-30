export const setLocalStorageWithExpire = (key: string, value: any, time: number) => {
    const date = new Date();
    date.setTime(date.getTime() +
        (time * 1000) // time in milliseconds    
    );
    localStorage.setItem(key, JSON.stringify({ value, time }));
}

export const getLocalStorageWithExpire = (key: string) => {
    const data = localStorage.getItem(key);
    if (data) {
        const { value, time } = JSON.parse(data);
        const date = new Date();
        date.setTime(date.getTime() + (time * 1000));
        if (date > new Date()) {
            return value;
        }
        localStorage.removeItem(key);
    }
    return null;
}