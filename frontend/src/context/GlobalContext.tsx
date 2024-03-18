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
  isLoading: false,
  setIsLoading: () => undefined,
  error: "",
  setError: () => undefined,
  currentUser: {
    username: "",
    email: "",
    role: "customer",
    createdAt: "",
  },
  setCurrentUser: () => undefined,
});

export default function GlobalProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    email: "",
    role: "customer",
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
