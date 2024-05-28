// app/layout.js
import "./globals.css";
import { Providers } from "./providers";
import { UserDataProvider } from '@/context/userData';

export const metadata = {
  title: "Master Machine Learning, DSA in C++, MERN Stack | ProgrammerHub",
  description: "Unlock your coding potential with ProgrammerHub's expert-led courses. Learn Machine Learning, DSA in C++, the MERN Stack, and more. Start your journey to programming mastery today!",
  openGraph: {
    images: './ProgrammerHubLogo.jpeg'
  },

  icons:{
    icon:"./ProgrammerHubLogo.jpeg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
