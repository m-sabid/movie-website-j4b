import "./globals.css";
import { Inter } from "next/font/google";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactQueryProviders from "@/providers/ReactQuerySetup/ReactQueryProviders";
import AllMoviesProvider from "@/providers/data/AllMoviesData";
import AuthProvider from "@/providers/firebase/AuthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "J4B Movies",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReactQueryProviders>
          <AllMoviesProvider>
            <body className={inter.className}>{children}</body>
          </AllMoviesProvider>
        </ReactQueryProviders>
      </AuthProvider>

      <Script
        type="text/javascript"
        src="//pl22803240.profitablecpmrate.com/13/b3/09/13b3090dd569b3e171dbf3572aedaa00.js"
        strategy="afterInteractive" // Ensures the script runs after the page is loaded
      />
    </html>
  );
}
