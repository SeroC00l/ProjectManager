"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  Provider,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";

export async function login(values: SignInWithPasswordCredentials) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function OAuth(provider: Provider) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (data.url) {
    redirect(data.url);
  }
  return error;
}

export async function signup(values: SignUpWithPasswordCredentials) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(values);

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export async function getSession() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  return redirect("/login");
}

export const updateUserAvatar = async (imageUrl: string) => {
  try {
    // Verificar que la URL sea válida
    new URL(imageUrl);
    const supabase = createClient();
    const { data: updateData, error: updateError } =
      await supabase.auth.updateUser({
        data: { user_metadata: { avatar_url: imageUrl } },
      });

    if (updateError) {
      throw updateError;
    }
    revalidatePath("/", "layout");
    return updateData.user;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw new Error("Error updating user avatar: Invalid URL format");
  }
};

export const updateUserBanner = async (imageUrl: string) => {
  const supabase = createClient();

  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data: { banner_url: imageUrl },
    });

  if (updateError) {
    throw updateError;
  }

  return updateData.user;
};

export const updateUserData = async (data: any) => {
  const supabase = createClient();

  const { data: updateData, error: updateError } =
    await supabase.auth.updateUser({
      data,
    });

  if (updateError) {
    throw updateError;
  }

  return updateData.user;
};