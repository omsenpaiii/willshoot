export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  previewVideoUrl: string;
  duration: string;
  gear: string;
  results: string;
  specifications: string[];
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
    imageUrl: "/images/portfolio-property.jpg",
    videoUrl: "/hero.mp4",
    previewVideoUrl: "/hero-bg.mp4",
    duration: "0:45",
    gear: "Sony FX3 + DJI Mavic 3 Pro",
    results: "Sold in 12 days, 150k+ views",
    specifications: [
      "4K UHD Cinematic Video",
      "Professional HDR Color Grading",
      "Interior & Exterior Drone Showcase"
    ]
  },
  {
    id: "apex-academy",
    title: "Apex Institute Campaign",
    category: "promo",
    categoryLabel: "Institute Promo",
    description: "Promotional brand video showcasing student life, facilities, and course highlights.",
    imageUrl: "/images/portfolio-institute.jpg",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    previewVideoUrl: "/hero-bg.mp4",
    duration: "0:52",
    gear: "RED Komodo + Ronin RS3",
    results: "+34% Enrollment increase",
    specifications: [
      "1080p Brand Campaign Film",
      "High Fidelity Sound Design",
      "Student Life Storyboarding & Scripting"
    ]
  },
  {
    id: "modern-grind",
    title: "Modern Grind Coffee Reel",
    category: "reel",
    categoryLabel: "Business Reel",
    description: "High-energy short-form video capturing the craft of specialty coffee for social engagement.",
    imageUrl: "/images/portfolio-reel.jpg",
    videoUrl: "/hero-bg.mp4",
    previewVideoUrl: "/hero-bg.mp4",
    duration: "0:15",
    gear: "Sony A7SIII + 24-70mm GM II",
    results: "2.1M views, +45% foot traffic",
    specifications: [
      "4K 9:16 Vertical Reel",
      "High Energy Sound Syncing",
      "Cafe Atmosphere Lighting & Grading"
    ]
  },
  {
    id: "aura-skincare",
    title: "Aura Cosmetics Launch",
    category: "product",
    categoryLabel: "Product Shoot",
    description: "Minimalist studio photography highlighting bottle design and texture for an organic brand.",
    imageUrl: "/images/portfolio-product.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    previewVideoUrl: "/hero-bg.mp4",
    duration: "0:12",
    gear: "Sony FX3 + 90mm Macro Lens",
    results: "Website conversion +18%",
    specifications: [
      "4K Studio Macro Videography",
      "Product Texture Visuals",
      "Premium Ambient Softbox Lighting"
    ]
  },
  {
    id: "fitlife-studio",
    title: "FitLife Meta Campaign",
    category: "ads",
    categoryLabel: "Meta Ads Creative",
    description: "High-converting video and graphic ad assets for target demographic lead acquisition.",
    imageUrl: "/images/portfolio-ads.jpg",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    previewVideoUrl: "/hero-bg.mp4",
    duration: "0:30",
    gear: "BMPCC 6K + DJI Ronin Gimbal",
    results: "4.2x ROAS, 800+ leads generated",
    specifications: [
      "4K UHD 1:1 Square Ad Asset",
      "High-Converting Caption Overlays",
      "Dynamic Call-To-Action Visuals"
    ]
  }
];
