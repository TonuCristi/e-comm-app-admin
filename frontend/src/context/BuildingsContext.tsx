import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Building } from "../lib/types";

interface BuildingsContext {
  buildings: Building[];
  isLoading: boolean;
  error: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setBuildings: Dispatch<SetStateAction<Building[]>>;
}

export const BuildingsContext = createContext<BuildingsContext>({
  buildings: [],
  isLoading: false,
  error: "",
  setIsLoading: () => undefined,
  setError: () => undefined,
  setBuildings: () => undefined,
});

export default function BuildingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [buildings, setBuildings] = useState<Building[]>([]);

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
        isLoading,
        error,
        setIsLoading,
        setError,
        setBuildings,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
}
