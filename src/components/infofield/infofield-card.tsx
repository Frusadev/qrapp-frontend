"use client";
import type { InfofieldDTO } from "@/lib/api/dto/infofield";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteInfofield } from "@/lib/api/requests/infofield";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InfofieldCard({
  infofield,
  refetchFunction,
}: { infofield: InfofieldDTO; refetchFunction?: () => void }) {
  const useDeleteInfofield = useMutation({
    mutationKey: [`/infofield/${infofield.field_id}`],
    mutationFn: deleteInfofield,
    onSuccess: () => {
      toast.success("Champ suprimé avec succès");
    }
  });
  const router = useRouter();
  return (
    <div
      className="w-full bg-card border border-border rounded-2xl px-3 py-2 shadow-sm
                 hover:shadow-md transition-shadow duration-200 ease-in-out"
    >
      <div className="flex items-center justify-between cursor-default">
        <span className="font-semibold uppercase tracking-wide text-muted-foreground">
          {infofield.name}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-accent"
          onClick={() => {
            useDeleteInfofield.mutate(infofield.field_id);
            (
              refetchFunction ??
              (() => {
                window.location.reload();
              })
            )();
            router.refresh()
          }}
        >
          <Trash className="w-4 h-4 text-destructive" />
        </Button>
      </div>
      <div className="text-sm text-foreground">{infofield.value}</div>
    </div>
  );
}
