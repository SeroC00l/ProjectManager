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
import { OAuth, login, signup } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { authSchema } from "@/consts/schemas";
import { usePathname } from "next/navigation";
import { Provider } from "@supabase/supabase-js";

export default function AuthForm() {
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
        await login(values);
        toast({
          title: "Success",
          description: "User logged in successfully",
        });
      } else {
        await signup(values);
        toast({
          title: "Success",
          description: "User registered successfully",
        })
      }
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate user",
      });
    }
  };

  const handleOAuth = async (provider: Provider) => {
    try {
      await OAuth(provider);
    } catch (error) {
      console.error("Error al autenticar con OAuth:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate with OAuth",
      });
    }
  };

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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
            {isLogin ? (
              <Link href="/register" className="hover: ">
                Don't have an account? <span className="text-primary">Register</span>
              </Link>
            ) : (
              <Link href="/login" className="hover: ">
                Already have an account? <span className="text-primary">Login</span>
              </Link>
            )}
            <Button type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
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
      </form>
    </Form>
  );
}
