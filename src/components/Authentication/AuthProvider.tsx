import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User, AuthContextType } from "../../models/auth.ts";
import { API_BASE_URL } from "../../config.ts";

const LOGIN_API_URL = "/auth/login";
const USERINFO_API_URL = "/users/info";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Centralized logout function
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("token");
    }, []);

    // Load user info from token on mount
    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}${USERINFO_API_URL}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error("Error while loading user:", error);

                // If token is invalid (401), clear it. For other errors, keep trying
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    logout();
                } else {
                    // For network errors, etc., don't clear the token but set user to null
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [token, logout]);

    // Login function with better error handling
    const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}${LOGIN_API_URL}`, {
                username,
                password,
            });

            const data = response.data;

            if (data.error_code === 0) {
                const newToken = data.data.access_token;

                setUser(data.data);
                setToken(newToken);
                sessionStorage.setItem("token", newToken);

                console.log("user login successfully.")

                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.message || "Login failed"
                };
            }
        } catch (error) {
            console.error("AuthProvider: Login error", error);

            let errorMessage = "Login failed";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            }

            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Optional: Add a refresh token function
    const refreshUser = useCallback(async (): Promise<boolean> => {
        if (!token) return false;

        try {
            const response = await axios.get(`${API_BASE_URL}${USERINFO_API_URL}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.data);
            return true;
        } catch (error) {
            console.error("Error refreshing user:", error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                logout();
            }
            return false;
        }
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context safely
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};