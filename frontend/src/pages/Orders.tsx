import { useContext, useEffect } from "react";
import styled from "styled-components";

import TableHeader from "../ui/TableHeader";

import { BuildingsContext } from "../context/BuildingsContext";
import OrdersApi from "../api/OrdersApi";
import { OrderResponse } from "../lib/types";
import Table from "../ui/Table";
import TableRow from "../features/orders/TableRow";

const fields = ["Nr.", "Id", "Type", "Location", "Price", "Status", ""];

const StyledOrders = styled.div``;

export default function Orders() {
  const { isLoading, error, orders, setIsLoading, setError, setOrders } =
    useContext(BuildingsContext);

  const mapOrders = (orders: OrderResponse[]) =>
    orders.map((order) => {
      const { _id: id, ...rest } = order;
      return { id, ...rest };
    });

  useEffect(() => {
    OrdersApi.getOrders()
      .then((data) => {
        const orders = mapOrders(data);
        setOrders(orders);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setError, setIsLoading, setOrders]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrders>
      <Table variant="orders">
        <TableHeader variant="orders" fields={fields} />
        {orders.map((order, i) => (
          <TableRow key={order.id} nr={i + 1} order={order} />
        ))}
      </Table>
    </StyledOrders>
  );
}
