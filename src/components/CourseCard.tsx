"use client"
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export interface ICoruseCardProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

const CoruseCard: React.FC<ICoruseCardProps> = ({ id, name, description, thumbnail }) => {
  return (
    <div>
      <Link href={`/course/${id}`}>
        <div className='w-full m-4 p-3 mx-auto border-solid dark:border-gray-900 border-2 rounded-lg flex flex-col-reverse sm:flex-row justify-between dark:bg-gray-900'>
          <div className="CourseDetail m-2 w-full md:w-[60%] h-30">
            <h3 className='font-bold sm:text-2xl'>{name}</h3>
            <p className="CourseDescription text-xs md:text-base lg:text-lg text-purple-500 font-medium">
              {description}
            </p>
          </div>
          <div className="CourseImage w-[80%] sm:w-[30%] mx-auto md:mt-0">
            <Image className="rounded-lg object-contain w-full h-full md:min-w-full " src={thumbnail} alt={name}
            width={600} height={400}
            
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoruseCard;
