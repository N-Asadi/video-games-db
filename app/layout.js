import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Video Games DB",
  description: "Explore details about your favorite video games!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
