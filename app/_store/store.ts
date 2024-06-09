import { create } from "zustand";
import { Task, Status } from "@/type";

interface BoardState {
  tasks: Task[];
  columns: Status[];
  setTasks: (tasks: Task[]) => void;
  setColumns: (columns: Status[]) => void;
  addColumn: (column: Status) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  tasks: [],
  columns: [],
  setTasks: (tasks) => set({ tasks }),
  setColumns: (columns) => set({ columns }),
  addColumn: (column) =>
    set((state) => ({ columns: [...state.columns, column] })),
}));
