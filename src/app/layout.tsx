import "./globals.css";
// import Providers from "./providers";
// import ThemeSwitcher from "./ThemeSwitcher";
import { Providers } from "./providers";
import { UserDataProvider } from '@/context/userData';
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </Providers>
      </body>
    </html>
  );
}