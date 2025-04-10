import { motion } from "framer-motion";
import { PlayCircle, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn, slideIn } from "@/lib/animations";
import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

export function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRefs = useRef<Array<YouTube | null>>([null, null, null]);
  
  // Define the video source type
  type VideoSource = 
    | { type: "youtube" | "youtube-short"; id: string } 
    | { type: "drive"; url: string };
    
  // Your video sources
  const backgroundVideos: VideoSource[] = [
    { type: "youtube-short", id: "ot_v0LLN9ng" },
    { type: "youtube-short", id: "5yl7TZDwT3Q" },
    { type: "youtube", id: "0s9pCisAxh0" }
  ];
  
  // Extract video ID from Google Drive link
  const getDriveVideoId = (url: string) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };
  
  // Get direct Drive URL from file ID
  const getDriveEmbedUrl = (url: string) => {
    const fileId = getDriveVideoId(url);
    if (!fileId) return "about:blank";
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };
  
  // Rotate videos every 12 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === backgroundVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000);
    
    return () => clearInterval(intervalId);
  }, []);

  const scrollToFeatured = () => {
    const featuredElement = document.querySelector("#featured-reels");
    if (featuredElement) {
      window.scrollTo({
        top: featuredElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    const contactElement = document.querySelector("#contact");
    if (contactElement) {
      window.scrollTo({
        top: contactElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="featured"
      className="relative min-h-screen pt-20 flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent right-0 bottom-0"></div>
          {backgroundVideos.map((video, index) => {
            const isActive = index === currentVideoIndex;
            
            if (video.type === "youtube" || video.type === "youtube-short") {
              return (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <YouTube
                    videoId={video.id}
                    ref={(el: YouTube | null) => (playerRefs.current[index] = el)}
                    onReady={(event: { target: any }) => {
                      event.target.mute();
                      if (isActive) event.target.playVideo();
                    }}
                    onStateChange={(event: { data: number; target: any }) => {
                      // Restart video when it ends
                      if (event.data === 0) {
                        event.target.playVideo();
                      }
                    }}
                    opts={{
                      playerVars: {
                        autoplay: 1,
                        mute: 1,
                        controls: 0,
                        showinfo: 0,
                        rel: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                        loop: 1,
                        playlist: video.id
                      },
                      width: "100%",
                      height: "100%"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%]"
                  />
                </div>
              );
            } else if (video.type === "drive") {
              return (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <iframe
                    src={`${getDriveEmbedUrl(video.url)}?autoplay=1&mute=1`}
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    allowFullScreen
                    frameBorder="0"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
                  />
                </div>
              );
            }
            
            return null;
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("up", 0.5)}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Vish VFX
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-white/90">
            Crafting stories through cuts & color
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={scrollToFeatured}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-full hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300"
              size="lg"
            >
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Featured
            </Button>
            <Button
              onClick={scrollToContact}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full transition-all duration-300"
              size="lg"
              variant="outline"
            >
              <Mail className="mr-2 h-5 w-5" /> Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("up", 0.5, 1)}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-sm mb-2 text-white/70">Scroll to explore</p>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-2xl text-white"
        >
          <ChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
}
