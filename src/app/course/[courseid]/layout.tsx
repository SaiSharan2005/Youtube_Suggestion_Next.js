import "../../globals.css";
// import Providers from "./providers";
// import ThemeSwitcher from "./ThemeSwitcher";

import Navbar from "@/components/Navbar"
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-neutral-900">
        <Navbar />
          {children}
      </body>
    </html>
  );
}