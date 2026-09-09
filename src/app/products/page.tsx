"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Select } from "@/components/ui/Select";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // featured: keep original order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">All Products</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
          Explore our complete collection of modern and creative gifts.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-8 sm:mb-10 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto items-start md:items-center">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 -mb-2 w-full md:w-auto hide-scrollbar gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full font-medium transition-colors text-sm ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort By Filter */}
          <div className="w-full md:w-auto shrink-0 relative z-20">
            <Select
              value={sortBy}
              onChange={setSortBy}
              className="w-full md:w-56"
              options={[
                { label: "Sort by: Featured", value: "featured" },
                { label: "Price: Low to High", value: "price-asc" },
                { label: "Price: High to Low", value: "price-desc" },
                { label: "Name: A to Z", value: "name-asc" },
                { label: "Name: Z to A", value: "name-desc" },
              ]}
            />
          </div>
        </div>
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
