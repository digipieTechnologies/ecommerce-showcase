import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#fafafa] py-20 sm:py-32 relative overflow-hidden">
        {/* Soft elegant gradient background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#fff0f0] via-[#fafafa] to-[#fafafa] opacity-60" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Creative Gifts</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground tracking-tight mb-6 leading-[1.1]">
            Curated <span className="text-primary italic font-serif">Jay art work</span> <br className="hidden sm:block" /> for everyone.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Brighten up your day with our modern, minimal, and premium collection of t-shirts, mugs, and creative accessories.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all duration-300 w-full sm:w-auto text-sm tracking-wide"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.slice(1).map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="px-6 py-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors font-medium bg-background"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most popular creative pieces.</p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
