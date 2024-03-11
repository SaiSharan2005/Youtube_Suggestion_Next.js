import React from 'react';
import TopicInterface from '@/interface/TopicInterface';

interface YoutubeVideoPlayerProps {
  topicData: TopicInterface;
}

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({ topicData }) => {
  if (!topicData || !topicData.tutorial_Video) {
    // Handle the case when topicData or topicData.tutorial_Video is null
    return null;  // or display an error message, or provide a default behavior
  }

  const videoIdMatch = topicData.tutorial_Video.match(/youtu\.be\/(.+)(\?|$)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    // Handle the case when videoId is null
    return null;  // or display an error message, or provide a default behavior
  }

  return (
    <div className="video-responsive w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubeVideoPlayer;
