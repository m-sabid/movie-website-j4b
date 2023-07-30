import SidebarNav from "@/components/dashboard/SidebarNav";
import { Inter } from "next/font/google";
// import ReactQueryProviders from "@/providers/ReactQuerySetup/ReactQueryProviders";
// import AllMoviesProvider from "@/providers/data/AllMoviesData";
// import SidebarNav from "@/components/dashboard/SidebarNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard || J4B Movies",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      {/* <ReactQueryProviders>
        <AllMoviesProvider> */}
      <body className={inter.className}>
        <SidebarNav>{children}</SidebarNav>
      </body>
      {/* </AllMoviesProvider>
      </ReactQueryProviders> */}
    </html>
  );
}
