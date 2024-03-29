"use client"
import React, { useState } from 'react';
import DurationDisplay from '@/utils/DurationDisplay';
import Image from 'next/image';
import Link from "next/link"
export interface INavBarData {
    subCourseName: string;
    subCourseId: number;
    subTopics: {
        id: number;
        main_id: number;
        topic_name: string;
        extra_details: string;
        tutorial_Video: string;
        duration: string;
    }[]
}

export default function SideBar({ sideBarData, courseId }: { sideBarData: INavBarData[], courseId: number }) {


    const [expandedTopics, setExpandedTopics] = useState<number[]>([]);

    const toggleSubTopics = (topicId: number) => {
        setExpandedTopics((prevExpandedTopics) =>
            prevExpandedTopics.includes(topicId)
                ? prevExpandedTopics.filter((id) => id !== topicId)
                : [...prevExpandedTopics, topicId]
        );
    };

    return (
        <div className='w-full'>
            {sideBarData.map((subCourse) => (
                <div key={subCourse.subCourseId}>
                    <div className='flex items-center  w-[90%] m-1 py-2 bg-gray-100  rounded-2xl  dark:bg-neutral-900 dark:hover:bg-gray-900 hover:bg-purple-200' key={subCourse.subCourseId} onClick={() => toggleSubTopics(subCourse.subCourseId)}>
                        <div>
                            <Image src="/ai-svgrepo-com.svg" alt="" className='dark:invert w-10 h-7 ' width={30} height={30} />
                        </div>
                        <div className=''>
                            <h4 className="cursor-pointer font-medium " >
                                {subCourse.subCourseName}
                            </h4>
                        </div>

                    </div>
                    {expandedTopics.includes(subCourse.subCourseId) && (
                        <div key={subCourse.subCourseId} className=" w-[90%]">
                            {subCourse.subTopics.map((subTopic) => (
                                <div key={subTopic.id}>
                                <Link  href={`/course/${Number(courseId)}/topic/${subTopic.id}`} className='removeLinkEffect'>
                                    <div  className={`${subTopic.id} w-[95%] ml-[5%] my-1 px-2 py-2 flex  items-center justify-between  bg-gray-100  rounded-xl  dark:bg-black dark:bg-opacity-70 dark:hover:bg-gray-900  hover:bg-purple-400`}>
                                        <div className="text-sm flex ">
                                            <Image src="/test.svg" alt="" className='w-[10%] mr-2 dark:invert' width={30} height={30}/>
                                            <p>{subTopic.topic_name}</p>
                                        </div>
                                        <DurationDisplay duration={subTopic.duration} />
                                    </div>
                                </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))
            }
        </div >
    );
}
