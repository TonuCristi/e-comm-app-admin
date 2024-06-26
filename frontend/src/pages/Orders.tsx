import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import TableHeader from "../ui/TableHeader";
import Table from "../ui/Table";
import TableRow from "../features/orders/TableRow";
import Pagination from "../ui/Pagination";
import Input from "../ui/Input";
import Search from "../ui/Search";
import OrdersControls from "../features/orders/OrdersControls";
import Filter from "../features/orders/Filter";
import Loader from "../ui/Loader";
import LoaderWrapper from "../ui/LoaderWrapper";

import { BuildingsContext } from "../context/BuildingsContext";
import OrdersApi from "../api/OrdersApi";
import { OrderResponse } from "../lib/types";
import { GlobalContext } from "../context/GlobalContext";

const PER_PAGE = 9;

const fields = ["Nr.", "Id", "Type", "Location", "Price", "Status", ""];

const StyledOrders = styled.div`
  @media (max-width: 1535px) {
    font-size: 1.4rem;
  }
`;

export default function Orders() {
  const { isLoading, error, orders, setIsLoading, setError, setOrders } =
    useContext(BuildingsContext);
  const [pageNr, setPageNr] = useState(0);
  const { register, reset, watch } = useForm<FieldValues>({
    defaultValues: {
      searchValue: "",
    },
  });
  const [searchParams] = useSearchParams();
  const { currentUser } = useContext(GlobalContext);

  // Status filter
  const statusFilter =
    searchParams.get("status") !== "paid"
      ? orders.filter(({ paid }) => paid === false)
      : orders.filter(({ paid }) => paid);

  // Search
  const allOrders = statusFilter.filter((order) =>
    order.id.toLowerCase().startsWith(watch("searchValue").toLowerCase())
  );

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

  const handleDelete = (id: string) => {
    OrdersApi.deleteOrder(id).then((data) => {
      const orders = mapOrders(data);
      setOrders(orders);
      setPageNr(0);
    });
  };

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledOrders>
      <OrdersControls>
        <Search reset={reset}>
          <Input
            variant="search"
            placeholder="Search by id..."
            register={register}
            searchField="searchValue"
          />
        </Search>

        <Filter setPageNr={setPageNr} />
      </OrdersControls>

      <Table>
        <TableHeader
          variant={
            currentUser.role !== "employee" ? "orders" : "ordersEmployee"
          }
          fields={fields}
        />
        {allOrders
          .slice(pageNr * PER_PAGE, PER_PAGE * (pageNr + 1))
          .map((order, i) => (
            <TableRow
              key={order.id}
              nr={pageNr * PER_PAGE + i + 1}
              order={order}
              onOrderDelete={handleDelete}
              user={currentUser}
            />
          ))}
      </Table>

      <Pagination
        pageNr={pageNr}
        setPageNr={setPageNr}
        dataPerPage={PER_PAGE}
        dataCount={allOrders.length}
      />
    </StyledOrders>
  );
}
