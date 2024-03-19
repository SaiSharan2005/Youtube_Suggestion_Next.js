import CourseInterface from "@/interface/courseInterface";

export const getCourse = async (): Promise<CourseInterface[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + '/AllCategory');
  const response = await fetchData.json();
  return response;
};

export const LogOut = async (token:string|null): Promise<boolean> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/logout_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false; 
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false; 
  }
};
