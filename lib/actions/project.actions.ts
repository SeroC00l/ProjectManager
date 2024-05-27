"use server";
import { projects } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { Project } from "@/type";
import { revalidatePath } from "next/cache";

export async function createProject(data: any): Promise<Project | null> {
  try {
    const currentDate = new Date();
    const newProject = {
      id: uuidv4(),
      ...data,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await db.insert(projects).values(newProject);
    revalidatePath("/");
    return newProject;
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }
}

export async function getUserProjects(owner: User) {
  try {
    const projectsList = await db
      .select()
      .from(projects)
      .where(eq(projects.owner, owner.id));
    return projectsList;
  } catch (error) {
    throw new Error(`Error fetching user projects: ${error}`);
  }
}

export async function getProjectById(id: string): Promise<any | null> {
  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return project[0] || null;
  } catch (error) {
    throw new Error(`Error fetching project by ID: ${error}`);
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const currentDate = new Date();
    const updatedProject = {
      ...data,
      id: id,
      updatedAt: currentDate,
    };
    await db.update(projects).set(updatedProject).where(eq(projects.id, id));
    revalidatePath("/");
    return updatedProject;
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
}

export async function deleteProject(id: string): Promise<any | null> {
  try {
    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return deletedProject[0] || null;
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
}