import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Columns2, List, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Project, Task } from "@/type";

export function ProjectTabs({ project } : { project: Project }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <header className="w-full border-b">
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
      </header>

      <TabsContent
        value="overview"
        className="grid grid-cols-3 w-full p-10 gap-10"
      >
        <Card className="flex min-w-[400px] min-h-[400px] p-5">
          <CardHeader className="w-full flex-row items-center h-fit">
            <ListChecks className="size-4 mr-2" />
            <h4>Tasks</h4>
          </CardHeader>
          <CardContent>
        
          </CardContent>
        </Card>
        <Card className="flex min-w-[400px] min-h-[400px] p-5">Calendar</Card>
        <Card className="flex min-w-[400px] min-h-[400px] p-5">Files</Card>
      </TabsContent>
      <TabsContent value="board"></TabsContent>
      <TabsContent value="list"></TabsContent>
    </Tabs>
  );
}
