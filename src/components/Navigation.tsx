
import * as React from 'react';
import Link from "next/link"
export interface INavigationProps {
    next: number;
    back: number;
    courseId: number;
}

export default function Navigation(props: INavigationProps) {
    return (
        <div className='flex'>
            {props.back>1?
            <Link href={`/course/${props.courseId}/topic/${props.back}`}>
                <div className='w-20 mx-1 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-center'>
                    <p>Back</p>
                </div>
            </Link>:<></>}
            <Link href={`/course/${props.courseId}/topic/${props.next}`}>
                <div className='w-20 mx-1 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-center'>
                    <p>Next</p>
                </div>
            </Link>
        </div>
    );
}
