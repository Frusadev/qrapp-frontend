"use client";
import { isAuthenticated } from "@/lib/api/requests/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Authenticated({
  redirect,
  children,
}: { redirect?: string; children: ReactNode }) {
  const router = useRouter();
  const { isSuccess, isError } = useQuery({
    queryKey: ["/auth/authenticated"],
    queryFn: isAuthenticated,
    retry: false,
  });
  useEffect(() => {
    if (isError) {
      router.push(redirect ?? "/login");
    }
  }, [isError]);
  if (isSuccess) {
    return children;
  } else {
    return null;
  }
}
