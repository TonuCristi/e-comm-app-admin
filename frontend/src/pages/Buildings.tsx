import styled from "styled-components";
import { useContext, useEffect, useMemo, useState } from "react";

import Table from "../features/buildings/Table";
import Sort from "../ui/Sort";
import Filter from "../ui/Filter";
import AddBuildingButton from "../features/buildings/AddBuildingButton";
import Pagination from "../ui/Pagination";

import { Building, BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";

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

  const locationFilter = useMemo(
    () =>
      buildings
        ?.map((building: Building) => building.location)
        .filter(
          (location: string, i: number, arr: string[]) =>
            arr.indexOf(location) === i
        )
        .map((location: string) => {
          return { [location.toLowerCase()]: location };
        }),
    [buildings]
  );

  const typeFilter = useMemo(
    () =>
      buildings
        ?.map((building: Building) => building.type)
        .filter(
          (type: string, i: number, arr: string[]) => arr.indexOf(type) === i
        )
        .map((type: string) => {
          return { [type.toLowerCase()]: type };
        }),
    [buildings]
  );

  const handleDelete = (id: string) => {
    BuildingsApi.deleteBuilding(id).then((data) => setBuildings(data));
  };

  const handleAdd = (newBuilding: Building) => {
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
          <Filter defaultValue="all" filters={typeFilter} filter="type" />
          <Filter
            defaultValue="all"
            filters={locationFilter}
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
