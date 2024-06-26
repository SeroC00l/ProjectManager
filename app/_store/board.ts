import { create } from "zustand";
import { Task, Status, Project } from "@/type";

interface BoardState {
  tasks: Task[];
  project: Project;
  columns: Status[];
  setProject: (project: Project) => void;
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: Status[]) => void;
  addColumn: (column: Status) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  tasks: [],
  project: {} as Project,
  columns: [],
  setProject: (project) => set({ project }),
  setTasks: (tasks) => set({ tasks }),
  setColumns: (columns) => set({ columns }),
  addColumn: (column) =>
    set((state) => ({ columns: [...state.columns, column] })),
}));
