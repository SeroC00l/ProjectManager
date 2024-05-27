import { create } from "zustand";
import { Task, TaskStatus } from "@/type";

interface BoardState {
  tasks: Task[];
  columns: TaskStatus[];
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: TaskStatus[]) => void;
  addColumn: (column: TaskStatus) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  tasks: [],
  columns: [],
  setTasks: (tasks) => set({ tasks }),
  setColumns: (columns) => set({ columns }),
  addColumn: (column) =>
    set((state) => ({ columns: [...state.columns, column] })),
}));
