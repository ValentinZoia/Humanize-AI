import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const inter= Inter({
  
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Humanizer",
  description: "Humanizer is a tool to help you humanize your data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 flex flex-col">
            <main>
              {children}
            </main>

          </div>
          <Footer />
        </div>
        
      </body>
    </html>
  );
}
