import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { Building, Order } from "../lib/types";

interface BuildingsContext {
  orders: Order[];
  buildings: Building[];
  isLoading: boolean;
  error: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setBuildings: Dispatch<SetStateAction<Building[]>>;
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

export const BuildingsContext = createContext<BuildingsContext>({
  buildings: [],
  orders: [],
  isLoading: true,
  error: "",
  setBuildings: () => undefined,
  setOrders: () => undefined,
  setIsLoading: () => undefined,
  setError: () => undefined,
});

export default function BuildingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
        orders,
        isLoading,
        error,
        setBuildings,
        setOrders,
        setIsLoading,
        setError,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
}
