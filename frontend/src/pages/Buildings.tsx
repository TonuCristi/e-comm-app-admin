import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import Table from "../features/buildings/Table";
import AddBuildingButton from "../features/buildings/AddBuildingButton";
import Pagination from "../ui/Pagination";
import TableHeader from "../ui/TableHeader";
import TableRow from "../features/buildings/TableRow";
import BuildingsControls from "../features/buildings/BuildingsControls";
import Input from "../ui/Input";
import BuildingsSearch from "../features/buildings/BuildingsSearch";

import { BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";
import { Building, BuildingResponse, BuildingRequest } from "../lib/types";

const fields = [
  "Nr.",
  "Id",
  "Type",
  "Selling Price",
  "Discount",
  "Area",
  "Location",
  "",
];

const StyledBuildings = styled.div``;

const InputWrapper = styled.div`
  margin-right: auto;
`;

export default function Buildings() {
  const { buildings, isLoading, error, setIsLoading, setError, setBuildings } =
    useContext(BuildingsContext);
  const [pageNr, setPageNr] = useState<number>(0);
  const { reset, watch, register } = useForm<FieldValues>({
    defaultValues: {
      searchValue: "",
    },
  });
  const [searchParams] = useSearchParams();

  const buildingsPerPage = 9;

  // Type filter
  const typeFilterBuildings = buildings.filter((building) => {
    if (!searchParams.get("type")?.toLowerCase()) return true;
    return (
      building.type.toLowerCase() === searchParams.get("type")?.toLowerCase()
    );
  });

  // Location filter
  const locationFilterBuildings = typeFilterBuildings.filter((building) => {
    if (!searchParams.get("location")?.toLowerCase()) return true;
    return (
      building.location.toLowerCase() ===
      searchParams.get("location")?.toLowerCase()
    );
  });

  // Sort
  const sortBuildings = !searchParams.get("sort")
    ? locationFilterBuildings
    : locationFilterBuildings.sort((a, b) => {
        if (searchParams.get("sort") === "price-desc") {
          return b.selling_price - a.selling_price;
        }

        if (searchParams.get("sort") === "area-asc") {
          return a.area - b.area;
        }

        if (searchParams.get("sort") === "area-desc") {
          return b.area - a.area;
        }

        return a.selling_price - b.selling_price;
      });

  // Search
  const allBuildings = sortBuildings.filter((building) =>
    building.id.toLowerCase().includes(watch("searchValue").toLowerCase())
  );

  const mapBuildings = (buildings: BuildingResponse[]) =>
    buildings.map((building) => ({
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
    }));

  useEffect(() => {
    BuildingsApi.getBuildings()
      .then((data) => {
        const buildings = mapBuildings(data);
        setBuildings(buildings);
        setIsLoading(true);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setBuildings, setIsLoading, setError]);

  const handleDelete = (id: string) => {
    BuildingsApi.deleteBuilding(id).then((data) => {
      const buildings = mapBuildings(data);
      setBuildings(buildings);
    });
  };

  const handleAdd = (building: BuildingRequest) => {
    BuildingsApi.addBuilding(building).then((data) => {
      const buildings = mapBuildings(data);
      setBuildings(buildings);
    });
  };

  const handleUpdate = (id: string, building: BuildingRequest) => {
    BuildingsApi.updateBuilding(id, building).then((data) => {
      const buildings = mapBuildings(data);
      setBuildings(buildings);
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong....</div>;

  return (
    <StyledBuildings>
      <BuildingsControls buildings={buildings}>
        <AddBuildingButton onBuildingAdd={handleAdd} />
        <InputWrapper>
          <BuildingsSearch reset={reset}>
            <Input
              variant="search"
              placeholder="Search by id..."
              register={register}
            />
          </BuildingsSearch>
        </InputWrapper>
      </BuildingsControls>

      <Table>
        <TableHeader variant="buildings" fields={fields} />
        {allBuildings
          .slice(pageNr * buildingsPerPage, buildingsPerPage * (pageNr + 1))
          .map((building: Building, i: number) => (
            <TableRow
              key={building.id}
              nr={pageNr * buildingsPerPage + i + 1}
              building={building}
              onBuildingDelete={handleDelete}
              onBuildingUpdate={handleUpdate}
            />
          ))}
      </Table>

      <Pagination
        pageNr={pageNr}
        setPageNr={setPageNr}
        dataPerPage={buildingsPerPage}
        dataCount={allBuildings.length}
      />
    </StyledBuildings>
  );
}
