"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authorizeAccessCode } from "@/lib/api/requests/accessCode";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function AccessCodeAuthorizationPage() {
  const { reqId } = useParams();
  const useAuthorizeAccessCode = useMutation({
    mutationKey: [`access-code/grant/${reqId?.toString()}`],
    mutationFn: authorizeAccessCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Requête autorisée avec succès !");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-start">
        <span className="font-bold select-none">Autoriser cette requête ?</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(reqId?.toString() ?? "");
                }}
              >
                Code:{" "}
                <span
                  className="font-mono bg-foreground/20 rounded-full
          text-foreground/70 px-2 select-none"
                >
                  {reqId?.slice(0, 10)}...
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent>Clicker pour copier</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          className="mt-4 rounded-full px-6"
          onClick={() =>
            useAuthorizeAccessCode.mutate({
              requestId: reqId?.toString() ?? "",
            })
          }
        >
          Oui
        </Button>
      </div>
    </div>
  );
}
