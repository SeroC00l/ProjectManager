import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Calendar, Columns2, List } from "lucide-react";
import { Project } from "@/type";
import { Board } from "@/app/_components/Board/";
import { getProjectTasks } from "@/lib/actions/task.actions";
import { TaskModal } from "@/app/_components/Modal/task-modal";
import { TasksCard } from "@/app/_components/Card/tasks-card";
import { CalendarCard } from "@/app/_components/Card/calendar";
import { FilesCard } from "./Card/Files";

export async function ProjectTabs({ project }: { project: Project }) {
  const tasks = await getProjectTasks(project.id);
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
        <TasksCard tasks={tasks} />
        <CalendarCard tasks={tasks}  />
        <FilesCard project={project}  />
      </TabsContent>

      <TabsContent
        value="board"
        className="h-full w-full relative overflow-scroll"
      >
        <Board initialTasks={tasks} initialColumns={project?.statuses || []} />
      </TabsContent>

      <TabsContent value="list">
        {/* Contenido del listado de tareas */}
      </TabsContent>
     
    </Tabs>
  );
}
