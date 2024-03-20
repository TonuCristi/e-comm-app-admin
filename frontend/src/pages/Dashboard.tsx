import { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  HiMiniBuildingOffice2,
  HiMiniCurrencyDollar,
  HiMiniBuildingLibrary,
  HiMiniChartBar,
  HiMiniUsers,
} from "react-icons/hi2";

import Card from "../features/dashboard/Card";
import Chart from "../features/dashboard/Chart";
import LoaderWrapper from "../ui/LoaderWrapper";
import Loader from "../ui/Loader";

import { BuildingsContext } from "../context/BuildingsContext";
import { BuildingResponse, OrderResponse } from "../lib/types";
import BuildingsApi from "../api/BuildingsApi";
import OrdersApi from "../api/OrdersApi";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
`;

const SalesIcon = styled(HiMiniBuildingLibrary)`
  font-size: 3.2rem;
`;

const ProfitIcon = styled(HiMiniCurrencyDollar)`
  font-size: 3.2rem;
`;

const BuildingsIcon = styled(HiMiniBuildingOffice2)`
  font-size: 3.2rem;
`;

const OrdersIcon = styled(HiMiniChartBar)`
  font-size: 3.2rem;
`;

const UsersIcon = styled(HiMiniUsers)`
  font-size: 3.2rem;
`;

export default function Dashboard() {
  const {
    isLoading,
    error,
    buildings,
    orders,
    setIsLoading,
    setError,
    setBuildings,
    setOrders,
  } = useContext(BuildingsContext);

  // Total sales
  const totalSales = orders.filter((order) => order.paid).length;

  // Total Profit
  const totalProfit = orders
    .filter((order) => order.paid)
    .map((order) => order.selling_price - order.original_price)
    .reduce((acc, val) => acc + val, 0);

  const getBuildingType = (type: string) =>
    orders.filter((order) => order.type === type).length;

  // Sales per building
  const salesPerBuilding = (type: string) =>
    orders.filter((order) => order.type === type && order.paid).length;

  const data = [
    {
      name: "Duplex",
      Orders: getBuildingType("duplex"),
      Sales: salesPerBuilding("duplex"),
    },
    {
      name: "Apartment",
      Orders: getBuildingType("apartment"),
      Sales: salesPerBuilding("apartment"),
    },
    {
      name: "House",
      Orders: getBuildingType("house"),
      Sales: salesPerBuilding("house"),
    },
  ];

  const mapBuildings = (buildings: BuildingResponse[]) =>
    buildings.map((building) => {
      const { _id: id, square_meters: area, ...rest } = building;
      return {
        id,
        area,
        ...rest,
      };
    });

  const mapOrders = (orders: OrderResponse[]) =>
    orders.map((order) => {
      const { _id: id, ...rest } = order;
      return { id, ...rest };
    });

  useEffect(() => {
    Promise.all([BuildingsApi.getBuildings(), OrdersApi.getOrders()])
      .then((res) => {
        const buildings = mapBuildings(res[0]);
        const orders = mapOrders(res[1]);
        setBuildings(buildings);
        setOrders(orders);

        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setBuildings, setOrders, setError, setIsLoading]);

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledDashboard>
      <Card title="Total Sales" data={totalSales}>
        <SalesIcon />
      </Card>

      <Card type="currency" title="Total Profit" data={totalProfit}>
        <ProfitIcon />
      </Card>

      <Card title="Total Buildings" data={buildings.length}>
        <BuildingsIcon />
      </Card>

      <Card title="Total Orders" data={orders.length}>
        <OrdersIcon />
      </Card>

      <Card title="Total Customers" data={5}>
        <UsersIcon />
      </Card>

      <Chart data={data} />
    </StyledDashboard>
  );
}
