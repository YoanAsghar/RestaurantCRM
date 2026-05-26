import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "../index.css";
import RootClientLayout from "./RootClientLayout";
import { GlobalProvider } from "./GlobalContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Restaurant CRM",
  description: "Restaurant Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-dm-sans antialiased`}>
        <GlobalProvider>
          <RootClientLayout>
            {children}
          </RootClientLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
