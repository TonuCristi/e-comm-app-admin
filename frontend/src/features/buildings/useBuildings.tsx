import { useQuery } from "@tanstack/react-query";
import { getBuildings } from "../../services/apiBuildings";

export function useBuildings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });

  return { buildings: data, isLoading, error };
}
