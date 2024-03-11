import React from 'react';

interface DurationDisplayProps {
  duration: string;
}

const DurationDisplay: React.FC<DurationDisplayProps> = ({ duration }) => {
  const convertDuration = (duration: string): string => {
    const match = duration.match(/P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);

    const days = match?.[1] ? parseInt(match[1], 10) : 0;
    const hours = match?.[2] ? parseInt(match[2], 10) : 0;
    const minutes = match?.[3] ? parseInt(match[3], 10) : 0;
    const seconds = match?.[4] ? parseInt(match[4], 10) : 0;

    return `${days > 0 ? days + 'd' : ''}${hours > 0 ? hours + 'h' : ''}${minutes > 0 ? minutes + 'm' : ''}${seconds > 0 ? seconds + 's' : ''}`;
  };

  return (
          <p className='text-xs'>{convertDuration(duration)}</p>

  );
};

export default DurationDisplay;
