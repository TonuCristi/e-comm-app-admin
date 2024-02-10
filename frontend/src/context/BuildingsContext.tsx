import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface Building {
  type: string;
  location: string;
  address: string;
  selling_price: number | string;
  discount_value: number | string;
  nr_balconies: number | string;
  nr_bathrooms: number | string;
  nr_floors: number | string;
  nr_garages: number | string;
  nr_rooms: number | string;
  original_price: number | string;
  square_meters: number | string;
  description: string;
}

export interface BuildingWithId extends Building {
  _id: string;
}

interface BuildingsContext {
  buildings: BuildingWithId[];
  isLoading: boolean;
  error: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setBuildings: Dispatch<SetStateAction<BuildingWithId[]>>;
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
  const [buildings, setBuildings] = useState<BuildingWithId[]>([]);

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
