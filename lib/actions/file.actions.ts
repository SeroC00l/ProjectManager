"use server";
import { createClient } from "@/lib/supabase/server";

export async function uploadFile(formData: FormData) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error("Failed to authenticate user");
    }

    const userId = user?.id;
    const folder = formData.get("folder") as string;
    const file = formData.get("file") as File;

    const filePath = `${userId}-avatar`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from(folder)
      .upload(filePath, file, {
        upsert: true,
      });

    if (storageError) {
      throw new Error("Error uploading file: " + storageError);
    }

    const { data } = await supabase.storage
      .from(folder)
      .getPublicUrl(storageData.path);

    return data;
  } catch (error) {
    throw new Error("Error uploading file: " + error);
  }
}
