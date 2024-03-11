import styled from "styled-components";

import { capitalize } from "../utils/capitalize";
import { Building } from "../lib/types";

const StyledInfo = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4.8rem;
  row-gap: 1.8rem;
  margin-bottom: 2.4rem;

  @media (max-width: 1279px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Field = styled.div`
  font-size: 1.8rem;
  padding: 1rem;
  border-bottom: 2px solid #fff;

  @media (max-width: 1535px) {
    font-size: 1.6rem;
  }

  @media (max-width: 1279px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.div`
  font-size: 1.8rem;
  padding: 1rem;

  @media (max-width: 1535px) {
    font-size: 1.6rem;
  }

  @media (max-width: 1279px) {
    font-size: 1.4rem;
  }
`;

type Props = {
  building: Building;
};

export default function Info({ building }: Props) {
  const {
    id,
    type,
    location,
    address,
    description,
    area,
    nr_balconies,
    nr_bathrooms,
    nr_floors,
    nr_garages,
    nr_rooms,
    selling_price,
    original_price,
  } = building;

  return (
    <StyledInfo>
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
        <Field>
          Selling price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(selling_price)}
        </Field>
        <Field>
          Original price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(original_price)}
        </Field>
      </Wrapper>

      <Description>Description: {description}</Description>
    </StyledInfo>
  );
}
