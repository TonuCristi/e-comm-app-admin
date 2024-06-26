// ----- Buildings -----
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
};

export type BuildingWithoutId = Omit<Building, "id">;

// ----- Orders -----
export type OrderResponse = {
  _id: string;
  type: string;
  location: string;
  selling_price: number;
  original_price: number;
  paid: boolean;
  buildingId: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderRequest = Omit<OrderResponse, "_id">;

export type Order = {
  id: string;
  type: string;
  location: string;
  selling_price: number;
  original_price: number;
  paid: boolean;
  buildingId: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderWithoutId = Omit<Order, "id">;

// ----- Users -----
export type Role = "admin" | "employee";

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type UserRequest = Omit<UserResponse, "_id" | "createdAt">;

export type UserRequestLogin = Omit<
  UserResponse,
  "_id" | "username" | "createdAt"
>;

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type UserWithoutId = Omit<User, "id">;

export type Token = {
  token: string;
};
