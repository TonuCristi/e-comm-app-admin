import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { User } from "../lib/types";

type GlobalContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
};

type Props = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContext>({
  isLoading: true,
  setIsLoading: () => undefined,
  error: "",
  setError: () => undefined,
  currentUser: {
    id: "",
    username: "",
    email: "",
    role: "admin",
    createdAt: "",
  },
  setCurrentUser: () => undefined,
});

export default function GlobalProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    role: "admin",
    createdAt: "",
  });

  return (
    <GlobalContext.Provider
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
    </GlobalContext.Provider>
  );
}
