import { Link } from 'react-router-dom';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/watch/${video.id}`}
          className="bg-gray-800 rounded-md overflow-hidden hover:scale-105 transition"
        >
          <img
            src={`https://img.youtube.com/vi/${video.youtubeUrl}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-gray-400 text-sm">
              Class {video.class} - {video.subject}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;