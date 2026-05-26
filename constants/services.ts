export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: "videography",
    title: "Videography",
    shortDescription: "Cinematic promotional videos, reels, property shoots, and brand films designed to make your business look premium.",
    longDescription: "We create professional videos that help businesses communicate their story, showcase their space, and attract the right audience. From cinematic editing to high-impact transitions, we cover the full production workflow.",
    icon: "Video",
    deliverables: [
      "Promotional videos",
      "Instagram reels & short-form videos",
      "Property walkthroughs & real estate videos",
      "Brand story & founder videos",
      "Course & institute videos",
      "Event coverage & highlights",
      "Short-form ad creatives"
    ]
  },
  {
    id: "photography",
    title: "Photography",
    shortDescription: "Professional photos for properties, businesses, products, and social media campaigns.",
    longDescription: "We capture clean, professional visuals that make your brand look polished, premium, and trustworthy. Whether it's your workspace, team, or products, we frame them in their best light.",
    icon: "Camera",
    deliverables: [
      "Property & architectural photos",
      "Business & workplace profiles",
      "Team & headshot photography",
      "Product & detail photography",
      "Lifestyle & brand visuals",
      "Social media content photography"
    ]
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    shortDescription: "We plan, create, post, and manage your online presence so your brand stays active and consistent.",
    longDescription: "Helping businesses stay active and consistent online. We handle everything from calendar planning to publishing, ensuring your brand identity remains aligned, engaging, and premium on social networks.",
    icon: "Instagram",
    deliverables: [
      "Monthly content planning & calendar",
      "Reels scheduling & posting",
      "Engaging caption writing & hashtag strategy",
      "Profile/page optimization",
      "Basic graphic posts & carousels",
      "Audience engagement support",
      "Monthly performance reporting"
    ]
  },
  {
    id: "meta-ads-marketing",
    title: "Meta Ads Marketing",
    shortDescription: "Targeted Facebook and Instagram campaigns to help you reach buyers, students, customers, and leads.",
    longDescription: "We run targeted marketing campaigns to generate high-quality leads, visibility, and conversions. Using data-driven positioning, we help you reach direct buyers, students, or local customers.",
    icon: "Megaphone",
    deliverables: [
      "Facebook & Instagram Ads setup",
      "Hyper-targeted audience setup",
      "Lead generation campaigns",
      "A/B creative & copy testing",
      "High-converting ad copywriting",
      "Continuous campaign monitoring",
      "Performance & ROI reporting"
    ]
  }
];
