import type { Metadata } from "next";
import "../globals.css";
import Authenticated from "@/components/providers/conditional/Authenticated";
import BottomNav, { type NavLink } from "@/components/ui/bottom-nav";
import { Home, IdCard, Settings } from "lucide-react";
import NotificationMenuButton from "@/components/ui/notification-menu-btn";
import ThemeSwitch from "@/components/ui/theme-switch";
import NotificationsProvider from "@/components/providers/query/NotificationsProvider";

export const metadata: Metadata = {
  title: "QRApp",
  description: "Plus de cartes perdues. Plus d'usurpation d'identité.",
};
const navLinks: NavLink[] = [
  {
    name: "Acceuil",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Accès",
    href: "access-codes",
    icon: <IdCard />,
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: <Settings />,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: <NotificationMenuButton />,
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Authenticated>
      <div className="h-screen w-screen relative flex">
        <div className="absolute flex justify-end top-0 right-0 z-30">
          <NotificationsProvider />
          <ThemeSwitch />
        </div>
        {children}
        <BottomNav links={navLinks} />
      </div>
    </Authenticated>
  );
}
