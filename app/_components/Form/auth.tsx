"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useAuthForm } from "@/app/_hooks/use-auth-form";
import { Form, Input } from ".";
import { authSchema } from "@/constants/schemas";
import { LoadingButton } from "../button/loading";
import { Label } from "../ui/label";

interface Props {
  type: "login" | "register";
}

export default function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const { loading, defaultValues, onSubmit, handleOAuth } =
    useAuthForm(isLogin);

  return (
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-11/12 mx-auto">
        <Form
          className="flex flex-col gap-4 w-11/12 mx-auto"
          schema={authSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          {!isLogin && <Input name="name" label="Name" />}
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
          <div>
            {isLogin ? (
              <Link href="/register" className="hover: ">
                Don't have an account?{" "}
                <span className="text-primary">Register</span>
              </Link>
            ) : (
              <Link href="/login" className="hover: ">
                Already have an account?{" "}
                <span className="text-primary">Login</span>
              </Link>
            )}
          </div>
          <LoadingButton loading={loading}>
            {isLogin ? "Login" : "Register"}
          </LoadingButton>
        </Form>
        <Label className="mx-auto">or</Label>
        <div className="flex gap-6 mx-auto">
          <Button
            variant={"outline"}
            className="size-12"
            onClick={() => handleOAuth("github")}
          >
            <FaGithub />
          </Button>
          <Button
            variant={"outline"}
            className="size-12"
            onClick={() => handleOAuth("google")}
          >
            <FaGoogle />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
