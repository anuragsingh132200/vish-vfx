export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  views?: number;
  likes?: number;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  image: string;
  testimonial: string;
  rating?: number;
}

export interface AchievementData {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface WorkspaceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}
