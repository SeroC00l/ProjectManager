"use server";
import { createClient } from "@/lib/supabase/server";

export async function uploadFile(formData: FormData) {
  try {
    const supabase = createClient();
    const { error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error("Failed to authenticate user");
    }
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    let storage = supabase.storage.from(folder || "");

    const { data: storageData, error: storageError } = await storage.upload(
      file.name,
      file,
      { upsert: true }
    );

    if (storageError) {
      throw new Error("Error uploading file: " + storageError.message);
    }

    const { data } = await storage.getPublicUrl(storageData.path);
    return data;
  } catch (error) {
    throw new Error("Error uploading file: " + error);
  }
}

export async function deleteFile(path: string) {
  try {
    const supabase = createClient();
    const { error: userError } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("Failed to authenticate user");
    }
    const { data: storageData, error: storageError } = await supabase.storage
      .from("files")
      .remove([path]);
    if (storageError) {
      throw new Error(storageError.message);
    }
    return storageData;
  } catch (error) {
    throw new Error(error as string);
  }
}
