"use client"

import SidebarNav from "@/components/dashboard/SidebarNav";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    if (userRole !== "admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <html lang="en">
      {/* <ReactQueryProviders>
        <AllMoviesProvider> */}
      <body className={inter.className} style={{ backgroundColor: "#1d232a" }}>
        <SidebarNav>{children}</SidebarNav>
      </body>
      {/* </AllMoviesProvider>
      </ReactQueryProviders> */}
    </html>
  );
}
