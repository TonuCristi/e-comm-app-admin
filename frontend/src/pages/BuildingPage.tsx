import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BuildingsApi from "../api/BuildingsApi";
import { Building, BuildingResponse } from "../lib/types";

export default function BuildingPage() {
  const [building, setBuilding] = useState<Building | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { buildingId } = useParams();

  const mapBuilding = (building: BuildingResponse) => ({
    id: building._id,
    type: building.type,
    location: building.location,
    address: building.address,
    selling_price: building.selling_price,
    original_price: building.original_price,
    discount_value: building.discount_value,
    nr_balconies: building.nr_balconies,
    nr_bathrooms: building.nr_bathrooms,
    nr_floors: building.nr_floors,
    nr_garages: building.nr_garages,
    nr_rooms: building.nr_rooms,
    area: building.square_meters,
    description: building.description,
    available: building.available,
  });

  useEffect(() => {
    BuildingsApi.getBuilding(buildingId)
      .then((data) => {
        const building = mapBuilding(data);
        setBuilding(building);
        setIsLoading(true);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [buildingId]);

  console.log(building);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return <div>{building?.id}</div>;
}
