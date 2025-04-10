import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

// Helper function to convert YouTube Shorts URLs to standard YouTube URLs
const formatYouTubeUrl = (url: string): string => {
  // Check if it's a YouTube Shorts URL
  if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('/shorts/')[1].split('?')[0];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return url;
};

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export function VideoPlayer({
  url,
  thumbnail,
  title,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReady = () => {
    setIsReady(true);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-black aspect-video group",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Skeleton className="w-full h-full bg-dark-300 absolute" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
          <img 
            src={thumbnail} 
            alt={title || "Video thumbnail"} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="z-10"
          >
            <Button 
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-white" />
            </Button>
          </motion.div>
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={formatYouTubeUrl(url)}
        playing={isPlaying}
        loop={loop}
        muted={isMuted}
        width="100%"
        height="100%"
        onReady={handleReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              fs: 1,
              playsinline: 1,
              enablejsapi: 1,
            },
          },
        }}
      />

      {controls && (isHovering || !isReady) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-2 z-20"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMute}
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          
          {title && <span className="text-sm text-white/90 ml-2">{title}</span>}
          
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
