"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(values: any) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(values: any) {
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
  return redirect("/login")
}
