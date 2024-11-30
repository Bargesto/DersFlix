import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from '../types';
import { useAuth } from '../context/AuthContext';

const AddVideo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    class: '',
    subject: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract YouTube video ID from URL
    const youtubeId = formData.youtubeUrl.split('v=')[1]?.split('&')[0];
    if (!youtubeId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const newVideo: Video = {
      id: crypto.randomUUID(),
      title: formData.title,
      youtubeUrl: youtubeId,
      class: formData.class,
      subject: formData.subject,
      userId: user!.id
    };

    const existingVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    localStorage.setItem('videos', JSON.stringify([...existingVideos, newVideo]));
    
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">YouTube URL</label>
          <input
            type="url"
            required
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <div>
          <label className="block mb-1">Class</label>
          <input
            type="text"
            required
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="9, 10, 11, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="Mathematics, Physics, etc."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;