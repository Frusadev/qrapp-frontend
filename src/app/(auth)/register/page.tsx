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
import { register as registerFn } from "@/lib/api/requests/auth";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/components/ui/logo";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const useRegister = useMutation({
    mutationKey: ["/auth/register"],
    mutationFn: registerFn,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (e) => {
      setError(true);
      setErrorMsg(e.message);
    },
  });

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useRegister.mutate({
      username: username,
      email: email,
      password: password,
      password_confirm: passwordConfirm,
      last_name: lastName,
      first_name: firstName,
    });
  };
  return (
    <form className="w-full overflow-scroll py-8" onSubmit={register}>
      <div className="grid w-full grow items-center px-4 sm:justify-center gap-y-4">
        <Card className="w-full sm:w-96">
          <CardHeader className="cursor-default">
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
              Create your account
            </CardTitle>
            <CardDescription>
              Welcome! Please fill in the details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                type="text"
                required
                placeholder="Type a username (ex. johndoe)"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>First name</Label>
              <Input
                type="text"
                required
                name="first_name"
                placeholder="Your first name (ex. Levi)"
                disabled={useRegister.isPending}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Last name</Label>
              <Input
                type="text"
                required
                name="last_name"
                placeholder="Your last name (ex. Ackerman)"
                disabled={useRegister.isPending}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Email address</Label>
              <Input
                type="email"
                required
                name="email"
                value={email}
                placeholder="example@email.yay"
                disabled={useRegister.isPending}
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
                placeholder="Type a password (8+ characters)"
                name="password"
                value={password}
                disabled={useRegister.isPending}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm password</Label>
              <Input
                type="password"
                required
                placeholder="Confirm your password"
                name="password_confirm"
                value={passwordConfirm}
                disabled={useRegister.isPending}
                onChange={(e) => {
                  setPasswordConfirm(e.currentTarget.value);
                  setError(false);
                }}
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button type="submit" disabled={useRegister.isPending}>
                {useRegister.isPending ? (
                  <Spinner className="stroke-background" size={"small"} />
                ) : null}
                Continue
              </Button>
              <Button variant="link" size="sm" asChild>
                <Link href="/login">Already have an account? Login</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
