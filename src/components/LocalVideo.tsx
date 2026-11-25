import type { Video } from "@/data/media";

// Self-hosted clip from public/media. Never autoplays; loads only metadata until played.
const LocalVideo = ({ video, className = "" }: { video: Video; className?: string }) => (
  <figure className={`bg-jungle-dark ${className}`}>
    <video
      src={video.src}
      poster={video.poster}
      controls
      playsInline
      preload="metadata"
      aria-label={video.title}
      className="w-full max-h-[70vh] bg-black object-contain"
    />
    {video.caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground">{video.caption}</figcaption>}
  </figure>
);

export default LocalVideo;
