"use client";
import { Folder, FileText, ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../ui/context-menu";
import { FileItem, Project } from "@/type";
import { useFiles } from "@/app/_hooks/use-files";
import { FileForm } from "../../Form/file-form";
import { useEffect, useState } from "react";
import useFileStore from "./store";
import useStore from "@/app/_store/useStore";

export const FileList = ({ project }: { project: Project }) => {
  const { navigateToFolder, handleDownload, handleDelete } = useFiles(project);
  const files = useStore(useFileStore, (state) => state.files);
  const currentFolder = useStore(useFileStore, (state) => state.currentFolder);
  const [displayFiles, setDisplayFiles] = useState<FileItem[] | null>(null);
  const [editingFolder, setEditingFolder] = useState(false);
  useEffect(() => {
    setDisplayFiles(currentFolder?.files || files || null);
  }, [currentFolder?.files || files]);

  return (
    <ul className="flex flex-col gap-4">
      {displayFiles?.map((file, index) => (
        <li
          key={index}
          onDoubleClick={() => file.type === "folder" && navigateToFolder(file)}
        >
          <ContextMenu>
            <ContextMenuTrigger className="flex items-center gap-2 cursor-pointer h-fit">
              {file.type === "folder" ? (
                <Folder className="size-10 text-primary" />
              ) : /\.(jpg|jpeg|png|gif|bmp)$/i.test(file.name) ? (
                file.publicUrl ? (
                  <Image
                    alt={file.name}
                    src={file.publicUrl}
                    width={30}
                    height={30}
                  />
                ) : (
                  <ImageIcon className="size-6" />
                )
              ) : (
                <FileText className="size-6" />
              )}
              {editingFolder ? (
                <FileForm
                  file={file}
                  callback={() => setEditingFolder(false)}
                />
              ) : file.type === "folder" ? (
                <p className="text-lg">{file.name}</p>
              ) : (
                <span>{file.name}</span>
              )}
              <ContextMenuContent className="w-64">
                <ContextMenuItem onSelect={() => setEditingFolder(true)}>
                  Rename {file.type === "folder" ? "Folder" : "File"}
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => handleDownload(file)}>
                  Download {file.type === "folder" ? "Folder" : "File"}
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => handleDelete(file)}>
                  Delete {file.type === "folder" ? "Folder" : "File"}
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenuTrigger>
          </ContextMenu>
        </li>
      ))}
    </ul>
  );
};
