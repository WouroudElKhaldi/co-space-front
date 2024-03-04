"use client";

import "@/app/globals.css";
import { AuthProvider } from "@/context/authContext";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { usePathname } from "next/navigation";

export default function NormalLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.includes("/dashboard");

  return (
    <AuthProvider>
      {/* Only render Navbar and Footer if not on '/dashboard' */}
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer width="90%" />}
    </AuthProvider>
  );
}
