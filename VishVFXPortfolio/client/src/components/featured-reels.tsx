import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/video-player";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { VideoData } from "@/lib/types";
import { Eye, Heart } from "lucide-react";

const featuredReelsData: VideoData[] = [
  {
    id: "1",
    title: "Cinematic Brand Story",
    description: "A captivating narrative that elevated the brand's visual identity",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-cold-and-distant-gaze-39892-large.mp4",
    views: 12400,
    likes: 843
  },
  {
    id: "2",
    title: "Viral Social Media Reel",
    description: "Fast-paced edit that gained 2M+ views in 48 hours",
    thumbnail: "https://images.unsplash.com/photo-1618329075618-0d39037c4a60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-palm-trees-4047-large.mp4",
    views: 2100000,
    likes: 156000
  },
  {
    id: "3",
    title: "Premium Product Showcase",
    description: "Sleek, dynamic product reveal with motion graphics",
    thumbnail: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4",
    views: 653000,
    likes: 42000
  }
];

export function FeaturedReels() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#featured-reels");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  function formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  return (
    <section id="featured-reels" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5)}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Featured Reels
        </motion.h2>
        
        <motion.div 
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredReelsData.map((reel, index) => (
            <motion.div 
              key={reel.id}
              variants={fadeIn("up", 0.5, index * 0.1)}
              className="rounded-xl overflow-hidden bg-background/50 backdrop-blur-md border border-white/5 shadow-xl"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <VideoPlayer 
                  url={reel.videoUrl} 
                  thumbnail={reel.thumbnail} 
                  title={reel.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{reel.title}</h3>
                <p className="text-sm text-white/75 mb-4">{reel.description}</p>
                <div className="flex items-center text-sm text-white/70">
                  <span className="flex items-center mr-4">
                    <Eye className="mr-2 h-4 w-4" /> {formatNumber(reel.views || 0)}
                  </span>
                  <span className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" /> {formatNumber(reel.likes || 0)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
