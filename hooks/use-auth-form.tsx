"use client";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { login, signup, OAuth } from "@/lib/actions/user.actions";
import { authSchema } from "@/consts/schemas";
import { Provider } from "@supabase/supabase-js";

export const useAuthForm = (isLogin: boolean) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
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
        });
      }
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate user",
      });
    } finally {
      setLoading(false);
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

  return { loading, defaultValues, onSubmit, handleOAuth };
};
