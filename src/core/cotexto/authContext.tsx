import {createContext, useContext, useEffect, useMemo, useState} from "react";

import {noAuthAxiosInstance} from "../api/axios/axiosInstance";
import {GlobalFunctions} from "../utils/globalFunctions";
import {LOGIN} from "../utils/constans";

export interface IAuthData {
    token: string;
}

interface IAuthContextData {
    auth?: IAuthData;
    signOut: () => Promise<any>;
    isLoading: boolean;
}

export const AuthContext = createContext<IAuthContextData>(
    {} as IAuthContextData
);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    // estado do token
    const [auth, setAuth] = useState<IAuthData | undefined>();
    // carregamentos
    const [isLoading, setIsLoading] = useState(false);

    // a qualquer momento que abre o app, ele verifica o token
    useEffect(() => {
        loadStorageData();
    }, []);

    // carrega o token do local storage com a key @AuthData
    async function loadStorageData(): Promise<void> {
        setIsLoading(true);
        try {
            const authDataSerialized = localStorage.getItem("@AuthData");
            if (authDataSerialized) {
                setAuth({token: authDataSerialized});
                setIsLoading(false);
            }
        } catch (error) {
            console.log("token não encontrado");
        } finally {
            setIsLoading(false);
        }
    }

    // logout
    async function signOut() {
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
        }),
        [auth, isLoading]
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
