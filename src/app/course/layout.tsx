import "../globals.css";
// import Providers from "./providers";
// import ThemeSwitcher from "./ThemeSwitcher";
import {Providers}  from "../providers";
import Navbar from "@/components/Navbar"
export const metadata = {
  title: "Master Machine Learning, DSA in C++, MERN Stack | ProgrammerHub",
  description: "Unlock your coding potential with ProgrammerHub's expert-led courses. Learn Machine Learning, DSA in C++, the MERN Stack, and more. Start your journey to programming mastery today!  ",
  
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-neutral-900">
        <Providers>
        <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}