import "./globals.css";
import { Inter } from "next/font/google";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactQueryProviders from "@/providers/ReactQuerySetup/ReactQueryProviders";
import AuthProvider from "@/providers/firebase/AuthProvider";
import Script from "next/script";
import ThemeProvider from "@/providers/colors/GlobalColors";
import AllMoviesProvider from "@/providers/data/AllMoviesData";
import SmoothScrolling from "@/components/SmoothScrolling";
import Title from "@/components/shared/Title";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <ReactQueryProviders>
            <AllMoviesProvider>
              <Title />
              <body className={inter.className}>
                <SmoothScrolling>{children}</SmoothScrolling>
              </body>
            </AllMoviesProvider>
          </ReactQueryProviders>
        </AuthProvider>
      </ThemeProvider>

      <Script
        type="text/javascript"
        src="//pl27235690.profitableratecpm.com/8b/71/81/8b7181e9817cee231dc0d75e42008e72.js"
        strategy="afterInteractive" // Ensures the script runs after the page is loaded
        />
 </html>
  );
}
