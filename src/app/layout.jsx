import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "BlockBuster",
  description: "BlockBuster Minecraft Server",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins relative bg-dark">
        <nav className="pt-5 fixed top-0 left-0 w-full z-50">
          <Navbar />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
