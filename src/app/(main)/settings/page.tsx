"use client";

import InfofieldCard from "@/components/infofield/infofield-card";
import InfofieldCreationBox from "@/components/infofield/infofield-creation";
import Show from "@/components/providers/conditional/Show";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import UserProfilePicture from "@/components/user/user-profile-picture";
import { logout } from "@/lib/api/requests/auth";
import { getInfofields } from "@/lib/api/requests/infofield";
import { getCurrentUser } from "@/lib/api/requests/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export default function SettingsPage() {
  const { data: currentUser } = useQuery({
    queryKey: ["/me"],
    queryFn: getCurrentUser,
  });

  const { data: infofields, isLoading: isLoadingInfofields } = useQuery({
    queryKey: ["/infofields"],
    queryFn: getInfofields,
  });

  const logoutMutation = useMutation({
    mutationKey: ["/logout"],
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = "/";
    }
  });

  return (
    <div className="px-4 relative w-full h-full flex flex-col">
      <span className="text-xl font-medium p-4">Paramètres</span>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col w-full sm:w-[500px]">
          <div className="w-full flex px-4 py-2 h-[150px]">
            <UserProfilePicture user={currentUser} />
            <div className="flex flex-col justify-start px-6 h-full gap-1">
              <span className="font-bold cursor-default">
                {currentUser?.first_name} {currentUser?.last_name}
              </span>
              <span
                className={`font-light text-sm ${
                  currentUser?.verified
                    ? "bg-green-500/70 w-[60px]"
                    : "bg-red-500/60"
                } px-1 rounded-full select-none text-center`}
              >
                {currentUser?.verified ? "Vérifié" : "Compte non vérifié"}
              </span>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>Se déconnecter</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-light">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                      </span>
                      <div className="flex w-full justify-end gap-2">
                        <Button
                          variant={"outline"}
                          onClick={() => {logoutMutation.mutate()}}
                        >
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 px-4 py-2 mb-2
            cursor-default border-t"
          >
            <div className="flex flex-col gap-1">
              <span className="font-light text-sm">
                Adresse email : {currentUser?.email}
              </span>
              <span className="font-light text-sm">
                Crédits :{" "}
                <span className="font-semibold">{currentUser?.credits}</span>
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-2">
            <span className="text-lg font-medium select-none">
              Autres informations
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-10 h-10 rounded-full mt-2">
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <InfofieldCreationBox />
              </PopoverContent>
            </Popover>
            <div className="flex w-full flex-col items-center gap-1 mt-4 h-[250px] overflow-y-auto">
              <Show _if={isLoadingInfofields}>
                <Spinner size={"small"} />
              </Show>
              <Show _if={(infofields ?? []).length === 0}>
                <span className="font-light text-sm select-none text-foreground/60">
                  Vous n&apos;avez pas encore d&apos;informations
                  supplémentaires.
                </span>
              </Show>
              {(infofields ?? []).map((infofield) => (
                <InfofieldCard infofield={infofield} key={infofield.field_id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
