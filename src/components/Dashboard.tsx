import { useState, useEffect } from 'react';
import { Video } from '../types';
import VideoGrid from './VideoGrid';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      const allVideos = JSON.parse(storedVideos);
      // If user is logged in, show only their videos
      const filteredVideos = user 
        ? allVideos.filter((v: Video) => v.userId === user.id)
        : allVideos;
      setVideos(filteredVideos);
    }
  }, [user]);

  const classes = ['all', ...new Set(videos.map(video => video.class))];
  const subjects = ['all', ...new Set(videos.map(video => video.subject))];

  const filteredVideos = videos.filter(video => {
    const matchesClass = selectedClass === 'all' || video.class === selectedClass;
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
    return matchesClass && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {classes.map(c => (
            <option key={c} value={c}>
              {c === 'all' ? 'All Classes' : `Class ${c}`}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {subjects.map(s => (
            <option key={s} value={s}>
              {s === 'all' ? 'All Subjects' : s}
            </option>
          ))}
        </select>
      </div>
      {!user && (
        <div className="bg-gray-800 p-4 rounded-md text-center">
          Please login to add and manage your own videos
        </div>
      )}
      <VideoGrid videos={filteredVideos} />
    </div>
  );
};

export default Dashboard;