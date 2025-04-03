
export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "BLOG:access_token"

export const getTokenFromStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
}

export const setTokenInStorage = (token) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token)
}

export const removeTokenFromStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
}