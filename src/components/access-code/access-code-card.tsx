"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getFileURL } from "@/lib/api/requests/fileResource";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { AccessCodeDTO } from "@/lib/api/dto/accessCode";

interface AccessCodeCardProps {
  accessCode: AccessCodeDTO;
}

export default function AccessCodeCard({ accessCode }: AccessCodeCardProps) {
  const { proprietary, qrcode_resource_id, info_fields } = accessCode;

  const {
    data: qrCodeURL,
    isLoading: isQRCodeLoading,
    error: qrCodeError,
  } = useQuery<string, Error>({
    queryKey: ["fileURL", qrcode_resource_id],
    queryFn: () => {
      if (!qrcode_resource_id) throw new Error("No QR code ID provided");
      return getFileURL(qrcode_resource_id);
    },
    enabled: !!qrcode_resource_id,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: avatarURL,
    isLoading: isAvatarLoading,
    error: avatarError,
  } = useQuery<string, Error>({
    queryKey: ["fileURL", proprietary.avatar_id],
    queryFn: () => {
      if (!proprietary.avatar_id) throw new Error("No avatar ID provided");
      return getFileURL(proprietary.avatar_id);
    },
    enabled: !!proprietary.avatar_id,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Card
      className="relative flex flex-col items-start gap-6 p-6
      w-full max-w-md shadow-2xl rounded-2xl border border-gray-200
      bg-white"
    >
      {/* Profile */}
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 ring-2 ring-primary">
          {isAvatarLoading ? (
            <Skeleton className="w-20 h-20 rounded-full" />
          ) : (
            <>
              <AvatarImage
                src={avatarURL ?? undefined}
                alt={proprietary.first_name}
              />
              <AvatarFallback className="text-xl font-bold bg-muted text-muted-foreground">
                {proprietary.first_name?.[0] ?? "?"}
                {proprietary.last_name?.[0] ?? "?"}
              </AvatarFallback>
            </>
          )}
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-primary">
            {proprietary.first_name} {proprietary.last_name}
          </p>
          <p className="text-sm text-gray-500 italic">{proprietary.email}</p>
        </div>
      </div>

      {/* Info Fields */}
      {info_fields.length > 0 && (
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full text-left text-sm font-medium text-primary underline"
            >
              View Info Fields
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            {info_fields.map((field) => (
              <div
                key={field.field_id}
                className="text-sm flex justify-between items-center border-b pb-1 border-gray-200"
              >
                <span className="font-medium text-gray-700">{field.name}</span>
                <span className="text-gray-600">{field.value}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}
