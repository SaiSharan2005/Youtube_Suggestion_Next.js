import * as React from 'react';

export interface ICourseProps {
}

export default function Course (props: ICourseProps) {
  return (
    <div>
      <div className="Courses w-[80vw] mx-auto">
        {Courses.map((course) => (
          <CoruseCard key={course.id} id={course.id} name={course.name} description={course.description} thumbnail={course.thumbnail} />
        ))}
      </div>
    </div>
  );
}
