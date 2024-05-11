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
import { ProjectFormProps } from "@/type";

export default function ProjectForm({ user, project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      console.log("hola");
      setLoading(true);
      const owner = user?.id || project?.owner;
      const projectWithOwner = { ...values, owner };
      if (project) {
        const updatedProject = await updateProject(
          project.id,
          projectWithOwner
        );
        router.push(`/${updatedProject?.id}`);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const newProject = await createProject(projectWithOwner);
        router.push(`/${newProject.id}`);
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
            className="text-secondary-foreground"
            type="submit"
          >
            {project ? "Update Project" : "Create Project"}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}
