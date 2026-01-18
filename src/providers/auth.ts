import type { AuthProvider } from "@refinedev/core";
import { API_URL, TOKEN_KEY, USER_KEY } from "./constants";

export const authProvider: AuthProvider = {
    login: async ({ email, username, password }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem(TOKEN_KEY, data.accessToken);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            const error = await response.json();
            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: error.message || "Invalid email or password",
                },
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: "Something went wrong",
                },
            };
        }
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) {
            const user = JSON.parse(userStr);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar || "https://i.pravatar.cc/300",
            };
        }
        return null;
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
};
