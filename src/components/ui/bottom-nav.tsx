"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export interface NavLink {
  name: string;
  icon: ReactNode;
  href: string;
}
export default function BottomNav({ links }: { links: NavLink[] }) {
  return (
    <div
      className="absolute bottom-0 w-full h-[75px]
      flex justify-around px-4 items-center border-t
      border-t-border bg-black/10 backdrop-blur-2xl"
    >
      {links.map((link, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center w-[50px] h-[50px]"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`${buttonVariants({ variant: "ghost" })} w-full h-full rounded-full`}
                    href={link.href}
                  >
                    {link.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{link.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}
    </div>
  );
}
