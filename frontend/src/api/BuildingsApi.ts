import { AxiosResponse } from "axios";
import api from "../config/api";
import { BuildingResponse, BuildingRequest } from "../lib/types";

const BuildingsApi = {
  getBuildings(bearer: string) {
    return api
      .get("/buildings", {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  getBuilding(id: string | undefined, bearer: string) {
    return api
      .get(`/buildings/${id}`, {
        headers: { Authorization: `Bearer ${bearer}` },
      })
      .then(({ data }: AxiosResponse<BuildingResponse>) => data);
  },
  deleteBuilding(id: string, bearer: string) {
    return api
      .delete(`/buildings/${id}`, {
        headers: { Authorization: `Bearer ${bearer}` },
      })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  addBuilding(newBuilding: BuildingRequest, bearer: string) {
    return api
      .post(
        "/buildings",
        { ...newBuilding },
        { headers: { Authorization: `Bearer ${bearer}` } }
      )
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  updateBuilding(id: string, newBuilding: BuildingRequest, bearer: string) {
    return api
      .put(
        `/buildings/${id}`,
        { ...newBuilding },
        { headers: { Authorization: `Bearer ${bearer}` } }
      )
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
};

export default BuildingsApi;
