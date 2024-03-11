import styled from "styled-components";
import { useParams } from "react-router-dom";

import Info from "../ui/Info";

import { useBuilding } from "../hooks/useBuilding";

const StyledBuildingPage = styled.div`
  font-weight: 600;
`;

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3.2rem;

  @media (max-width: 1279px) {
    display: grid;
    grid-template-columns: repeat(4, 25fr);
    font-size: 1.4rem;
  }
`;

const Availability = styled.div<{ $isAvailable: boolean }>`
  padding: 1.2rem;
  border-radius: 2.1rem;

  ${(props) =>
    `background-color: var(--color-${
      props.$isAvailable ? "emerald-500" : "red-500"
    })`}
`;

const Discount = styled.div`
  padding: 1.2rem;
  border-radius: 2.1rem;
  background-color: var(--color-emerald-500);
`;

const Created = styled.div`
  padding: 1.2rem;
`;

const Updated = styled.div`
  padding: 1.2rem;
`;

export default function BuildingPage() {
  const { buildingId } = useParams();
  const { isLoading, error, building } = useBuilding(buildingId);

  const { createdAt, updatedAt, discount_value, available } = building;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledBuildingPage>
      <StatusWrapper>
        <Availability $isAvailable={available}>
          {available ? "Available" : "Not available"}
        </Availability>
        {discount_value > 0 && <Discount>{discount_value}% Discount</Discount>}

        <Created>Created: {new Date(createdAt).toLocaleDateString()}</Created>
        <Updated>Updated: {new Date(updatedAt).toLocaleDateString()}</Updated>
      </StatusWrapper>

      <Info building={building} />
    </StyledBuildingPage>
  );
}
