import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Knowledge Hub",
  description: "Company knowledge and learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}