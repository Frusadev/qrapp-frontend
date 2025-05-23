"use client";

import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  MutableRefObject,
} from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgeCheck, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { requestViewAccessCode } from "@/lib/api/requests/accessCode";
import { toast } from "sonner";

interface RequestViewAccessPayload {
  access_code_id: string;
  password: string;
}

const QRCodeScannerDialog: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [password, setPassword] = useState("");

  const requestViewAccessCodeMutation = useMutation({
    mutationKey: ["access-code/access"],
    mutationFn: (payload: RequestViewAccessPayload) =>
      requestViewAccessCode(payload),
    onSuccess: () => {
      toast.success("Requête d'accès envoyée avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const scan = useCallback(() => {
    if (!isScanning) return;

    const video = webcamRef.current?.video as HTMLVideoElement | null;
    if (video && video.readyState === 4) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code?.data) {
        setQrData(code.data);
        setIsScanning(false);
        return;
      }
    }

    requestAnimationFrame(scan);
  }, [isScanning]);

  useEffect(() => {
    if (isScanning) scan();
  }, [isScanning, scan]);

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsScanning(open);
        if (!open) {
          setQrData(null);
          setPassword("");
        }
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="text-white">
                <QrCode />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span>Scanner un code d'accès</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-md rounded-2xl shadow-lg p-4">
        <DialogHeader>
          <DialogTitle className="text-xl">QR Code Scanner</DialogTitle>
          <DialogDescription>
            Point your camera at a QR code to scan.
          </DialogDescription>
        </DialogHeader>

        {!qrData && (
          <div className="rounded-xl overflow-hidden border shadow-inner my-4">
            <Webcam
              ref={webcamRef}
              mirrored
              className="w-full h-auto"
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
            />
          </div>
        )}

        {qrData && (
          <div className="space-y-4">
            <div className="mt-4 bg-amber-200 text-green-800 p-3 rounded-xl flex items-center gap-2">
              <BadgeCheck className="w-5 h-5" />
              <span className="select-none">Id: {qrData.slice(0, 20)}...</span>
            </div>
            <Input
              type="password"
              placeholder="Entrer le mot de passe de l'accès"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <div className="w-full flex justify-center">
              <Button
                onClick={() =>
                  requestViewAccessCodeMutation.mutate({
                    access_code_id: qrData,
                    password,
                  })
                }
              >
                Demander l'accès
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScannerDialog;
