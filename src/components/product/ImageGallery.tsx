"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // If no images are provided or array is empty, fallback gracefully
  if (!images || images.length === 0) return null;

  const activeImage = images[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      
      {/* Thumbnails (Left on Desktop, Bottom on Mobile) */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] pb-2 md:pb-0 scrollbar-hide order-2 md:order-1 md:w-20 lg:w-24 flex-shrink-0 custom-scrollbar">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 md:w-20 md:h-24 lg:w-24 lg:h-32 rounded-xl overflow-hidden border transition-all flex-shrink-0 ${
                activeIndex === idx 
                  ? 'border-primary ring-1 ring-primary shadow-sm opacity-100' 
                  : 'border-border/50 opacity-60 hover:opacity-100 hover:border-foreground/30'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image with Zoom (Right on Desktop, Top on Mobile) */}
      <div 
        className="relative flex-1 aspect-square md:aspect-auto md:min-h-[500px] rounded-2xl overflow-hidden bg-muted/30 border border-border/50 cursor-crosshair group order-1 md:order-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          className={`object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Zoomed Background */}
        <div 
          className={`absolute inset-0 bg-no-repeat transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${activeImage})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: '250%',
          }}
        />
      </div>

    </div>
  );
}
