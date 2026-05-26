export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  imageUrl: string;
}

export const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "property", label: "Property Shoots" },
  { id: "promo", label: "Institute Promos" },
  { id: "reel", label: "Business Reels" },
  { id: "product", label: "Product Shoots" },
  { id: "ads", label: "Meta Ads" }
];

export const PROJECTS: Project[] = [
  {
    id: "grandview-residence",
    title: "The Grandview Residence",
    category: "property",
    categoryLabel: "Property Shoot",
    description: "Cinematic real estate walkthrough and high-end photography for a luxury property listing.",
    imageUrl: "/images/portfolio-property.jpg"
  },
  {
    id: "apex-academy",
    title: "Apex Institute Campaign",
    category: "promo",
    categoryLabel: "Institute Promo",
    description: "Promotional brand video showcasing student life, facilities, and course highlights.",
    imageUrl: "/images/portfolio-institute.jpg"
  },
  {
    id: "modern-grind",
    title: "Modern Grind Coffee Reel",
    category: "reel",
    categoryLabel: "Business Reel",
    description: "High-energy short-form video capturing the craft of specialty coffee for social engagement.",
    imageUrl: "/images/portfolio-reel.jpg"
  },
  {
    id: "aura-skincare",
    title: "Aura Cosmetics Launch",
    category: "product",
    categoryLabel: "Product Shoot",
    description: "Minimalist studio photography highlighting bottle design and texture for an organic brand.",
    imageUrl: "/images/portfolio-product.jpg"
  },
  {
    id: "fitlife-studio",
    title: "FitLife Meta Campaign",
    category: "ads",
    categoryLabel: "Meta Ads Creative",
    description: "High-converting video and graphic ad assets for target demographic lead acquisition.",
    imageUrl: "/images/portfolio-ads.jpg"
  }
];
