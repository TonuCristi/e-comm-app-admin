import { AxiosResponse } from "axios";
import api from "../config/api";

import { Building, BuildingWithId } from "../context/BuildingsContext";

const BuildingsApi = {
  getBuildings() {
    return api
      .get("/buildings")
      .then(({ data }: AxiosResponse<BuildingWithId[]>) => data);
  },
  deleteBuilding(id: string) {
    return api
      .delete(`/buildings/${id}`)
      .then(({ data }: AxiosResponse<BuildingWithId[]>) => data);
  },
  addBuilding(newBuilding: Building) {
    return api
      .post("/buildings", { ...newBuilding })
      .then(({ data }: AxiosResponse<BuildingWithId[]>) => data);
  },
};

export default BuildingsApi;
