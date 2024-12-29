import { ReactNode } from "react";
import Sidebar from "../pages/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-200 h-[6vh] w-full"></div>{" "}
      <div className="flex min-h-screen">
        <Sidebar />{" "}
        <div className="ml-64 p-6 text-black/80 flex-1 overflow-auto">
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
}
