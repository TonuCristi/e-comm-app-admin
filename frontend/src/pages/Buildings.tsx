import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import Table from "../ui/Table";
import AddBuildingButton from "../features/buildings/AddBuildingButton";
import Pagination from "../ui/Pagination";
import TableHeader from "../ui/TableHeader";
import TableRow from "../features/buildings/TableRow";
import BuildingsControls from "../features/buildings/BuildingsControls";
import Input from "../ui/Input";
import Search from "../ui/Search";
import LoaderWrapper from "../ui/LoaderWrapper";
import Loader from "../ui/Loader";

import { BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";
import { Building, BuildingResponse, BuildingRequest } from "../lib/types";
import { GlobalContext } from "../context/GlobalContext";

const PER_PAGE = 9;

const fields = [
  "Nr.",
  "Id",
  "Type",
  "Selling Price",
  "Discount",
  "Location",
  "",
];

const StyledBuildings = styled.div`
  @media (max-width: 1535px) {
    font-size: 1.4rem;
  }
`;

const InputWrapper = styled.div`
  margin-right: auto;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export default function Buildings() {
  const { buildings, isLoading, error, setIsLoading, setError, setBuildings } =
    useContext(BuildingsContext);
  const [pageNr, setPageNr] = useState<number>(0);
  const { reset, watch, register } = useForm<FieldValues>({
    defaultValues: {
      searchValue: "",
      available: true,
    },
  });
  const [searchParams] = useSearchParams();
  const { currentUser } = useContext(GlobalContext);

  // Type filter
  const typeFilter = searchParams.get("type")
    ? buildings.filter((building) => {
        return (
          building.type.toLowerCase() ===
          searchParams.get("type")?.toLowerCase()
        );
      })
    : buildings;

  // Location filter
  const locationFilter = typeFilter.filter((building) => {
    if (!searchParams.get("location")) return true;
    return (
      building.location.toLowerCase() ===
      searchParams.get("location")?.toLowerCase()
    );
  });

  // Sort
  const sortBuildings = !searchParams.get("sort")
    ? locationFilter
    : locationFilter.sort((a, b) => {
        if (searchParams.get("sort") === "price-desc") {
          return b.selling_price - a.selling_price;
        }

        return a.selling_price - b.selling_price;
      });

  // Availability filter
  const availableBuildings = sortBuildings.filter(
    (building) => building.available === watch("available")
  );

  // Search
  const allBuildings = availableBuildings.filter((building) =>
    building.id.toLowerCase().startsWith(watch("searchValue").toLowerCase())
  );

  const mapBuildings = (buildings: BuildingResponse[]) =>
    buildings.map((building) => {
      const { _id: id, square_meters: area, ...rest } = building;
      return {
        id,
        area,
        ...rest,
      };
    });

  useEffect(() => {
    BuildingsApi.getBuildings()
      .then((data) => {
        const buildings = mapBuildings(data);
        setBuildings(buildings);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setBuildings, setIsLoading, setError]);

  const handleDelete = (id: string) => {
    BuildingsApi.deleteBuilding(id).then((data) => {
      const buildings = mapBuildings(data);
      setBuildings(buildings);
      setPageNr(0);
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

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledBuildings>
      <BuildingsControls buildings={buildings}>
        <AddBuildingButton onBuildingAdd={handleAdd} />

        <InputWrapper>
          <Search reset={reset}>
            <Input
              variant="search"
              placeholder="Search by id..."
              register={register}
              searchField="searchValue"
            />
          </Search>
        </InputWrapper>

        <CheckBoxWrapper>
          <input
            id="available"
            type="checkbox"
            {...register("available", {
              onChange: () => setPageNr(0),
            })}
          />
          <label htmlFor="available">Availability</label>
        </CheckBoxWrapper>
      </BuildingsControls>

      <Table>
        <TableHeader
          variant={
            currentUser.role !== "employee" ? "buildings" : "buildingsEmployee"
          }
          fields={fields}
          user={currentUser}
        />
        {allBuildings
          .slice(pageNr * PER_PAGE, PER_PAGE * (pageNr + 1))
          .map((building: Building, i: number) => (
            <TableRow
              key={building.id}
              nr={pageNr * PER_PAGE + i + 1}
              building={building}
              onBuildingDelete={handleDelete}
              onBuildingUpdate={handleUpdate}
              user={currentUser}
            />
          ))}
      </Table>

      <Pagination
        pageNr={pageNr}
        setPageNr={setPageNr}
        dataPerPage={PER_PAGE}
        dataCount={allBuildings.length}
      />
    </StyledBuildings>
  );
}
