import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Info from "../ui/Info";

import OrdersApi from "../api/OrdersApi";
import {
  BuildingRequest,
  Order,
  OrderRequest,
  OrderResponse,
} from "../lib/types";
import { BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";
import { useBuilding } from "../hooks/useBuilding";
import ConfirmationModal from "../ui/ConfirmationModal";
import { createPortal } from "react-dom";
import Button from "../ui/Button";
import { AuthContext } from "../context/AuthContext";

const StyledOrderPage = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.8rem;
`;

export default function OrderPage() {
  const {
    currentUser: { token },
  } = useContext(AuthContext);
  const { setOrders } = useContext(BuildingsContext);
  const [order, setOrder] = useState<Order>({
    id: "",
    buildingId: "",
    createdAt: "",
    updatedAt: "",
    location: "",
    original_price: 0,
    paid: false,
    selling_price: 0,
    type: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  const { orderId } = useParams();

  const { buildingId, paid, createdAt, updatedAt } = order;

  const {
    isLoading: isLoadingBuilding,
    error: errorBuilding,
    building,
  } = useBuilding(buildingId);

  const { discount_value, area } = building;

  const mapOrder = (order: OrderResponse) => {
    const { _id: id, ...rest } = order;
    return {
      id,
      ...rest,
    };
  };

  const mapOrders = (orders: OrderResponse[]) => {
    return orders.map((order) => mapOrder(order));
  };

  useEffect(() => {
    if (!token) return;

    OrdersApi.getOrder(orderId, token)
      .then((data) => {
        const order = mapOrder(data);
        setOrder(order);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [orderId, token]);

  const handleUpdate = (id: string | undefined, order: OrderRequest) => {
    if (!token) return;

    if (id) {
      OrdersApi.updateOrder(id, order, token).then((data) => {
        const orders = mapOrders(data);
        setOrders(orders);
        const newOrder = mapOrder({ _id: id, ...order });
        setOrder(newOrder);
      });
    }
  };

  const handleBuildingUpdate = (id: string, building: BuildingRequest) => {
    if (!token) return;

    BuildingsApi.updateBuilding(id, building, token);
  };

  if (isLoading || isLoadingBuilding) return <div>Loading...</div>;

  if (error || errorBuilding) return <div>Something went wrong...</div>;

  return (
    <StyledOrderPage>
      <StatusWrapper>
        <Status $paid={paid}>{paid ? "Paid" : "Processing"}</Status>

        {discount_value > 0 && <Discount>{discount_value}% Discount</Discount>}

        <Created>Created: {new Date(createdAt).toLocaleDateString()}</Created>
        <Updated>Updated: {new Date(updatedAt).toLocaleDateString()}</Updated>

        {order && <OrderId>Order id: {orderId}</OrderId>}
      </StatusWrapper>

      <Info building={building} />

      <ButtonWrapper>
        <Button variant="regular" onClick={() => setIsOpen(true)}>
          Confirm paying
        </Button>
        {isOpen &&
          createPortal(
            <ConfirmationModal
              setIsOpen={setIsOpen}
              onClick={() => {
                handleUpdate(orderId, { ...order, paid: true });
                handleBuildingUpdate(buildingId, {
                  ...building,
                  available: false,
                  square_meters: area,
                });
              }}
            />,
            document.body
          )}
      </ButtonWrapper>
    </StyledOrderPage>
  );
}
