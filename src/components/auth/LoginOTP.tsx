"use client";

import { useEffect, useRef, useState } from "react";
import { OTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "@/lib/api/requests/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { count } from "console";

export default function LoginOTP({
  activated,
  setActivated,
  retryFn,
}: {
  activated: boolean;
  setActivated: (state: boolean) => void;
  retryFn: () => void;
}) {
  const SECOND = 1000;
  const [value, setValue] = useState("");
  const [hasGuessed, setHasGuessed] = useState<undefined | boolean>(undefined);
  const [errorMsg, setErrorMsg] = useState("Invalid code, please try again.");
  const [countdown, setCountdown] = useState(2 * 60 * 1000);
  const [remainingTime, setRemainingTime] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const useVerifyOTP = useMutation({
    mutationKey: ["/auth/verify-otp"],
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      setActivated(false);
      toast.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (e) => {
      setErrorMsg(e.message);
      setHasGuessed(false);
    },
  });

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
  }, [hasGuessed]);

  useEffect(() => {
    const tick = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - SECOND);
        const minutes = Math.floor(countdown / 60 / 1000);
        const seconds = Math.floor(countdown / 60 / 1000 - minutes);
        setRemainingTime(`${minutes}:${String(seconds).padStart(2, "0")}`);
      } else {
        clearInterval(tick);
      }
    }, 1000);
  }, [countdown]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();

    useVerifyOTP.mutate({
      code: value,
    });

    setValue("");
    setTimeout(() => {
      inputRef.current?.blur();
    }, 20);
  }

  return (
    <Dialog open={activated}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {hasGuessed ? "Code verified!" : "Enter confirmation code"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {hasGuessed
                ? "Your code has been successfully verified."
                : `Check your email`}
            </DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className="text-center">
            <DialogClose asChild>
              <Button type="button" ref={closeButtonRef}>
                Close
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <OTPInput
                id="cofirmation-code"
                ref={inputRef}
                value={value}
                onChange={setValue}
                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                maxLength={8}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
            </div>
            {hasGuessed === false && (
              <p
                className="text-muted-foreground text-center text-xs"
                role="alert"
                aria-live="polite"
              >
                {errorMsg}
              </p>
            )}
            <div className="flex justify-center">
              <Button onClick={() => retryFn()}>Resend code.</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
