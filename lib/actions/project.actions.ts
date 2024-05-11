"use server";
import { projectSchema } from "@/consts/schemas";
import { z } from "zod";
import prisma from "../prisma";
import { User } from "@supabase/supabase-js";

export async function createProject(data: any) {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Devuelve los proyectos mapeados
    return projects;
  } catch (error) {
    // Maneja los errores si ocurren
    throw new Error(`Error fetching user projects: ${error}`);
  }
}
