"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setAccessCodePassword } from "@/lib/api/requests/accessCode";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PwdSetPage() {
  const { token } = useParams();
  const router = useRouter()
  const useSetAccessCodePassword = useMutation({
    mutationKey: [`access-code/pwd-set/${token?.toString()}`],
    mutationFn: setAccessCodePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Mot de passe défini avec succès !");
      setTimeout(() => {
        router.push("/")
      }, 1000)
    },
  });
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");
  return (
    <div
      className="w-full h-full flex items-center
    justify-center flex-col"
    >
      <Card>
        <CardHeader>
          <CardTitle>Définir le mot de passe du code d'accès</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-[300px] gap-2 items-center">
            <Input
              placeholder="Mot de passe"
              value={pwd}
              type="password"
              onChange={(e) => setPwd(e.currentTarget.value)}
            />
            <Input
              placeholder="Confirmer le mot de passe"
              type="password"
              value={pwdConf}
              onChange={(e) => setPwdConf(e.currentTarget.value)}
            />
            <Button
              className="w-[150px]"
              onClick={() => {
                useSetAccessCodePassword.mutate({
                  token: token?.toString(),
                  pwdData: {
                    password: pwd,
                    password_confirm: pwdConf,
                  },
                });
              }}
            >
              Soumettre
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
