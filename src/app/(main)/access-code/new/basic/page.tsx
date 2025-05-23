"use client";
import Show from "@/components/providers/conditional/Show";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  generateAccessCode,
  getAccessCodeCost,
} from "@/lib/api/requests/accessCode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";
import { toast } from "sonner";

export default function BasicAccessCodeCreationPage() {
  const gAccessCode = useQuery({
    queryKey: ["access-code/costs", "basic"],
    queryFn: async () => await getAccessCodeCost("basic"),
  });

  const generateAccessCodeMutation = useMutation({
    mutationKey: ["/access-code", "basic"],
    mutationFn: generateAccessCode,
    onSuccess: () =>
      toast.success(
        "Accès généré avec succès ! Merci de vérifier votre boîte mail.",
      ),
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col">
      <span className="select-none text-lg font-medium">
        Création d'accès basique
      </span>
      <div className="flex flex-col justify-start my-8 h-full w-full items-center">
        <Card className="h-[300px] w-full sm:w-[400px]">
          <CardContent>
            <div className="flex h-full justify-between px-4 gap-3">
              <div className="w-1/2 h-full">
                <div className="flex gap-1.5">
                  <Coins className="stroke-amber-500" />
                  <span className="font-medium text-3xl select-none">Coût</span>
                </div>
                <div className="h-full flex flex-col mt-5">
                  <span>
                    <Show _if={gAccessCode.isLoading}>
                      <Spinner size={"small"} />
                    </Show>
                    <Show _if={gAccessCode.isFetched}>
                      <span className="cursor-default font-medium">
                        <span className="text-8xl font-bold">
                          {gAccessCode.data}
                        </span>{" "}
                        <span className="ml-2">crédits</span>
                      </span>
                    </Show>
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col">
                <span className="font-medium text-2xl">Caractéristiques</span>
                <div>
                  <ul>
                    <li>- Abordable</li>
                    <li>- Donne accès à toutes vos informations</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" h-full flex w-full self-end justify-center mt-2">
              <Button
                disabled={generateAccessCodeMutation.isPending}
                onClick={() =>
                  generateAccessCodeMutation.mutate({
                    data: { field_ids: [] },
                    accessType: "basic",
                  })
                }
              >
                <Show _if={generateAccessCodeMutation.isPending}>
                  <Spinner size={"small"} className="stroke-background" />
                </Show>
                Créer un accès
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
