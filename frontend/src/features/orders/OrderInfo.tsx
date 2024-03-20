import styled from "styled-components";
import { useState } from "react";
import { createPortal } from "react-dom";

import ConfirmationModal from "../../ui/ConfirmationModal";
import Button from "../../ui/Button";

import { capitalize } from "../../utils/capitalize";
import { useBuilding } from "../../hooks/useBuilding";
import { BuildingRequest, Order, OrderRequest } from "../../lib/types";

const StyledOrderInfo = styled.div``;

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

const Status = styled.div<{ $paid: boolean }>`
  padding: 1.2rem;
  border-radius: 2.1rem;

  ${(props) =>
    `background-color: var(--color-${props.$paid ? "emerald-500" : "red-500"})`}
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

  @media (max-width: 1279px) {
    grid-column: 3 / 5;
  }
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.8rem;
`;

type Props = {
  order: Order;
  onBuildingUpdate: (id: string, building: BuildingRequest) => void;
  onOrderUpdate: (id: string | undefined, order: OrderRequest) => void;
};

export default function OrderInfo({
  order,
  onBuildingUpdate,
  onOrderUpdate,
}: Props) {
  const { buildingId, id: orderId, paid, createdAt, updatedAt } = order;
  const { error, building } = useBuilding(buildingId);
  const [isOpen, setIsOpen] = useState(false);

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
    discount_value,
  } = building;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrderInfo>
      <StatusWrapper>
        <Status $paid={paid}>{paid ? "Paid" : "Processing"}</Status>

        {discount_value > 0 && <Discount>{discount_value}% Discount</Discount>}

        <Created>Created: {new Date(createdAt).toLocaleDateString()}</Created>
        <Updated>Updated: {new Date(updatedAt).toLocaleDateString()}</Updated>

        <OrderId>Order id: {orderId}</OrderId>
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

      <ButtonWrapper>
        <Button variant="regular" onClick={() => setIsOpen(true)}>
          Confirm paying
        </Button>
        {isOpen &&
          createPortal(
            <ConfirmationModal
              setIsOpen={setIsOpen}
              onClick={() => {
                onOrderUpdate(orderId, { ...order, paid: true });
                onBuildingUpdate(buildingId, {
                  ...building,
                  available: false,
                  square_meters: area,
                });
              }}
            />,
            document.body
          )}
      </ButtonWrapper>
    </StyledOrderInfo>
  );
}
