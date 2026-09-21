import { Link } from "react-router-dom";
import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import CustomerFiltersPanel from "@/components/customer/products/customer-filters-panel";
import CustomerProductCard from "@/components/customer/products/customer-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ProductSort } from "@/features/customer/products/types";
import { useCustomerProductList } from "@/features/customer/products/use-customer-collections";

export function Collections() {
  const {
    sort,
    changeSort,
    loading,
    products,
    hasActiveFilters,
    categories,
    availableColors,
    filters,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  } = useCustomerProductList();

  const activeCategory = categories.find((c) => c._id === filters.category);
  const collectionTitle = activeCategory
    ? `${activeCategory.name} Collection`
    : filters.brand
    ? `${filters.brand} Collection`
    : "All Smartphones & Electronics";

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header Banner */}
      <section className="border-b border-border/80 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-primary transition">
              Collections
            </Link>
            {activeCategory ? (
              <>
                <span>/</span>
                <span className="text-foreground font-semibold">{activeCategory.name}</span>
              </>
            ) : null}
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Verified Catalogue</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {collectionTitle}
              </h1>
              <p className="text-sm text-muted-foreground">
                Showing {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Sort By:
              </span>
              <Select
                value={sort}
                onValueChange={(value) => changeSort(value as ProductSort)}
              >
                <SelectTrigger className="w-[180px] bg-card border-border rounded-lg h-10 font-semibold text-xs">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="recent">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Active Filter Badges & Mobile Trigger */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {activeFilterBadges.map((item) => (
              <Badge
                key={item.key + item.value}
                variant="secondary"
                className="gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold bg-white border border-border"
              >
                <span>
                  {item.label}: <strong className="text-primary">{item.value}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => toggleFacet(item.key as any, item.value)}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs font-bold text-primary hover:bg-primary/10 h-7"
              >
                Reset All Filters
              </Button>
            ) : null}
          </div>

          {/* Mobile Filter Drawer Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-lg h-9 text-xs font-bold">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                  Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px] p-6 bg-card">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-lg font-black">Filter Catalogue</SheetTitle>
                </SheetHeader>
                <CustomerFiltersPanel
                  categories={categories}
                  filters={filters}
                  availableColors={availableColors}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                  onToggleFacet={toggleFacet}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* 2-Column Desktop Grid (Sidebar + Product Cards) */}
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block">
            <Card className="sticky top-28 border-border bg-card p-5 rounded-2xl shadow-sm">
              <CustomerFiltersPanel
                categories={categories}
                filters={filters}
                availableColors={availableColors}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onToggleFacet={toggleFacet}
              />
            </Card>
          </aside>

          {/* Product Grid Area */}
          <section>
            {/* Loading Skeletons */}
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-border p-4 bg-card">
                    <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-9 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : null}

            {/* Empty State */}
            {!loading && !products.length ? (
              <Card className="rounded-2xl border-border bg-card shadow-sm p-12 text-center">
                <CardContent className="space-y-4 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <SlidersHorizontal className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-foreground">No Products Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    We couldn't find any products matching your current filters or search terms.
                  </p>
                  {hasActiveFilters ? (
                    <Button onClick={clearFilters} className="bg-primary text-white font-bold h-10 px-6 rounded-lg">
                      Clear Filters & View All
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            {/* Product Cards */}
            {!loading && products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 sm:gap-6">
                {products.map((product) => (
                  <CustomerProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Collections;
