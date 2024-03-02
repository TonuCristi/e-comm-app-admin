import { AxiosResponse } from "axios";

import api from "../config/api";
import { OrderRequest, OrderResponse } from "../lib/types";

const OrdersApi = {
  getOrders() {
    return api
      .get("/orders")
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
  getOrder(id: string | undefined) {
    return api
      .get(`/orders/${id}`)
      .then(({ data }: AxiosResponse<OrderResponse>) => data);
  },
  //   addOrder(newOrder: OrderRequest) {
  //     return api
  //       .post("/orders", { newOrder })
  //       .then(({ data }: AxiosResponse<OrderResponse>) => data);
  //   },
  deleteOrder(id: string) {
    return api
      .delete(`/orders/${id}`)
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
  updateOrder(id: string, newOrder: OrderRequest) {
    return api
      .put(`/orders/${id}`, { ...newOrder })
      .then(({ data }: AxiosResponse<OrderResponse[]>) => data);
  },
};

export default OrdersApi;
