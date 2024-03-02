import { ReactNode } from "react";
import styled from "styled-components";

import { capitalize } from "../utils/capitalize";
import { useBuilding } from "../hooks/useBuilding";

const StyledInfo = styled.div``;

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
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3.2rem;
`;

const Status = styled.div<{ $paid: boolean }>`
  padding: 1.2rem;
  border-radius: 2.1rem;

  ${(props) =>
    `background-color: var(--color-${props.$paid ? "emerald-500" : "red-500"})`}
`;

const Availability = styled.div<{ $available: boolean }>`
  padding: 1.2rem;
  border-radius: 2.1rem;

  ${(props) =>
    `background-color: var(--color-${
      props.$available ? "emerald-500" : "red-500"
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

const OrderId = styled.div`
  padding: 1.2rem;
  margin-left: auto;
  border-bottom: 2px solid #fff;
`;

type Props = {
  orderId?: string;
  buildingId: string | undefined;
  created?: string;
  updated?: string;
  paid?: boolean;
  isOrder: boolean;
  children?: ReactNode;
};

export default function Info({
  orderId,
  buildingId,
  created,
  updated,
  paid = false,
  isOrder,
}: Props) {
  const { isLoading, error, building } = useBuilding(buildingId);

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
    createdAt,
    updatedAt,
  } = building;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledInfo>
      <StatusWrapper>
        {isOrder && (
          <Status $paid={paid}>{paid ? "Paid" : "Processing"}</Status>
        )}

        {!isOrder && (
          <Availability $available={available}>
            {available ? "Available" : "Not available"}
          </Availability>
        )}

        {discount_value > 0 && <Discount>{discount_value}% Discount</Discount>}

        <Created>
          Created:{" "}
          {isOrder && created
            ? new Date(created).toLocaleDateString()
            : new Date(createdAt).toLocaleDateString()}
        </Created>
        <Updated>
          Updated:{" "}
          {isOrder && updated
            ? new Date(updated).toLocaleDateString()
            : new Date(updatedAt).toLocaleDateString()}
        </Updated>

        {isOrder && <OrderId>Order id:{orderId}</OrderId>}
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
