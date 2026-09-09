"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { X, Copy, Link as LinkIcon, MessageCircle, Smartphone, MoreHorizontal, Share2 } from "lucide-react";

interface ShareModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function ShareModal({ product, isOpen, onClose }: ShareModalProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareMessage = `Check out this ${product.name}!\n\n${product.description}\n\nPrice: ₹${product.price.toFixed(2)}\n\nDetails here: ${url}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error("Failed to copy message", err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name}!`,
          url: url,
        });
      } catch (err) {
        console.error("Failed to share natively", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: ({ className }: { className?: string }) => <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover rounded-full" />,
      color: "bg-transparent",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank"),
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      color: "bg-pink-500",
      action: handleNativeShare,
    },
    {
      name: "SMS",
      icon: Smartphone,
      color: "bg-blue-500",
      action: () => window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, "_self"),
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      color: "bg-blue-600",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "More",
      icon: MoreHorizontal,
      color: "bg-gray-500",
      action: handleNativeShare,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      
      <div className="relative bg-card w-full max-w-md rounded-t-3xl sm:rounded-xl shadow-2xl overflow-hidden border-x border-t sm:border border-border flex flex-col animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 sm:duration-200 mt-auto sm:mt-0">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden bg-card">
          <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 sm:p-5 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            <Share2 className="w-5 h-5 text-primary" />
            Share Product
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Preview */}
        <div className="px-6 py-4 flex items-center gap-4">
          <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg border border-border/50" />
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground font-medium">₹{product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Share Actions */}
        <div className="px-5 sm:px-6 pt-5 pb-6 flex-1 overflow-y-auto">

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleCopyMessage}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Copy className="w-4 h-4" />
              {copiedMessage ? "Copied!" : "Copy Message"}
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border text-foreground rounded-lg font-medium text-sm hover:bg-muted transition-colors shadow-sm"
            >
              <LinkIcon className="w-4 h-4" />
              {copiedLink ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Social Icons */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-foreground mb-4">Share via</h4>
            <div className="flex justify-between items-start">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="flex flex-col items-center gap-2 group w-14"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${option.color} transition-transform group-hover:-translate-y-1 shadow-sm`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
}
