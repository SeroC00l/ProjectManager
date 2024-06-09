"use server";
import { projects } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Project, Status } from "@/type";

export async function createProject(project: Project): Promise<Project | null> {
  try {
    const currentDate = new Date();
    const newProject = {
      ...project,
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

export async function getUserProjects(owner: User): Promise<Project[]> {
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

export async function getProjectById(id: string): Promise<Project | null> {
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
      updatedAt: currentDate,
    };
    await db.update(projects).set(updatedProject).where(eq(projects.id, id));
    revalidatePath(`/${id}`, "layout");
    return updatedProject;
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
}

export async function deleteProject(id: string): Promise<Project | null> {
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

export async function addProjectStatus(
  projectId: string,
  newStatus: Status
): Promise<Status[]> {
  try {
    const project = await getProjectById(projectId);
    if (!project) {
      throw new Error(`Task with ID ${projectId} not found`);
    }

    const updatedStatuses = [...(project.statuses || []), newStatus];
    await db
      .update(projects)
      .set({ statuses: updatedStatuses, updatedAt: new Date() })
      .where(eq(projects.id, projectId));

    revalidatePath(`/${projectId}`);
    return updatedStatuses;
  } catch (error) {
    throw new Error(`Error adding task status: ${error}`);
  }
}

export async function getProjectStatuses(projectId: string): Promise<Status[]> {
  try {
    const project = await getProjectById(projectId);
    if (!project) {
      throw new Error(`Task with ID ${projectId} not found`);
    }

    return project.statuses || [];
  } catch (error) {
    throw new Error(`Error fetching task statuses: ${error}`);
  }
}