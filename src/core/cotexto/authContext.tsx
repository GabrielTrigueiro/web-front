import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface IAuthData {
    token: string;
}

interface IAuthContextData {
    auth?: IAuthData;
    setAuth: React.Dispatch<React.SetStateAction<IAuthData | undefined>>;
    signOut: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<IAuthContextData>(
    {} as IAuthContextData
);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // estado do token
    const [auth, setAuth] = useState<IAuthData | undefined>();
    // carregamentos
    const [isLoading, setIsLoading] = useState(false);

    // logout
    const signOut = () => {
        setIsLoading(true);
        localStorage.removeItem("@AuthData");
        setAuth(undefined);
        setIsLoading(false);
    }

    const contextValue = useMemo(
        () => ({
            auth,
            signOut,
            isLoading,
            setAuth
        }),
        [auth, isLoading, signOut]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export function useAuth(): IAuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
