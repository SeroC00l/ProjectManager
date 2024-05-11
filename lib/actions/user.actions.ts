"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  Provider,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
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
