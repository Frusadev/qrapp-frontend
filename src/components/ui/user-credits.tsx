"use client";
import { Coins } from "lucide-react";
import { Button } from "./button";
import Show from "../providers/conditional/Show";
import { Skeleton } from "./skeleton";

export default function UserCreditsCount({
  count,
  isLoading,
}: { count?: number; isLoading: boolean }) {
  return (
    <div className="flex w-full justify-end p-4">
      <div className="z-20">
        <Show
          _if={!isLoading}
          _else={<Skeleton className="w-[100px] h-[50px] rounded-full" />}
        >
          <Button variant={"outline"} className="rounded-full text-amber-900">
            <Coins className="stroke-amber-500" />
            {count} crédit{(count ?? 0 > 0) ? "s" : null}
          </Button>
        </Show>
      </div>
    </div>
  );
}
