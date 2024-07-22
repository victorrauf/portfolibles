import "./globals.css";
import { Chakra_Petch } from "next/font/google";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

const chakraPetch400 = Chakra_Petch({
  subsets:['latin'],
  weight:'400'
});

export const metadata = {
  title: "Portfolibles",
  description: "Track Your Stock and Crypto Investments",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chakraPetch400.className}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}