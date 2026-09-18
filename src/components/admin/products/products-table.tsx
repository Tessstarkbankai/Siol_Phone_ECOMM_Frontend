import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/features/admin/products/types";
import { getCoverImage } from "@/features/admin/products/use-product-form";
import { Pencil } from "lucide-react";

const wrapperClass = "overflow-x-auto rounded-xl border border-border";

const tableHeaderClass = "bg-muted/50";

const imageHeadClass = "w-[90px]";

const editHeadClass = "w-[80px] text-right";

const stateCellClass = "h-28 text-center text-muted-foreground";

const imageBoxClass =
  "h-14 w-14 overflow-hidden rounded-lg border border-border bg-muted";

const imageClass = "h-full w-full object-cover";

const titleWrapClass = "space-y-1";

const titleClass = "font-medium text-foreground";

const descriptionClass = "line-clamp-1 text-xs text-muted-foreground";

const editCellWrapClass = "flex justify-end";

const editIconClass = "h-4 w-4";

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  loading: boolean;
};

export function ProductsTable({
  products,
  onEdit,
  loading,
}: ProductsTableProps) {
  return (
    <div className={wrapperClass}>
      <Table>
        <TableHeader className={tableHeaderClass}>
          <TableRow>
            <TableHead className={imageHeadClass}>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className={editHeadClass}>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className={stateCellClass}>
                Loading Products...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className={stateCellClass}>
                No products found!!!
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const cover = getCoverImage(product.images);
              return (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className={imageBoxClass}>
                      {cover ? (
                        <img
                          src={cover.url}
                          alt={product.title}
                          className={imageClass}
                        />
                      ) : null}
                    </div>
                  </TableCell>

                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 items-start">
                      <Badge
                        variant={
                          product.status === "active" ? "default" : "secondary"
                        }
                      >
                        {product.status}
                      </Badge>
                      {product.spotlightCategory === "feature_phone" ? (
                        <span className="rounded-md bg-amber-600 text-white text-[10px] font-black px-1.5 py-0.5 shadow-xs">
                          ★ Feature Phone
                        </span>
                      ) : product.isSpotlight || product.spotlightCategory === "smartphone" ? (
                        <span className="rounded-md bg-primary text-white text-[10px] font-black px-1.5 py-0.5 shadow-xs">
                          ★ Smartphone
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className={editCellWrapClass}>
                      <Button
                        size={"icon"}
                        variant="ghost"
                        onClick={() => onEdit(product)}
                      >
                        <Pencil className={editIconClass} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
