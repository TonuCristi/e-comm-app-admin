import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Info from "./Info";

import OrdersApi from "../api/OrdersApi";
import { Order, OrderRequest, OrderResponse } from "../lib/types";
import { BuildingsContext } from "../context/BuildingsContext";

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

  const { buildingId, createdAt, updatedAt, paid } = order;

  const mapOrder = (order: OrderResponse) => {
    const { _id: id, ...rest } = order;
    return {
      id,
      ...rest,
    };
  };

  const mapOrders = (orders: OrderResponse[]) => {
    orders.map((order) => mapOrder(order));
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

  const handleUpdate = (id: string, newOrder: OrderRequest) => {
    OrdersApi.updateOrder(id, newOrder).then((data) => {
      const orders = mapOrders(data);
      // setOrders(orders);
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrderPage>
      <Info
        orderId={orderId}
        buildingId={buildingId}
        created={createdAt}
        updated={updatedAt}
        paid={paid}
        isOrder={true}
      />
    </StyledOrderPage>
  );
}
