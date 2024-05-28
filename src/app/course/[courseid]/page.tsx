
// import * as React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import SideBar, { INavBarData } from '@/components/SideBar';
import sideBarInterface from '@/interface/sideBarInterface'
import CourseInterface from '@/interface/courseInterface';

export interface ICourseIdProps {
  params: {
    courseid: number;
  };
}

export const generateMetadata =async ({params}:ICourseIdProps):Promise<Metadata> => {
  const courseDetails: CourseInterface = await CouseDeatail(params.courseid);
  return {
    title:courseDetails.name+" ProgrammerHub",
    description:courseDetails.description,
    openGraph:{
      images:courseDetails.thumbnail
    }
  }
}

const CouseDeatail = async (CourseId:number): Promise<CourseInterface> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "Category/"+CourseId);
  const response = await fetchData.json();
  return response;
}
const CourseSideBar = async (CourseId: number): Promise<INavBarData[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "WholeCourse/" + CourseId);
  const response = await fetchData.json();
  return response;1
}

export default async function CourseId(props: ICourseIdProps) {

  const courseDetails: CourseInterface = await CouseDeatail(props.params.courseid);
  const CourseSideBarData: INavBarData[] = await CourseSideBar(props.params.courseid);
  
  
  return (
    <div className="w-[95%] mx-auto sm:my-7 flex flex-col-reverse sm:flex-row">
      <div className="mx-auto w-[80%] sm:w-[30%]">
        <SideBar key={1} sideBarData={CourseSideBarData} courseId={Number(props.params.courseid)} />
      </div>
      <div className=' mx-auto my-4 w-[90%] sm:w-[70%]'>
        <Image src={courseDetails.thumbnail}alt="" className='w-[90%] mx-auto rounded-2xl' width={900} height={600}/>
        <h1 className=' w-[90%] mx-auto my-7 text-lg sm:text-5xl font-semibold'>{courseDetails.name}</h1> 
        <p className='w-[90%] mx-auto my-2  stext-purple-600'>{courseDetails.description}</p> 
      </div>
    </div>

  );
}
 