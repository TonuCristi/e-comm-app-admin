import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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
    id: "",
    username: "",
    email: "",
    password: "",
    role: "customer",
    createdAt: "",
    updatedAt: "",
  },
  setCurrentUser: () => undefined,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "customer",
    createdAt: "",
    updatedAt: "",
  });

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
