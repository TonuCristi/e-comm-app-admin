import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type AuthContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContext>({
  isLoading: false,
  setIsLoading: () => undefined,
  error: "",
  setError: () => undefined,
  token: "",
  setToken: () => undefined,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
