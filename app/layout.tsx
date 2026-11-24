import type { Metadata } from "next";
import { Marcellus, Figtree } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import FloatingActions from "@/components/FloatingActions";
import EnquiryModal from "@/components/EnquiryModal";
import "./globals.css";

const display = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Jhamtani SpaceBiz | Grade A Commercial Spaces in Baner, Pune",
  description: "150-metre commercial tower in Baner with offices, retail frontage and easy access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingActions />
        <EnquiryModal />
      </body>
    </html>
  );
}
