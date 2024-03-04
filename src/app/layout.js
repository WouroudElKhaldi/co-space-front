import { Inter } from "next/font/google";
import "./globals.css";
import NormalLayout from "@/components/layout/layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoSpace",
  description: "Your friend for exploring co working spaces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NormalLayout>{children}</NormalLayout>
      </body>
    </html>
  );
}
