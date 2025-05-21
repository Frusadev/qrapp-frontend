import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/query/QueryProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "QRApp",
  description: "No more card loss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <QueryProvider>
          <ThemeProvider attribute={"class"}>
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
