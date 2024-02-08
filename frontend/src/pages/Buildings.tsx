import styled from "styled-components";

import BuildingsTable from "../features/buildings/BuildingsTable";
import Sort from "../features/buildings/Sort";
import Filter from "../features/buildings/Filter";
import AddBuildingButton from "../features/buildings/AddBuildingButton";

import { useBuildings } from "../features/buildings/useBuildings";

export interface Building {
  _id: string;
  type: string;
  location: string;
  selling_price: number;
  address: string;
  description: string;
  discount_value: number;
  nr_balconies: number;
  nr_bathrooms: number;
  nr_floors: number;
  nr_garages: number;
  nr_rooms: number;
  original_price: number;
  square_meters: number;
}

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

const Wrapper = styled.div`
  height: 100%;
  width: 90%;
  margin: 0 auto;
`;

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
  const { buildings, isLoading, error } = useBuildings();

  const locationFilter = buildings
    ?.map((building: Building) => building.location)
    .filter(
      (location: string, i: number, arr: string[]) =>
        arr.indexOf(location) === i
    )
    .map((location: string) => {
      return { [location.toLowerCase()]: location };
    });

  const typeFilter = buildings
    ?.map((building: Building) => building.type)
    .filter((type: string, i: number, arr: string[]) => arr.indexOf(type) === i)
    .map((type: string) => {
      return { [type.toLowerCase()]: type };
    });

  return (
    <StyledBuildings>
      <Wrapper>
        <Controls>
          <ButtonWrapper>
            <AddBuildingButton />
          </ButtonWrapper>
          <Filter filters={typeFilter} filter="type" />
          <Filter filters={locationFilter} filter="location" />
          <Sort sortTypes={sortTypes} />
        </Controls>
      </Wrapper>

      <Wrapper>
        <BuildingsTable
          buildings={buildings}
          isLoading={isLoading}
          error={error}
        />
      </Wrapper>
    </StyledBuildings>
  );
}
