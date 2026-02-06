import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoSource {
  /** YouTube video ID */
  youtubeId: string;
  /** Fallback image URL */
  fallbackImage?: string;
  /** Label for this video */
  label?: string;
}

interface VideoHeroProps {
  /** Array of video sources to cycle through */
  videos: VideoSource[];
  /** Interval to switch videos (ms) */
  switchInterval?: number;
  /** Children to render over the video */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Show video controls */
  showControls?: boolean;
}

const VideoHero = ({
  videos,
  switchInterval = 30000,
  children,
  className = "",
  showControls = true,
}: VideoHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentVideo = videos[currentIndex];

  // Auto-switch videos
  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, switchInterval);

    return () => clearInterval(timer);
  }, [videos.length, switchInterval]);

  // Build YouTube embed URL
  const getYouTubeUrl = (videoId: string) => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: isMuted ? "1" : "0",
      controls: "0",
      loop: "1",
      playlist: videoId,
      modestbranding: "1",
      rel: "0",
      showinfo: "0",
      iv_load_policy: "3",
      disablekb: "1",
      fs: "0",
      playsinline: "1",
      enablejsapi: "1",
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo.youtubeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* YouTube iframe */}
            <iframe
              ref={iframeRef}
              src={getYouTubeUrl(currentVideo.youtubeId)}
              title="Background video"
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-150 pointer-events-none"
              style={{ border: "none" }}
              allow="autoplay; encrypted-media"
              onLoad={handleLoad}
            />

            {/* Fallback image while loading */}
            {!isLoaded && currentVideo.fallbackImage && (
              <img
                src={currentVideo.fallbackImage}
                alt="Loading..."
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-jungle-darkest/40 via-transparent to-jungle-darkest/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-darkest/50 via-transparent to-jungle-darkest/30" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Video Controls */}
      {showControls && (
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
          {/* Video indicator dots */}
          {videos.length > 1 && (
            <div className="flex items-center gap-2 mr-4">
              {videos.map((video, index) => (
                <button
                  key={video.youtubeId}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-jungle-canopy w-6"
                      : "bg-ivory/40 hover:bg-ivory/60"
                  }`}
                  aria-label={video.label || `Video ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Current video label */}
          {currentVideo.label && (
            <span className="text-xs text-ivory/60 uppercase tracking-wider">
              {currentVideo.label}
            </span>
          )}
        </div>
      )}

      {/* Mute toggle (for video audio, separate from ambient) */}
      {showControls && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 right-24 z-20 p-3 bg-jungle-dark/60 backdrop-blur-sm border border-jungle-medium/30 hover:border-jungle-canopy transition-all duration-300 group"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX size={18} className="text-ivory/60 group-hover:text-ivory" />
          ) : (
            <Volume2 size={18} className="text-jungle-canopy" />
          )}
        </button>
      )}
    </div>
  );
};

export default VideoHero;
