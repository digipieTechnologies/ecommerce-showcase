"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isSaved = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col bg-transparent overflow-hidden transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-sm text-foreground hover:text-primary transition-colors z-10"
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      
      <div className="pt-5 pb-2 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
          {product.category}
        </div>
        <h3 className="text-[17px] font-medium text-foreground mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-[14px] text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed font-light">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-foreground">₹{product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-transparent text-foreground border border-border rounded-full hover:border-foreground hover:bg-foreground hover:text-background transition-all text-sm font-medium"
            aria-label="Add to cart"
          >
            Add to cart <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
