const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const updateAndSaveToLocalStorage = (key, updatedData) => {
    localStorage.setItem(key, JSON.stringify(updatedData));
};

const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

const clearLocalStorage = () => {
    localStorage.clear();
};


const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, updateAndSaveToLocalStorage, clearLocalStorage }