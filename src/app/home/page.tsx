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

  const fetchData = await fetch(process.env.BACKEND_URL + '/Category')
  const response = await fetchData.json();
  return response;
}

export default async function Home() {
  const Courses = await getCourse();
  return (
    <div className=" dark:bg-neutral-900">
      <div className="w-[90vw] mt-10 mx-auto flex  xs:flex-col sm:flex-row ">
        <img className="w-[50%] m-5 rounded-lg " src="/3644996.jpg" alt="" />
        <div className="flex flex-col justify-evenly w-full ">
          <p className="m-5  xs:text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold">Let's start <br />Learning ,Iamdevil</p>
          <div className="flex items-center w-[90%] mx-auto bg-purple-200 border rounded-full p-1 shadow-sm justify-evenly">
            <button
              type="button"
              className=" ml-2 flex-shrink-0 text-purple-900 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fill="none"
                  d="M0 0h24v24H0z"
                />
                <path
                  d="M21.29 20.71l-5.5-5.5A7.5 7.5 0 1118 12a7.5 7.5 0 01-2.21 5.3l5.5 5.5a1 1 0 001.42 0 1 1 0 000-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="search for courses"
              className="flex-1 appearance-none bg-transparent border-none w-full text-purple-900 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button className="bg-purple-600 text-white rounded-full p-2">
              <p>Search</p>
            </button>
          </div>

        </div>
      </div>
      <div className="Courses w-[80vw] mx-auto">
        {Courses.map((course) => (
          <CoruseCard key={course.id} id={course.id} name={course.name} description={course.description} thumbnail={course.thumbnail} />
        ))}
      </div>

    </div>

  )
}
