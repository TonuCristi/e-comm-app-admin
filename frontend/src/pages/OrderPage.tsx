import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Info from "./Info";

import OrdersApi from "../api/OrdersApi";
import {
  BuildingRequest,
  Order,
  OrderRequest,
  OrderResponse,
} from "../lib/types";
import { BuildingsContext } from "../context/BuildingsContext";
import BuildingsApi from "../api/BuildingsApi";

const StyledOrderPage = styled.div`
  font-weight: 600;
`;

export default function OrderPage() {
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
  const { orderId } = useParams();

  const { buildingId } = order;

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
    OrdersApi.getOrder(orderId)
      .then((data) => {
        const order = mapOrder(data);
        setOrder(order);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  const handleUpdate = (id: string, order: OrderRequest) => {
    OrdersApi.updateOrder(id, order).then((data) => {
      const orders = mapOrders(data);
      setOrders(orders);
      const newOrder = mapOrder({ _id: id, ...order });
      setOrder(newOrder);
    });
  };

  const handleBuildingUpdate = (id: string, building: BuildingRequest) => {
    BuildingsApi.updateBuilding(id, building).then((data) => console.log(data));
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrderPage>
      <Info
        buildingId={buildingId}
        order={order}
        onOrderUpdate={handleUpdate}
        onBuildingUpdate={handleBuildingUpdate}
      />
    </StyledOrderPage>
  );
}
