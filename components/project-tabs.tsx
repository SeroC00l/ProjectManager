import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Columns2, List, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Project } from "@/type";
import { Board } from "./board";
import { getProjectTasks, getTaskStatuses } from "@/lib/actions/task.actions";
import { TaskModal } from "./Modal/task-modal";
import { useBoardStore } from "@/app/_store/store";
import { useStore } from "zustand";

export async function ProjectTabs({ project }: { project: Project }) {
  const tasks = await getProjectTasks(project.id);
  const statuses = await getTaskStatuses(project.id);

  return (
    <Tabs defaultValue="overview" className="w-full h-full">
      <header className="w-full flex border-b justify-between">
        <TabsList className="grid w-fit grid-cols-3 bg-transparent">
          <TabsTrigger value="overview" className="gap-2">
            <Calendar className="size-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="board" className="gap-2">
            <Columns2 className="size-4" />
            <span>Board</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <List className="size-4" />
            <span>List</span>
          </TabsTrigger>
        </TabsList>
        <TaskModal />
      </header>

      <TabsContent
        value="overview"
        className="grid grid-cols-3 w-full gap-10 px-4"
      >
        <Card className="flex flex-col min-w-[400px] min-h-[400px] p-5">
          <CardHeader className="w-full flex-row items-center h-fit">
            <ListChecks className="size-4 mr-2" />
            <h4>Tasks</h4>
          </CardHeader>
          <CardContent>
            {tasks.map((task) => (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary-foreground"></div>
                  <span>{task.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary-foreground"></div>
                  <span>{task.status.name}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="flex min-w-[400px] min-h-[400px] p-5">Calendar</Card>
        <Card className="flex min-w-[400px] min-h-[400px] p-5">Files</Card>
      </TabsContent>

      <TabsContent
        value="board"
        className="h-full w-full relative overflow-scroll"
      >
        <Board initialTasks={tasks} initialColumns={statuses} />
      </TabsContent>

      <TabsContent value="list">
        {/* Contenido del listado de tareas */}
      </TabsContent>
    </Tabs>
  );
}
