import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import OrderInfo from "../features/orders/OrderInfo";
import LoaderWrapper from "../ui/LoaderWrapper";
import Loader from "../ui/Loader";

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

  const handleOrderUpdate = (id: string | undefined, order: OrderRequest) => {
    if (id) {
      OrdersApi.updateOrder(id, order).then((data) => {
        const orders = mapOrders(data);
        setOrders(orders);
        const newOrder = mapOrder({ _id: id, ...order });
        setOrder(newOrder);
      });
    }
  };

  const handleBuildingUpdate = (id: string, building: BuildingRequest) => {
    BuildingsApi.updateBuilding(id, building);
  };

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrderPage>
      <OrderInfo
        order={order}
        onBuildingUpdate={handleBuildingUpdate}
        onOrderUpdate={handleOrderUpdate}
      />
    </StyledOrderPage>
  );
}
