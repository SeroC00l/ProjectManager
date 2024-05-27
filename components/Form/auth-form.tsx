"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useAuthForm } from "@/hooks/use-auth-form";
import { Form } from ".";
import { authSchema } from "@/consts/schemas";
import { LoadingButton } from "../Button/loading-button";
import { Label } from "../ui/label";

export default function AuthForm({type}: {type: "login" | "register"}) {
  const isLogin = type === "login";
  const { loading, defaultValues, onSubmit, handleOAuth } =
    useAuthForm(isLogin);

  return (
    <Card  className="w-full" >
      <CardHeader className="items-center">
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-11/12 mx-auto">
        <Form
          schema={authSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          {!isLogin && <Input name="name" label="Name" />}
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
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
