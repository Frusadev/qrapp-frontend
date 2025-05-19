import type { Metadata } from "next";
import "../globals.css";
import Unauthenticated from "@/components/providers/conditional/Unauthenticated";
import ThemeSwitch from "@/components/ui/theme-switch";

export const metadata: Metadata = {
  title: "Login / Register",
  description: "Authenticate yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Unauthenticated>
      <div className="relative flex w-full h-full justify-center items-center">
        <div className="w-full absolute flex justify-end top-0">
          <ThemeSwitch />
        </div>
        {children}
      </div>
    </Unauthenticated>
  );
}
