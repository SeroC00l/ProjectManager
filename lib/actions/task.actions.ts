"use server";
import { taskStatuses, tasks } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { Task, TaskStatus } from "@/type";
import { revalidatePath } from "next/cache";

export async function createTask(data: any): Promise<Task | null> {
  try {
    const currentDate = new Date();
    const projectId = data.projectId;
    const statusName = data.status;
    const existingStatuses = await db
      .select()
      .from(taskStatuses)
      .where(
        and(
          eq(taskStatuses.projectId, projectId),
          eq(taskStatuses.name, statusName)
        )
      );
    if (existingStatuses.length === 0) {
      const newStatus = {
        name: statusName,
        color: data.color,
        projectId: projectId,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      await db.insert(taskStatuses).values(newStatus).returning();
    }

    const newTask = {
      ...data,
      status: statusName,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await db.insert(tasks).values(newTask);
    revalidatePath(`/${newTask?.projectId}`);
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

    const taskStatusesList = await db
      .select()
      .from(taskStatuses)
      .where(eq(taskStatuses.projectId, projectId));

    const tasksWithStatus = tasksList.map((task) => {
      const status = taskStatusesList.find(
        (status) => status.name === task.status
      );
      if (!status) {
        throw new Error(`Status not found for task ${task.id}`);
      }
      return {
        ...task,
        status: status,
      };
    });

    return tasksWithStatus;
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

export async function updateTask(id: string, data: any): Promise<Task | null> {
  try {
    const currentDate = new Date();
    const updatedTask = {
      ...data,
      id: id,
      updatedAt: currentDate,
    };
    await db.update(tasks).set(updatedTask).where(eq(tasks.id, id));
    revalidatePath(`/${updatedTask?.projectId}`);
    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task: ${error}`);
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
): Promise<Task | null> {
  try {
    const [updatedTask] = await db
      .update(tasks)
      .set({ status: status.name, updatedAt: new Date() })
      .where(eq(tasks.id, taskId))
      .returning();

    revalidatePath(`/${updatedTask?.projectId}`);
    return {
      ...updatedTask,
      status: status,
    };
  } catch (error) {
    throw new Error(`Error updating task status: ${error}`);
  }
}

export async function deleteTask(id: string) {
  try {
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    revalidatePath(`/${deletedTask?.projectId}`);
    return deletedTask || null;
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
}

export async function getTaskStatuses(
  projectId: string
): Promise<TaskStatus[]> {
  try {
    const taskStatusesList = await db
      .select()
      .from(taskStatuses)
      .where(eq(taskStatuses.projectId, projectId));
    return taskStatusesList;
  } catch (error) {
    throw new Error(`Error fetching task statuses: ${error}`);
  }
}

export async function createTaskStatus(data: any): Promise<TaskStatus | null> {
  try {
    const currentDate = new Date();
    const newTaskStatus = {
      ...data,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await db.insert(taskStatuses).values(newTaskStatus);
    revalidatePath(`/${data.projectId}`);
    return newTaskStatus;
  } catch (error) {
    throw new Error(`Error creating task status: ${error}`);
  }
}
