import { AxiosResponse } from "axios";
import api from "../config/api";
import { BuildingResponse, BuildingPayload } from "../lib/types";

const BuildingsApi = {
  getBuildings() {
    return api
      .get("/buildings")
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  deleteBuilding(id: string) {
    return api
      .delete(`/buildings/${id}`)
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  addBuilding(newBuilding: BuildingPayload) {
    return api
      .post("/buildings", { ...newBuilding })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  updateBuilding(id: string, newBuilding: BuildingPayload) {
    return api
      .put(`/buildings/${id}`, { ...newBuilding })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
};

export default BuildingsApi;
