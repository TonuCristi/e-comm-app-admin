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
type Role = "admin" | "employee" | "customer";

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type UserRequest = Omid<UserResponse, "_id">;

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type UserWithoutId = Omid<User, "id">;
