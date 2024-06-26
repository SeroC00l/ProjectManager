import { create } from "zustand";
import { FileItem } from "@/type";

type FileStore = {
  files: FileItem[];
  currentFolder: FileItem | null;
  breadcrumb: FileItem[];
  setFiles: (files: FileItem[]) => void;
  setCurrentFolder: (folder: FileItem | null) => void;
  setBreadcrumb: (breadcrumb: FileItem[]) => void;
  addBreadcrumbItem: (item: FileItem) => void;
  resetBreadcrumb: () => void;
};

const useFileStore = create<FileStore>((set) => ({
  files: [],
  currentFolder: null,
  breadcrumb: [],
  setFiles: (files) => set({ files }),
  setCurrentFolder: (folder) => set({ currentFolder: folder }),
  setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
  addBreadcrumbItem: (item) =>
    set((state) => ({ breadcrumb: [...state.breadcrumb, item] })),
  resetBreadcrumb: () => set({ breadcrumb: [] }),
}));

export default useFileStore;
