
export type OrderStatus = "Processing" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: number;
};
