import { AxiosResponse } from "axios";
import api from "../config/api";
import { Building, BuildingWithoutId } from "../lib/types";

const BuildingsApi = {
  getBuildings() {
    return api
      .get("/buildings")
      .then(({ data }: AxiosResponse<Building[]>) => data);
  },
  deleteBuilding(id: string) {
    return api
      .delete(`/buildings/${id}`)
      .then(({ data }: AxiosResponse<Building[]>) => data);
  },
  addBuilding(newBuilding: BuildingWithoutId) {
    return api
      .post("/buildings", { ...newBuilding })
      .then(({ data }: AxiosResponse<Building[]>) => data);
  },
  updateBuilding(id: string, newBuilding: BuildingWithoutId) {
    return api
      .put(`/buildings/${id}`, { ...newBuilding })
      .then(({ data }: AxiosResponse<Building[]>) => data);
  },
};

export default BuildingsApi;
