"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login as loginFn } from "@/lib/api/requests/auth";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import LoginOTP from "@/components/auth/LoginOTP";
import Unauthenticated from "@/components/providers/conditional/Unauthenticated";
import Logo from "@/components/ui/logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [otpShow, setOtpShow] = useState(false);

  const useLogin = useMutation({
    mutationKey: ["/auth/login"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      toast.message(data.message);
      setOtpShow(true);
    },
    onError: (e) => {
      setError(true);
      setErrorMsg(e.message);
    },
  });

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useLogin.mutate({
      email: email,
      password: password,
    });
  };
  const retry = () => {
    useLogin.mutate({
      email: email,
      password: password,
    });
  };

  return (
    <form className="w-full" onSubmit={login}>
      <LoginOTP activated={otpShow} setActivated={setOtpShow} retryFn={retry} />
      <div className="grid w-full grow items-center px-4 sm:justify-center gap-y-4">
        <Card className="w-full sm:w-96">
          <CardHeader>
            <Logo />
            {error ? (
              <Alert
                variant={"destructive"}
                className="py-4 border-destructive/30 bg-destructive/10"
              >
                <X className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            ) : null}
            <CardTitle className="cursor-default">
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Welcome back! Please enter your credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-4">
            <div className="space-y-2">
              <Label>Email address</Label>
              <Input
                type="email"
                required
                name="email"
                value={email}
                disabled={useLogin.isPending}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                required
                placeholder="Enter your password"
                name="password"
                disabled={useLogin.isPending}
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button type="submit" disabled={useLogin.isPending}>
                {useLogin.isPending ? (
                  <Spinner className="stroke-background" size={"small"} />
                ) : null}
                Login
              </Button>
              <div className="flex flex-col justify-between w-full gap-y-2">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 justify-center"
                  asChild
                >
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
                <Separator />
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 justify-center"
                  asChild
                >
                  <Link href="/register">Don't have an account? Register</Link>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
