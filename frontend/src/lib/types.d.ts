export type BuildingResponse = {
  _id: string;
  type: string;
  location: string;
  address: string;
  selling_price: number;
  discount_value: number;
  nr_balconies: number;
  nr_bathrooms: number;
  nr_floors: number;
  nr_garages: number;
  nr_rooms: number;
  original_price: number;
  square_meters: number;
  description: string;
  available: boolean;
};

export type BuildingRequest = Omit<BuildingResponse, "_id">;

export type Building = {
  id: string;
  type: string;
  location: string;
  address: string;
  selling_price: number;
  original_price: number;
  discount_value: number;
  nr_balconies: number;
  nr_bathrooms: number;
  nr_floors: number;
  nr_garages: number;
  nr_rooms: number;
  area: number;
  description: string;
  available: boolean;
};

export type BuildingWithoutId = Omit<Building, "id">;
