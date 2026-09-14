import { CustomerProductCard } from "../customer-product-card";
import type { CustomerProduct } from "@/features/customer/products/types";

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

export function CustomerProductRelatedCard({
  product,
}: CustomerProductRelatedCardProps) {
  return <CustomerProductCard product={product} />;
}

export default CustomerProductRelatedCard;

