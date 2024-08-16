import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '../context/AuthProvider';
const inter = Inter({ subsets: ["latin"] });
import './globals.css'
export const metadata: Metadata = {
  title: "True Feedback",
  description: "anonymus message app",

};

export default function RootLayout({

  children,
}: Readonly<{

  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <div>
        <AuthProvider>

        {children}
      <Toaster />
      </AuthProvider>
      </div>
      </body>
    </html>
  );
}
