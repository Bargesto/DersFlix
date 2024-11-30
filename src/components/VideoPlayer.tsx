import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Video } from '../types';
import { ArrowLeft } from 'lucide-react';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const foundVideo = videos.find((v: Video) => v.id === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [videoId]);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="flex items-center gap-2 mb-4 text-gray-400 hover:text-white">
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>
      <div className="aspect-video mb-4">
        <YouTube
          videoId={video.youtubeUrl}
          className="w-full h-full"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </div>
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-400">
        Class {video.class} - {video.subject}
      </p>
    </div>
  );
};

export default VideoPlayer;