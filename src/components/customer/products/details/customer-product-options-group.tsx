import { getSwatchColor } from "@/features/customer/products/product-list.shared";
import type { ProductSize } from "@/features/customer/products/types";

const wrapClass = "flex flex-wrap gap-2.5";

const baseButtonClass =
  "inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-xs font-bold transition-all rounded-xl shadow-2xs";

const activeButtonClass =
  "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 font-semibold";

const inactiveButtonClass =
  "border-border/80 bg-card text-foreground hover:border-primary/50 hover:bg-neutral-50";

const sizeButtonClass = "min-w-16 h-10";

const colorButtonClass = "h-10 px-3.5";

const swatchClass = "h-4 w-4 rounded-full border border-black/20 shadow-xs";

type CustomerProductOptionsGroupProps = {
  values: string[];
  selectedValue: string;
  onSelect: (value: ProductSize) => void;
  variant: "color" | "size";
};

function CustomerProductOptionsGroup({
  values,
  variant,
  selectedValue,
  onSelect,
}: CustomerProductOptionsGroupProps) {
  return (
    <div role="group" className={wrapClass}>
      {values.map((value) => {
        const isActive = selectedValue === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value as ProductSize)}
            className={`${baseButtonClass} ${
              variant === "color" ? colorButtonClass : sizeButtonClass
            } ${isActive ? activeButtonClass : inactiveButtonClass}`}
          >
            {variant === "color" ? (
              <>
                <span
                  className={swatchClass}
                  style={{ backgroundColor: getSwatchColor(value) }}
                />
              </>
            ) : (
              value
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CustomerProductOptionsGroup;
