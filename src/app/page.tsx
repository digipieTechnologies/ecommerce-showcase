import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col bg-background">
      {/* Ultra-Clean Hero Section */}
      <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-6">
            Curated • Creative • Original
          </p>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
            Artful pieces made for everyday life.
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mb-12 leading-relaxed">
            Discover thoughtfully curated artwork, objects, and creative gifts designed to bring more character to everyday spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Collection
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 bg-transparent text-foreground border border-border font-medium rounded-full hover:border-foreground transition-all duration-300 w-full sm:w-auto"
            >
              View New Arrivals
            </Link>
          </div>
        </div>
        
        {/* Panoramic Featured Image */}
        <div className="max-w-[1280px] mx-auto mt-20 relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-3xl shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80" 
            alt="Featured Artwork" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
          />
        </div>
      </section>

      {/* Clean Categories */}
      <section className="py-20 sm:py-32 bg-muted/50 border-y border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-4">Explore by Category</h2>
          <p className="text-muted-foreground mb-12 font-light">Find exactly what you're looking for.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.slice(1).map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="px-8 py-4 rounded-full border border-border text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium bg-background shadow-sm text-sm tracking-wide uppercase"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-foreground mb-4">Featured Collection</h2>
              <p className="text-muted-foreground font-light">Our most sought-after pieces.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors text-sm uppercase tracking-wider pb-1 border-b border-foreground hover:border-primary">
              View Entire Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  );
}
