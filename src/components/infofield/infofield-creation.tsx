"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createInfofield } from "@/lib/api/requests/infofield";
import { useState } from "react";
import { toast } from "sonner";

export default function InfofieldCreationBox({
  refetchFunction,
}: { refetchFunction?: () => void }) {
  const [fieldName, setFieldName] = useState("");
  const [fieldContent, setFieldContent] = useState("");

  const useCreateInfofield = useMutation({
    mutationKey: ["/infofields"],
    mutationFn: createInfofield,
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de la création du champ d'information.",
      );
    },

    onSuccess: () => {
      toast.success("Champ d'information créé avec succès.");
      setFieldName("");
      setFieldContent("");
      (
        refetchFunction ??
        (() => {
          window.location.reload();
        })
      )();
    },
  });

  const createIField = () => {
    if (fieldName.length < 3 || fieldContent.length < 3) {
      toast.error(
        "Le nom et le contenu du champ doivent faire au moins 3 caractères.",
      );
      return;
    }

    useCreateInfofield.mutate({
      name: fieldName,
      value: fieldContent,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="field-name" className="text-sm font-semibold">
          Nom du champ :
        </Label>
        <Input
          name="field-name"
          placeholder="Ex: Quartier"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          minLength={3}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="field-name" className="text-sm font-semibold">
          Contenu :
        </Label>
        <Input
          name="field-name"
          placeholder="Ex: Résidence Les Courbatures"
          value={fieldContent}
          onChange={(e) => setFieldContent(e.target.value)}
          minLength={3}
        />
      </div>
      <Button className="w-20 self-center mt-2" onClick={createIField}>
        Créer
      </Button>
    </div>
  );
}
