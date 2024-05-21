"use client";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import { useRouter } from "next/navigation";
import { projectSchema } from "@/consts/schemas";
import { Project } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Edit, Plus } from "lucide-react";

interface Props {
  user?: User;
  project?: Project;
}

export default function ProjectForm({ user, project }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      owner: project?.owner || user?.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      if (project) {
        const updatedProject = await updateProject(project.id, values);
        router.push(`/${updatedProject?.id}`);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const newProject = await createProject(values);
        router.push(`/${newProject?.id}`);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
    } catch (error) {
      console.error("Error creating/updating project:", error);
      toast({
        title: "Error",
        description: "Failed to create/update project",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        {project ? (
          <button className="flex px-2 pt-1 items-center">
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </button>
        ) : (
          <button className="w-full hover:bg-muted h-fit p-2 justify-start items-center rounded-md flex gap-2">
            <Plus className="size-4" />
            <span>Create Project</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Create Project"}
          </DialogTitle>
          <DialogDescription>
            {project ? "" : "Create Project"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4 w-11/12 mx-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <Input {...field} />
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <Input {...field} />
                    <FormMessage className="form-message" />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                className="text-secondary-foreground"
                type="submit"
              >
                {project ? "Update Project" : "Create Project"}
              </Button>
            </CardContent>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
