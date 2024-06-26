"use server";
import { db } from "../db";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createMessage(data: any): Promise<any | null> {
  try {
    const newMessage = {
      ...data,
    };
    await db.insert(messages).values(newMessage);
  } catch (error) {
    throw new Error(`Error creating message: ${error}`);
  }
}

export async function getMessages(projectId: string): Promise<any | null> {
  try {
    const messagesList = await db
      .select()
      .from(messages)
      .where(eq(messages.projectId, projectId));
    return messagesList;
  } catch (error) {
    throw new Error(`Error fetching messages: ${error}`);
  }
}
