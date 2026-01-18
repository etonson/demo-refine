import type { AuthProvider } from "@refinedev/core";
import { API_URL } from "./constants";

export const authProvider: AuthProvider = {
    // 登入
    login: async ({ email, username, password }) => {
        try {
            console.log("[auth] login request", { email, username });
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 帶 cookie
                body: JSON.stringify({ email, username, password }),
            });

            const text = await response.text();
            console.log("[auth] login response text", text);

            if (!response.ok) {
                let errorMsg = "Invalid credentials";
                try {
                    const data = JSON.parse(text);
                    errorMsg = data.message || errorMsg;
                } catch {}
                return {
                    success: false,
                    error: { name: "LoginError", message: errorMsg },
                };
            }

            // 成功後前端無需手動讀 Set-Cookie，瀏覽器會自動帶 cookie
            return { success: true, redirectTo: "/" };
        } catch (e) {
            console.error("[auth] login exception", e);
            return { success: false, error: { name: "LoginError", message: "Something went wrong" } };
        }
    },

    // 登出
    logout: async () => {
        try {
            console.log("[auth] logout request");
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            console.log("[auth] logout response status", response.status);
        } catch (e) {
            console.error("[auth] logout exception", e);
        }
        return { success: true, redirectTo: "/login" };
    },

    // 驗證是否登入
    check: async () => {
        try {
            console.log("[auth] check /auth/me");
            const response = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                console.log("[auth] /auth/me ok");
                return { authenticated: true };
            }

            if (response.status === 401) {
                // 嘗試 refresh token
                console.log("[auth] /auth/me 401, trying refresh");
                const refreshResp = await fetch(`${API_URL}/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });

                console.log("[auth] /auth/refresh status", refreshResp.status);

                if (refreshResp.ok) {
                    console.log("[auth] refresh ok, retry /auth/me");
                    const retryMe = await fetch(`${API_URL}/auth/me`, {
                        method: "GET",
                        credentials: "include",
                    });
                    return { authenticated: retryMe.ok };
                }

                return { authenticated: false, redirectTo: "/login" };
            }

            return { authenticated: false, redirectTo: "/login" };
        } catch (e) {
            console.error("[auth] check exception", e);
            return { authenticated: false, redirectTo: "/login" };
        }
    },

    // 取得使用者權限
    getPermissions: async () => {
        return null; // 可根據後端 roles/permissions 實作
    },

    // 取得使用者資訊
    getIdentity: async () => {
        try {
            console.log("[auth] getIdentity /auth/me");
            const response = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                console.warn("[auth] getIdentity failed", response.status);
                return null;
            }

            const text = await response.text();
            console.log("[auth] getIdentity response text", text);

            try {
                const user = JSON.parse(text);
                return {
                    id: user.id,
                    name: user.name || user.email,
                    email: user.email,
                    avatar: user.avatar || "https://i.pravatar.cc/300",
                };
            } catch (e) {
                console.error("[auth] getIdentity JSON parse error", e);
                return null;
            }
        } catch (e) {
            console.error("[auth] getIdentity exception", e);
            return null;
        }
    },

    // 統一錯誤處理
    onError: async (error) => {
        console.error("[auth] onError", error);
        return { error };
    },
};
