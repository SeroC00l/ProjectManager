"use client";
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
import { projectSchema } from "@/consts/schemas";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/actions/project.actions";

export default function ProjectForm(user: any) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      const projectWithOwner = { ...values, owner: user.user.id };
      await createProject(projectWithOwner);
      router.push("/");
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
      });
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
          <Button variant={"outline"} type="submit">
            Create Project
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}
