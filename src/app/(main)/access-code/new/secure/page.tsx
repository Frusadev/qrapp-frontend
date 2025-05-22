"use client";
import InfofieldSelect, {
  InfofieldSelectProps,
} from "@/components/infofield/infofield-selection";
import Show from "@/components/providers/conditional/Show";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  generateAccessCode,
  getAccessCodeCost,
} from "@/lib/api/requests/accessCode";
import { getInfofields } from "@/lib/api/requests/infofield";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";
import { toast } from "sonner";

export default function SecureAccessCodeCreationPage() {
  const gAccessCode = useQuery({
    queryKey: ["access-code/costs", "secure"],
    queryFn: async () => await getAccessCodeCost("secure"),
  });

  const generateAccessCodeMutation = useMutation({
    mutationKey: ["/access-code", "secure"],
    mutationFn: generateAccessCode,
    onSuccess: () =>
      toast.success(
        "Accès généré avec succès ! Merci de vérifier votre boîte mail.",
      ),
    onError: (e) => toast.error(e.message),
  });

  const {
    data: infofields,
    isLoading: isLoadingInfofields,
    refetch: refetchInfofields,
  } = useQuery({
    queryKey: ["/infofields"],
    queryFn: getInfofields,
  });

  const infofieldSelectionData: InfofieldSelectProps[] =
    infofields?.map((ifield) => {
      return { infofield: ifield, selected: false };
    }) ?? [];

  return (
    <div className="w-full h-full px-4 py-2 flex flex-col">
      <span className="select-none text-lg font-medium">
        Création d'accès sécurisé
      </span>
      <div className="flex flex-col justify-start my-8 h-full w-full items-center">
        <Card className="w-full sm:w-[400px]">
          <CardContent>
            <div className="flex justify-between h-[200px] px-4 gap-3">
              <div className="w-1/2 h-full">
                <div className="flex gap-1.5 border-b">
                  <Coins className="stroke-amber-500" />
                  <span className="font-medium text-3xl select-none">
                    Coût :
                  </span>
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
            </div>
            <div
              className="flex flex-col h-[250px] rounded-md w-full px-2 border mb-2
              overflow-y-auto gap-2 py-2"
            >
              {infofieldSelectionData?.map((infofieldSelectionData) => {
                return (
                  <InfofieldSelect
                    key={infofieldSelectionData.infofield.field_id}
                    infofield={infofieldSelectionData}
                  />
                );
              })}
            </div>
            <div className=" h-full flex w-full self-end justify-center">
              <Button
                disabled={generateAccessCodeMutation.isPending}
                onClick={() => {
                  generateAccessCodeMutation.mutate({
                    data: {
                      field_ids:
                        infofieldSelectionData
                          .filter((d) => d.selected)
                          .map((data) => {
                            return data.infofield.field_id;
                          }) ?? [],
                    },
                    accessType: "secure",
                  });
                }}
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
