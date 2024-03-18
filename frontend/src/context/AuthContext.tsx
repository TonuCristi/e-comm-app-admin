import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContext>({
  token: "",
  setToken: () => undefined,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(() => {
    const user = localStorage.getItem("user");

    if (user) {
      return JSON.parse(user);
    }
  });

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
