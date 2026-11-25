type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

// Privacy-enhanced YouTube embed (no cookies until the viewer presses play).
const YouTubeEmbed = ({ videoId, title, className = "" }: YouTubeEmbedProps) => (
  <div className={`relative aspect-video bg-jungle-dark ${className}`}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
      title={title}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      className="absolute inset-0 h-full w-full"
    />
  </div>
);

export default YouTubeEmbed;
