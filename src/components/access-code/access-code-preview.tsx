"use client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AccessCodeDTO } from "@/lib/api/dto/accessCode";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFileURL } from "@/lib/api/requests/fileResource";

import { Trash2 } from "lucide-react"; // ⬅ For delete icon
import { deleteAccessCode } from "@/lib/api/requests/accessCode";
import { toast } from "sonner";

export default function AccessCodePreview({
  accessCode,
  currentResourceIdStateSetter,
  currentAccessCodeSetter,
}: {
  accessCode: AccessCodeDTO;
  currentResourceIdStateSetter: (s?: string) => void;
  currentAccessCodeSetter: (ac: AccessCodeDTO | null) => void;
}) {
  const useFileURL = (resourceId?: string) =>
    useQuery({
      queryKey: ["/resources/files", resourceId],
      queryFn: () => getFileURL(resourceId),
    });

  const { data: qrcodeUrl } = useFileURL(accessCode.qrcode_resource_id);

  const deleteAccessCodeMutation = useMutation({
    mutationKey: ["delete-access-code"],
    mutationFn: deleteAccessCode,
    onSuccess: () => {
      toast.success("Accès supprimé");
    }
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent parent div click
    deleteAccessCodeMutation.mutate(accessCode.access_code_id)
    window.location.reload();
  };

  return (
    <div
      onClick={() => {
        currentResourceIdStateSetter(accessCode.qrcode_resource_id);
        currentAccessCodeSetter(accessCode);
      }}
      className={`${buttonVariants({ variant: "outline" })}
  flex justify-start h-[100px] w-full sm:w-[500px] rounded-md
  relative`}
    >
      {/* 🗑 Delete button (top-right corner) */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>

      <div className="h-[95%] w-[95px]">
        <Image
          src={qrcodeUrl ?? "/no-media"}
          alt="QR code"
          className="w-full h-full"
          width={90}
          height={95}
        />
      </div>

      <div
        className="h-full w-full flex flex-col items-center justify-around
        select-none"
      >
        <div className="w-full">
          <span>
            Accédé par{" "}
            {accessCode.accessed_by.length === 0
              ? "aucun"
              : accessCode.accessed_by.length}{" "}
            utilisateur
            {accessCode.accessed_by.length > 1 ? "s" : null}
          </span>
        </div>
        <div className="w-full">
          <span>
            Créé le{" "}
            {format(new Date(accessCode.created_at), "dd MMM yyyy", {
              locale: fr,
            })}
          </span>
        </div>
        <div className="w-full">
          <span>
            Activé:{" "}
            <span
              className={
                accessCode.activated ? "text-green-400" : "text-amber-600"
              }
            >
              {accessCode.activated ? "oui" : "non"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
