// 調試版本的 auth.ts - 添加了詳細的日誌
import type { AuthProvider } from "@refinedev/core";
import { API_URL } from "./constants";

export const authProvider: AuthProvider = {
    // 登入
    login: async ({ email, username, password }) => {

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, username, password }),
            });

            // 檢查 response headers 中的 cookie
            const setCookieHeader = response.headers.get('set-cookie');

            if (response.ok) {
                const data = await response.json();
                // 等待一小段時間確保 cookie 已設置
                await new Promise(resolve => setTimeout(resolve, 100));

                return { success: true, redirectTo: "/" };
            }

            const error = await response.json();
            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: error.message || "Invalid credentials",
                },
            };
        } catch (e) {
            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: "Something went wrong",
                },
            };
        }
    },

    // 登出
    logout: async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
        }
        return { success: true, redirectTo: "/login" };
    },

    // 驗證是否登入
    check: async () => {
        try {
            // 嘗試取得使用者資訊
            const response = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const user = await response.json();
                return { authenticated: true };
            }

            if (response.status === 401) {
                // 嘗試 refresh token
                const refreshResp = await fetch(`${API_URL}/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });

                if (refreshResp.ok) {
                    const refreshData = await refreshResp.json();
                    return { authenticated: true };
                }
                return { authenticated: false, redirectTo: "/login" };
            }
            return { authenticated: false, redirectTo: "/login" };
        } catch (e) {
            return { authenticated: false, redirectTo: "/login" };
        }
    },

    // 取得使用者權限
    getPermissions: async () => {
        return null;
    },

    // 取得使用者資訊
    getIdentity: async () => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                // 先獲取原始文本，看看實際返回了什麼
                const text = await response.text();
                try {
                    const user = JSON.parse(text);
                    const identity = {
                        id: user.id,
                        name: user.name || user.email,
                        email: user.email,
                        avatar: user.avatar || "https://i.pravatar.cc/300",
                    };

                    return identity;
                } catch (e) {
                    return null;
                }
            } else {
                const errorText = await response.text();
            }
        } catch (e) {
            return null;
        }
        return null;
    },

    // 錯誤處理
    onError: async (error) => {
        return { error };
    },
};
