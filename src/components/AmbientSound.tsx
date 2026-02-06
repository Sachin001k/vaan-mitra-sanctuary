import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AmbientSoundProps {
  /** URL to the audio file */
  audioUrl?: string;
  /** Whether to auto-play on mount (respects user preference) */
  autoPlay?: boolean;
  /** Loop the audio */
  loop?: boolean;
  /** Default volume (0-1) */
  defaultVolume?: number;
}

const AmbientSound = ({
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_5f4ce1c24d.mp3",
  autoPlay = false,
  loop = true,
  defaultVolume = 0.3,
}: AmbientSoundProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioUrl);
    audio.loop = loop;
    audio.volume = defaultVolume;
    audio.preload = "auto";
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, loop, defaultVolume]);

  const toggleSound = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio playback failed:", error);
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 p-4 bg-jungle-dark/80 backdrop-blur-md border border-jungle-medium/30 hover:border-jungle-canopy transition-all duration-300 group"
      aria-label={isPlaying ? "Mute ambient sounds" : "Play ambient sounds"}
      title={isPlaying ? "Mute jungle sounds" : "Play jungle sounds"}
    >
      {isPlaying ? (
        <Volume2 
          size={24} 
          className="text-jungle-canopy animate-pulse" 
        />
      ) : (
        <VolumeX 
          size={24} 
          className="text-ivory/60 group-hover:text-ivory transition-colors" 
        />
      )}
      
      {/* Sound wave animation when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 border-2 border-jungle-canopy/40"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Tooltip hint for first-time visitors */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-jungle-dark/90 backdrop-blur-sm px-3 py-2 text-xs text-ivory/80 border border-jungle-medium/30"
        >
          🎧 Enable jungle sounds
        </motion.div>
      )}
    </motion.button>
  );
};

export default AmbientSound;
