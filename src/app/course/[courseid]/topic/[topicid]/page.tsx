import * as React from 'react';
import SideBar, { INavBarData } from '@/components/SideBar';
import SideBarData from '@/interface/sideBarInterface';
// import topicInterface from '@/interface/TopicInterface';
import Navigation from '@/components/Navigation';
import YoutubeVidePlayer from '@/components/YoutubePlayer';
import TopicInterface from '@/interface/topicInterface';
import Image from 'next/image';
import { Documentation } from '@/components/Documentation/Documentation';
import { DocumentationInterface } from '@/interface/documentationInterface';
export interface ITopicProps {
  params: {
    courseid: string;
    topicid: string;
  }
}


const CourseSideBar = async (CourseId: number, TopicId: number): Promise<[SideBarData[], number, number, string]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "WholeCourse/" + CourseId);
  const response: SideBarData[] = await fetchData.json();
  let next: number | undefined, back: number | undefined, temp: number | undefined, courseTopic: string | undefined;
  let found = false;
  outerLoop: for (const subCourse of response) {
    for (const subTopic of subCourse.subTopics) {
      if (subTopic.id === TopicId) {
        courseTopic = subCourse.subCourseName
        found = true;
        back = temp;
      } else if (found) {
        next = subTopic.id;
        break outerLoop;
      } else {
        temp = subTopic.id;
      }
    }
  }


  return [response, back || 0, next || 0, courseTopic || ""];

}
const TopicDetail = async (TopicId: number): Promise<TopicInterface> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "SubTopic/" + TopicId);
  const response = await fetchData.json();
  return response;
}

const DocumentationDetail = async (DocumentationId: number): Promise<DocumentationInterface> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "Document/" + DocumentationId);
  const response = await fetchData.json();
  return response;
}

export default async function Topic(props: ITopicProps) {

  const [CourseSideBarData, back, next, courseTopic] = await CourseSideBar(parseInt(props.params.courseid), parseInt(props.params.topicid))
  const TopicData: TopicInterface = await TopicDetail(parseInt(props.params.topicid));
  const DocumentData: DocumentationInterface = await DocumentationDetail(parseInt(props.params.topicid));
  return (
    <div className='w-[95%] mx-auto my-7 flex flex-col-reverse sm:flex-row '>
      <div className="w-[100%] sm:w-[30%] ">
        <div className='mb-5 flex items-center'>
          <Image src="/machine-learning-03-svgrepo-com.svg" alt="" className=' h-[100%] w-[15%]  mr-2 dark:invert ' width={100} height={100} />
          <div>
            <p className='text-xl font-bold'>Course Topic</p>
            <p className='text-xl font-semibold text-purple-600'>{courseTopic}</p>
          </div>
        </div>
        <SideBar sideBarData={CourseSideBarData} courseId={parseInt(props.params.courseid)} />
      </div>
      <div className='w-[100%] sm:w-[70%] sm:max-h-[70vh]'>
        <p className='text-center text-xl font-bold mb-7'>{TopicData.topic_name}</p>
        <YoutubeVidePlayer topicData={TopicData} />
        <div className='w-full my-3 mr-2 flex justify-end'>
          <Navigation next={next} back={back} courseId={parseInt(props.params.courseid)} />
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className="Document m-2">
          <Documentation id={DocumentData.id}
            DocumentName={DocumentData.DocumentName}
            host={DocumentData.host}
            Category={DocumentData.Category}
            SubTopic={DocumentData.SubTopic}
            subCourse={DocumentData.subCourse} />
        </div>
      </div>
    </div>

  );
}
