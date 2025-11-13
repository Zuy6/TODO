import { AuthApi } from "./authApi"

export const useAuthApi = () => {
    const api = new AuthApi('http://localhost:3001/auth')

    return api;
}