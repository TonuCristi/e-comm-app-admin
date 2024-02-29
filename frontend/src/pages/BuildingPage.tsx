import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import BuildingsApi from "../api/BuildingsApi";
import { Building, BuildingResponse } from "../lib/types";
import { capitalize } from "../utils/capitalize";

const StyledBuildigPage = styled.div`
  font-weight: 600;
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4.8rem;
  row-gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const Field = styled.div`
  font-size: 1.8rem;
  padding: 1rem;
  border-bottom: 2px solid #fff;
`;

const Description = styled.div`
  font-size: 1.8rem;
  padding: 1rem;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Availability = styled.div<{ $available: boolean }>`
  padding: 1.2rem;
  border-radius: 2.1rem;
  margin-bottom: 2.4rem;

  ${(props) =>
    `background-color: var(--color-${
      props.$available ? "emerald-500" : "red-500"
    })`}
`;

const Discount = styled.div`
  padding: 1.2rem;
  border-radius: 2.1rem;
  margin-bottom: 2.4rem;
  background-color: var(--color-emerald-500);
`;

export default function BuildingPage() {
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
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { buildingId } = useParams();

  const {
    id,
    type,
    location,
    address,
    description,
    available,
    area,
    nr_balconies,
    nr_bathrooms,
    nr_floors,
    nr_garages,
    nr_rooms,
    selling_price,
    original_price,
    discount_value,
  } = building;

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

  console.log(building);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledBuildigPage>
      <StatusWrapper>
        <Availability $available={available}>
          {available ? "Available" : "Not available"}
        </Availability>

        {discount_value > 0 && <Discount>{discount_value}% Discount</Discount>}
      </StatusWrapper>

      <Wrapper>
        <Field>Id: {id}</Field>
        <Field>Type: {capitalize(type)}</Field>
        <Field>Location: {capitalize(location)}</Field>
        <Field>Address: {address}</Field>
        <Field>
          Area: {area} m<sup>2</sup>
        </Field>
        <Field>Number of floors: {nr_floors}</Field>
        <Field>Number of rooms: {nr_rooms}</Field>
        <Field>Number of bathrooms: {nr_bathrooms}</Field>
        <Field>Number of balconies: {nr_balconies}</Field>
        <Field>Number of garages: {nr_garages}</Field>
        <Field>Selling price: {selling_price}</Field>
        <Field>Original price: {original_price}</Field>
      </Wrapper>

      <Description>Description: {description}</Description>
    </StyledBuildigPage>
  );
}
