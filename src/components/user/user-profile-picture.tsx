"use client";
import type { UserDTO } from "@/lib/api/dto/user";
import { getFileURL } from "@/lib/api/requests/fileResource";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Show from "../providers/conditional/Show";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AvatarUpload from "../ui/avatar-upload";
import { updloadProfilePicture } from "@/lib/api/requests/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserProfilePicture({ user }: { user?: UserDTO }) {
  const [src, setSrc] = useState<string | null>(null);
  const router = useRouter()
  const { data: picture, refetch: refetchPicture } = useQuery({
    queryKey: ["/me/profile-picture", user?.avatar_id],
    queryFn: async () => {
      return getFileURL(user?.avatar_id);
    },
  });

  useEffect(() => {
    setSrc(picture ?? null);
  }, [picture]);

  const updProfilePicture = useMutation({
    mutationKey: ["/me/profile-picture"],
    mutationFn: updloadProfilePicture,
    onSuccess: () => {
      toast.success("Photo de profil mise à jour");
      refetchPicture();
      window.location.reload();
      setUploadDialogOpen(false);
      
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de la photo de profil");
    },
  });

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  return (
    <Show _if={user?.avatar_id !== undefined}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              onClick={() => setUploadDialogOpen(true)}
              src={src ?? "/avatar.svg"}
              width={100}
              height={100}
              className={`rounded-full p-4 h-[100px] w-[100px] ${
                user?.avatar_id ? "" : "hover:bg-muted"
              } transition-colors border`}
              alt={`photo de profil de ${user?.first_name}`}
            />
          </TooltipTrigger>
          <TooltipContent>
            Télécharger / Changer la photo de profil
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer la photo de profil</DialogTitle>
          </DialogHeader>
          <AvatarUpload
            handleUpload={(f) => {
              updProfilePicture.mutate(f);
            }}
          />
        </DialogContent>
      </Dialog>
    </Show>
  );
}
