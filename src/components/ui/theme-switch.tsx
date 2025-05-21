"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="w-10 h-10 rounded-full m-4"
      variant={"outline"}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? <MoonStar /> : <Sun />}
    </Button>
  );
}
