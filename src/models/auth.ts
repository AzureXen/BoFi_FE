export interface User {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    loading: boolean;
    refreshUser: (username: string, password: string) => Promise<boolean>;
}
