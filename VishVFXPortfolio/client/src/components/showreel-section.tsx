import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/video-player";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { VideoData } from "@/lib/types";

const showreelVideos: VideoData[] = [
  {
    id: "1",
    title: "Premium Typographic Reels",
    description: "Eye-catching text animations and transitions",
    thumbnail: "https://img.youtube.com/vi/ot_v0LLN9ng/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/ot_v0LLN9ng"
  },
  {
    id: "2",
    title: "Infographic Premium Edit",
    description: "Data visualization with dynamic animations",
    thumbnail: "https://img.youtube.com/vi/5ZjwvNHJL7Q/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/5ZjwvNHJL7Q"
  },
  {
    id: "3",
    title: "Advanced Motion Graphics",
    description: "Complex animations and visual effects",
    thumbnail: "https://img.youtube.com/vi/4dLFEJF_TMo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/4dLFEJF_TMo"
  },
  {
    id: "4",
    title: "Premium Shorts",
    description: "Highly engaging social media optimized edits",
    thumbnail: "https://img.youtube.com/vi/pHz4CjhLOcI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/pHz4CjhLOcI"
  },
  {
    id: "5",
    title: "Premium Ads with Motion Graphics",
    description: "Commercial-quality ads with professional animations",
    thumbnail: "https://img.youtube.com/vi/5yl7TZDwT3Q/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/5yl7TZDwT3Q"
  },
  {
    id: "6",
    title: "Dhruv Rathee Edits",
    description: "Professional edits for popular content creator",
    thumbnail: "https://img.youtube.com/vi/HDhfBU-D1lQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/shorts/HDhfBU-D1lQ"
  }
];

export function ShowreelSection() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to open video in a new window on click
  const openVideoInNewWindow = (url: string, title: string) => {
    const width = 800;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url, 
      title,
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );
  };

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

  return (
    <section id="featured-reels" className="py-20 bg-[#171721]">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5)}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
            My Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Reels
          </h2>
          <p className="max-w-2xl mx-auto text-white/80">
            A collection of my best work across different styles and clients. Each project tells a unique story.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {showreelVideos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={fadeIn("up", 0.5, index * 0.1)}
              className="rounded-xl overflow-hidden bg-background/20 backdrop-blur-md border border-white/5 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(138,43,226,0.15)]"
            >
              <div className="aspect-video relative overflow-hidden cursor-pointer" 
                   onClick={() => openVideoInNewWindow(video.videoUrl, video.title)}>
                <VideoPlayer
                  url={video.videoUrl}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  controls={false}
                />
                <div className="absolute top-3 right-3 z-10 bg-black/70 text-white p-1 rounded-md text-xs">
                  Click to play
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-white/70">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
