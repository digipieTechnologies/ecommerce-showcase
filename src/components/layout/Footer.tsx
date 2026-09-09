import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="flex flex-col items-start">
            <Link href="/" className="text-2xl font-serif font-medium tracking-tight text-foreground hover:text-primary transition-colors">
              Jay art work
            </Link>
            <p className="text-muted-foreground mt-4 text-sm max-w-xs leading-relaxed">
              Curated creative pieces for everyday life.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-wide text-sm uppercase">Shop</h4>
            <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">Products</Link>
            <Link href="/saved" className="text-muted-foreground hover:text-primary transition-colors text-sm">Wishlist</Link>
            <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cart</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-wide text-sm uppercase">Categories</h4>
            <Link href="/products?category=T-Shirts" className="text-muted-foreground hover:text-primary transition-colors text-sm">T-Shirts</Link>
            <Link href="/products?category=Mugs" className="text-muted-foreground hover:text-primary transition-colors text-sm">Mugs</Link>
            <Link href="/products?category=Accessories" className="text-muted-foreground hover:text-primary transition-colors text-sm">Accessories</Link>
            <Link href="/products?category=Gifts" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gifts</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-wide text-sm uppercase">Follow</h4>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pinterest</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jay art work. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary mx-1" /> for creatives.
          </div>
        </div>
      </div>
    </footer>
  );
}
