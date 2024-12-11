import { Inter } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata = {
  title: "Video Games DB",
  description: "Explore details about your favorite video games!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${pressStart2P.variable} font-press-start-2p bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="fixed top-4 right-4 z-50">
          <DarkModeToggle />
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
