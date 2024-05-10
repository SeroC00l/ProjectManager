"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login, signup } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { authSchema } from "@/consts/schemas";
import { usePathname, useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const isLogin = pathname === "/login";

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    try {
      if (isLogin) {
        const res = await login(values);
        toast({
          title: "Success",
          description: "User logged in successfully",
        });
        router.push("/");
      } else {
        const res = await signup(values);
        toast({
          title: "Success",
          description: "User registered successfully",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate user",
      });
    }
  };

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="items-center">
            <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 w-11/12 mx-auto">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
            {isLogin ? (
              <Link href="/register" className="hover: ">
                Don't have an account? Register
              </Link>
            ) : (
              <Link href="/login" className="hover: ">
                Already have an account? Login
              </Link>
            )}
            <Button variant={"outline"} type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Label className="mx-auto">or</Label>
            <div className="flex gap-6 mx-auto">
              <Button variant={"outline"} className="size-12">
                <FaGithub />
              </Button>
              <Button variant={"outline"} className="size-12">
                <FaGoogle />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
