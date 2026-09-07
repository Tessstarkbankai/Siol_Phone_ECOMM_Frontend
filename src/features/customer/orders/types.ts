export type CustomerOrderStatus =
  | "placed"
  | "shipped"
  | "delivered"
  | "returned";
export type CustomerPaymentStatus = "pending" | "paid" | "failed";

export type CustomerOrderItem = {
  product: {
    _id: string;
    title: string;
    images?: Array<{ url: string; publicId: string; isCover?: boolean }>;
    price?: number;
  } | string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

export type CustomerOrder = {
  _id: string;
  code: string;
  totalItems: number;
  totalAmount: number;
  paymentStatus: CustomerPaymentStatus;
  orderStatus: CustomerOrderStatus;
  paidAt?: string | null;
  deliveredAt?: string | null;
  returnedAt?: string | null;
  createdAt: string;
  items?: CustomerOrderItem[];
};

export type CustomerOrdersResponse = {
  items: CustomerOrder[];
};

export type CustomerReturnOrderResponse = {
  _id: string;
  orderStatus: CustomerOrderStatus;
  returnedAt?: string | null;
};
