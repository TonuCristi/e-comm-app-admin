import { AxiosResponse } from "axios";

import api from "../config/api";
import { OrderRequest, OrderResponse } from "../lib/types";

const OrdersApi = {
  getOrders(bearer: string) {
    return api
      .get("/orders", {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      })
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
  getOrder(id: string | undefined, bearer: string) {
    return api
      .get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      })
      .then(({ data }: AxiosResponse<OrderResponse>) => data);
  },
  //   addOrder(newOrder: OrderRequest) {
  //     return api
  //       .post("/orders", { newOrder })
  //       .then(({ data }: AxiosResponse<OrderResponse>) => data);
  //   },
  deleteOrder(id: string, bearer: string) {
    return api
      .delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      })
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
  updateOrder(id: string, newOrder: OrderRequest, bearer: string) {
    return api
      .put(
        `/orders/${id}`,
        { ...newOrder },
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      )
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
};

export default OrdersApi;
