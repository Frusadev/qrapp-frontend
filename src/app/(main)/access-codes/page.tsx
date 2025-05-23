"use client";

import AccessCodeCard from "@/components/access-code/access-code-card";
import QRCodeScannerDialog from "@/components/camera/Scanner";
import Show from "@/components/providers/conditional/Show";
import { Spinner } from "@/components/ui/spinner";
import { getAccessedAccessCodes } from "@/lib/api/requests/accessCode";
import { useQuery } from "@tanstack/react-query";

export default function AccessCodesPage() {
  const accessedAccessCodesQuery = useQuery({
    queryKey: ["/access-codes/accessed"],
    queryFn: getAccessedAccessCodes,
  });

  return (
    <div
      className="flex flex-col w-full h-full
     items-center px-4 py-16
    "
    >
      <div className="flex w-full justify-center">
        <QRCodeScannerDialog />
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <Show _if={accessedAccessCodesQuery.isLoading}>
          <div className="flex w-full h-full justify-center">
            <Spinner />
          </div>
        </Show>
        <Show _if={accessedAccessCodesQuery.data?.length === 0}>
          <div className="flex w-full h-full justify-center items-center py-3">
            <p className="text-lg text-muted-foreground select-none">Aucun accès trouvé</p>
          </div>
        </Show>
        <div className="flex h-[500px] w-full flex-col p-4 items-center">
          {accessedAccessCodesQuery.data?.map((accessCode) => (
            <AccessCodeCard
              accessCode={accessCode}
              key={accessCode.access_code_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
