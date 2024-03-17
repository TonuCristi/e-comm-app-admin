import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { User } from "../lib/types";

type AuthContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContext>({
  isLoading: false,
  setIsLoading: () => undefined,
  error: "",
  setError: () => undefined,
  currentUser: {
    username: "",
    email: "",
    role: "customer",
    token: "",
    createdAt: "",
  },
  setCurrentUser: () => undefined,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    email: "",
    role: "customer",
    token: "",
    createdAt: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
