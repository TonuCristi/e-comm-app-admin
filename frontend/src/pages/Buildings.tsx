import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";

import Table from "../features/buildings/Table";
import Sort from "../ui/Sort";
import Filter from "../ui/Filter";
import AddBuildingButton from "../features/buildings/AddBuildingButton";
import Pagination from "../ui/Pagination";

import { BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";
import { Building, BuildingWithoutId } from "../lib/types";

const sortTypes = [
  {
    "price-asc": "Price ascending",
  },
  {
    "price-desc": "Price descending",
  },
  {
    "area-asc": "Area ascending",
  },
  {
    "area-desc": "Area descending",
  },
];

const StyledBuildings = styled.div``;

const Wrapper = styled.div``;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;

const ButtonWrapper = styled.div`
  margin-right: auto;
`;

export default function Buildings() {
  const { buildings, isLoading, error, setIsLoading, setError, setBuildings } =
    useContext(BuildingsContext);
  const [pageNr, setPageNr] = useState<number>(0);
  const buildingsPerPage = 9;
  const buildingsCount = buildings.length;

  useEffect(() => {
    BuildingsApi.getBuildings()
      .then((data) => {
        setError("");
        setIsLoading(true);
        setBuildings(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setBuildings, setIsLoading, setError]);

  const fieldFilter = useCallback(
    (field: "location" | "type") =>
      buildings
        ?.map((building: Building) => building[field])
        .filter(
          (item: string, i: number, arr: string[]) => arr.indexOf(item) === i
        )
        .map((item: string) => {
          return { [item.toLowerCase()]: item };
        }),
    [buildings]
  );

  const handleDelete = (id: string) => {
    BuildingsApi.deleteBuilding(id).then((data) => setBuildings(data));
  };

  const handleAdd = (newBuilding: BuildingWithoutId) => {
    BuildingsApi.addBuilding(newBuilding).then((data) => setBuildings(data));
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong....</div>;

  return (
    <StyledBuildings>
      <Wrapper>
        <Controls>
          <ButtonWrapper>
            <AddBuildingButton onBuildingAdd={handleAdd} />
          </ButtonWrapper>
          <Filter
            defaultValue="all"
            filters={fieldFilter("type")}
            filter="type"
          />
          <Filter
            defaultValue="all"
            filters={fieldFilter("location")}
            filter="location"
          />
          <Sort defaultValue="ascending" sortTypes={sortTypes} />
        </Controls>
      </Wrapper>

      <Table
        buildings={buildings.slice(
          pageNr * buildingsPerPage,
          buildingsPerPage * (pageNr + 1)
        )}
        buildingsPerPage={buildingsPerPage}
        pageNr={pageNr}
        onBuildingDelete={handleDelete}
      />
      <Pagination
        pageNr={pageNr}
        setPageNr={setPageNr}
        dataPerPage={buildingsPerPage}
        dataCount={buildingsCount}
      />
    </StyledBuildings>
  );
}
