import { AxiosResponse } from "axios";
import api from "../config/api";
import { BuildingResponse, BuildingRequest } from "../lib/types";

const BuildingsApi = {
  getBuildings() {
    return api
      .get("/buildings")
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  getBuilding(id: string | undefined) {
    return api
      .get(`/buildings/${id}`)
      .then(({ data }: AxiosResponse<BuildingResponse>) => data);
  },
  deleteBuilding(id: string) {
    return api
      .delete(`/buildings/${id}`)
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  addBuilding(newBuilding: BuildingRequest) {
    return api
      .post("/buildings", { ...newBuilding })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
  updateBuilding(id: string, newBuilding: BuildingRequest) {
    return api
      .put(`/buildings/${id}`, { ...newBuilding })
      .then(({ data }: AxiosResponse<BuildingResponse[]>) => data);
  },
};

export default BuildingsApi;
