"use server";
import { Project } from "@prisma/client";
import prisma from "../prisma";
import { User } from "@supabase/supabase-js";

export async function createProject(data: any): Promise<Project> {
  try {
    const newProject = await prisma.project.create({
      data,
    });

    return newProject;
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }
}

export async function getUserProjects(owner: User) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        owner: owner.id,
      },
    });
    return projects;
  } catch (error) {
    throw new Error(`Error fetching user projects: ${error}`);
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    return project;
  } catch (error) {
    throw new Error(`Error fetching project by ID: ${error}`);
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });
    return updatedProject;
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
}

export async function deleteProject(id: string): Promise<Project | null> {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id },
    });
    return deletedProject;
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
}
