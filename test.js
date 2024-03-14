const draftMode =  async()=>{
    const data = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": "lkajlkjld",
        "email": "ajgdlkjg@gmail.com",
        "password": "Dhoni@2005",
        "password2": "Dhoni@2005"
    }),    });

    console.log("data:", await data.json())

}

draftMode();

// const submitSignup = async () => {
//   try {
//     // console.log({ "username": username, "email": email, "password": password, "password2": password2 });

//     const token = await fetch("http://127.0.0.1:8000/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: "kjsgkjhgjlkj",
//         email: "dkjhfkj@gmail.com",
//         password: "Dhoni@2005",
//         password2: "Dhoni@2005",
//       }),
//     });
//     if (!token.ok) {
//       // Handle non-successful response (e.g., show an error message)
//       throw new Error("Signup failed");
//     }

//     const response = await token.json();
//     console.log(response)
//     localStorage.setItem('token', response.token.access);
//     localStorage.setItem('refresh', response.token.refresh);
//     redirect("/home");
//   } catch (error) {
//     console.error("Error during signup:", error);
//     // Handle error (e.g., show an error message to the user)
//   }
// };

// submitSignup();
