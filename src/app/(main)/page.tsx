"use client";
import AccessCodePreview from "@/components/access-code/access-code-preview";
import InfofieldPreview from "@/components/infofield/infofield-preview";
import Show from "@/components/providers/conditional/Show";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import UserCreditsCount from "@/components/ui/user-credits";
import { AccessCodeDTO } from "@/lib/api/dto/accessCode";
import { getAccessCodes } from "@/lib/api/requests/accessCode";
import { getFileURL } from "@/lib/api/requests/fileResource";
import { getCurrentUser } from "@/lib/api/requests/user";
import { useQuery } from "@tanstack/react-query";
import { Box, Lock, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentAccessCodeResourceId, setCurrentAccessCodeResourceId] =
    useState<string | undefined>("");
  const useAccessCodes = useQuery({
    queryKey: ["/access-codes"],
    queryFn: getAccessCodes,
  });
  const useGetCurrentUser = useQuery({
    queryKey: ["/me"],
    queryFn: getCurrentUser,
  });

  const [accessQrCode, setAccessQrCode] = useState<string | null>(null);
  const [currentAccessCode, setCurrentAccessCode] =
    useState<AccessCodeDTO | null>(null);

  useEffect(() => {
    if (useAccessCodes.data && useAccessCodes.data.length > 0) {
      const accessCode = useAccessCodes.data[0];
      setCurrentAccessCodeResourceId(accessCode.qrcode_resource_id);
      setCurrentAccessCode(accessCode);
    }
  }, [useAccessCodes.data]);

  useEffect(() => {
    const fetchQrCode = async () => {
      if (currentAccessCodeResourceId) {
        const fileURL = await getFileURL(currentAccessCodeResourceId);
        setAccessQrCode(fileURL);
      } else {
        setAccessQrCode(null);
      }
    };
    fetchQrCode();
  }, [currentAccessCodeResourceId]);

  return (
    <div className="w-full h-full flex flex-col relative">
      <UserCreditsCount
        isLoading={useGetCurrentUser.isLoading}
        count={useGetCurrentUser.data?.credits}
      />
      <div
        className="w-full h-[425px] flex justify-center
        items-center"
      >
        <div className="w-full flex items-center justify-center">
          <Show _if={useAccessCodes.isLoading}>
            <Skeleton className="w-[300px] h-[300px] rounded-md" />
          </Show>
          <Show _if={useAccessCodes.data?.length === 0}>
            <div
              className="w-[300px] h-[300px] rounded-md bg-slate-200
              flex items-center justify-center select-none"
            >
              <p className="text-slate-500">Aucun accès trouvé</p>
            </div>
          </Show>
          <Show
            _if={
              useAccessCodes.data != undefined && useAccessCodes.data.length > 0
            }
          >
            {accessQrCode ? (
              <Image
                src={accessQrCode}
                alt="QR Code"
                width={300}
                height={300}
                className="rounded-md border border-border shadow-xl"
              />
            ) : (
              <Skeleton className="w-[300px] h-[300px] rounded-md" />
            )}
          </Show>
        </div>
      </div>
      <div className="flex flex-col px-4">
        <Show _if={(useAccessCodes.data?.length ?? 0) > 0}>
          <div className="w-full flex justify-center my-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-full font-medium text-center cursor-default"
                >
                  Champs associés
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[150px]">
                <Show _if={currentAccessCode?.info_fields.length === 0}>
                  <p className="text-slate-500">Aucun champ extra associé</p>
                </Show>
                {currentAccessCode?.info_fields.map((infofield) => (
                  <InfofieldPreview
                    infofield={infofield}
                    key={infofield.field_id}
                  />
                ))}
              </HoverCardContent>
            </HoverCard>
          </div>
        </Show>
        <div className="w-full flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full w-[40px] h-[40px]">
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-[150px]">
              <Link
                href={"/access-code/new/basic"}
                className={`${buttonVariants({ variant: "ghost" })}`}
              >
                <Box />
                Basic
              </Link>
              <Link
                href={"/access-code/new/secure"}
                className={`${buttonVariants({ variant: "ghost" })}`}
              >
                <Lock />
                Secure
              </Link>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-full max-h-[300px] overflow-y-auto pb-24 gap-4 sm:items-center mt-4">
          {useAccessCodes.data?.map((accessCode) => (
            <AccessCodePreview
              key={accessCode.access_code_id}
              accessCode={accessCode}
              currentResourceIdStateSetter={setCurrentAccessCodeResourceId}
              currentAccessCodeSetter={setCurrentAccessCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
