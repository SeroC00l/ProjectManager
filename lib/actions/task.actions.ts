"use server";
import { tasks } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Task } from "@/type";

export async function createTask(task: Task): Promise<Task | null> {
  try {
    const currentDate = new Date();
    const newTask = {
      ...task,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await db.insert(tasks).values(newTask);
    revalidatePath(`/${newTask.projectId}`);
    return newTask;
  } catch (error) {
    throw new Error(`Error creating task: ${error}`);
  }
}

export async function getProjectTasks(projectId: string): Promise<Task[]> {
  try {
    const tasksList = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId));

    return tasksList;
  } catch (error) {
    throw new Error(`Error fetching tasks for project: ${error}`);
  }
}

export async function getTaskById(id: string) {
  try {
    const task = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    return task[0] || null;
  } catch (error) {
    throw new Error(`Error fetching task by ID: ${error}`);
  }
}

export async function updateTask(task: Task): Promise<Task | null> {
  try {
    const currentDate = new Date();
    const updatedTask = {
      ...task,

      updatedAt: currentDate,
    };
    await db.update(tasks).set(updatedTask).where(eq(tasks.id, task.id));
    revalidatePath(`/${updatedTask.projectId}`);
    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task: ${error}`);
  }
}

export async function deleteTask(id: string) {
  try {
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    revalidatePath(`/${deletedTask.projectId}`);
    return deletedTask || null;
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}
