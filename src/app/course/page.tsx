
import CoruseCard from "@/components/CourseCard";

interface Course {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

interface HomeProps {
  courses: Course[];
}

const getCourse = async (): Promise<Course[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + 'AllCategory')
  const response = await fetchData.json();
  return response;
}

export default async function Home() {
  const Courses = await getCourse();
  return (
    <div className=" dark:bg-neutral-900">
      
      <div className="Courses w-[80vw] mx-auto">
        {Courses.map((course) => (
          <CoruseCard key={course.id} id={course.id} name={course.name} description={course.description} thumbnail={course.thumbnail} />
        ))}
      </div>

    </div>

  )
}
