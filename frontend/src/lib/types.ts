export type Building = {
  _id: string;
  type: string;
  location: string;
  address: string;
  selling_price: number | string;
  discount_value: number | string;
  nr_balconies: number | string;
  nr_bathrooms: number | string;
  nr_floors: number | string;
  nr_garages: number | string;
  nr_rooms: number | string;
  original_price: number | string;
  square_meters: number | string;
  description: string;
};

export type BuildingWithoutId = Omit<Building, "_id">;
