export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Useful for deleting unnecessary properties from objects, like the `providerOptions` that return from some LLM calls
export function deepDelete(obj: any, keyToDelete: string) {
    if (Array.isArray(obj)) {
        for (let item of obj) {
            deepDelete(item, keyToDelete);
        }
    } else if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (key === keyToDelete) {
                delete obj[key];
            } else {
                deepDelete(obj[key], keyToDelete);
            }
        }
    }
    return obj;
}