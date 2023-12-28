import Header from "@/components/Header";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lakeland Photos",
  description: "lakeland.app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="flex min-h-screen flex-col items-center bg-slate-50">
          <div className="container flex flex-col items-center justify-center">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
