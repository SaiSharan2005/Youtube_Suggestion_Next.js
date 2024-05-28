"use server"
import CourseInterface from "@/interface/courseInterface";
import { userTokenDataInterfaceI } from "@/interface/userTokenDataInterface";
export const getCourse = async (): Promise<CourseInterface[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + '/AllCategory');
  const response = await fetchData.json();
  return response;
};

export const LogOut = async (token: string | null): Promise<boolean> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + 'api/logout_user/', {
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

export const SignUp = async (username: string, email: string, password: string, password2: string): Promise<{ success: boolean, data: any }> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password2: password2
      })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, data: null };
  }
}

export const LogIn = async (username: string, password: string): Promise<{ success: boolean, data: any }> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + 'api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": username, "password": password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, data: null };
  }


}

export const getUserData = async (token: string): Promise<{ success: boolean, data: userTokenDataInterfaceI }> => {
  try {
    const response = await fetch(process.env.BACKEND_URL+"GetUserData/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}` // Use "Authorization" header instead of "authentication"
        },
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      return { success: false, data: {userId:-1,username:""} };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, data: {userId:-1,username:""}};
  }
  

}