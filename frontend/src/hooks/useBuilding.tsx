import { useEffect, useState } from "react";
import { Building, BuildingResponse } from "../lib/types";
import BuildingsApi from "../api/BuildingsApi";

export function useBuilding(buildingId: string | undefined) {
  const [building, setBuilding] = useState<Building>({
    id: "",
    type: "",
    location: "",
    address: "",
    description: "",
    available: true,
    area: 0,
    nr_balconies: 0,
    nr_bathrooms: 0,
    nr_floors: 0,
    nr_garages: 0,
    nr_rooms: 0,
    selling_price: 0,
    original_price: 0,
    discount_value: 0,
    createdAt: "",
    updatedAt: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const mapBuilding = (building: BuildingResponse) => {
    const { _id: id, square_meters: area, ...rest } = building;
    return {
      id,
      area,
      ...rest,
    };
  };

  useEffect(() => {
    BuildingsApi.getBuilding(buildingId)
      .then((data) => {
        const building = mapBuilding(data);
        setBuilding(building);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [buildingId]);

  return { isLoading, error, building };
}
