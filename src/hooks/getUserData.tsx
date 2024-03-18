
export interface UserDataI {
    userid: number;
    username: string;
}

const GetUserData = async (token: string|null): Promise<UserDataI|string> => {
    try {
        const data = await fetch(process.env.BACKEND_URL + "GetUserData/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}` // Use "Authorization" header instead of "authentication"
            },
        });
        console.log(data)

        if (!data.ok) {
            return "error while fetching user data";
        }

        const response = await data.json() as UserDataI; // Ensure response conforms to UserDataI
        return response;
    } catch (error) {
        console.error('Error during fetching user data:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};


 GetUserData("1ed0df2c60a0a129cae47bf73341d00348d30423")
// export default GetUserData;
