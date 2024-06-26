"use client";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/_components/ui/context-menu";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { Project } from "@/type";
import { FileList } from "./list";
import { useFiles } from "@/app/_hooks/use-files";
import { FileForm } from "../../Form/file";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import useFileStore from "@/app/_store/files";

export const FilesCard = ({ project }: { project: Project }) => {
  const { handleUploadFile, navigateToBreadcrumb } = useFiles(project);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const { setFiles } = useFileStore();
  const breadcrumb = useStore(useFileStore, (state) => state.breadcrumb);
  const files = useStore(useFileStore, (state) => state.files);

  useEffect(() => {
    setFiles(project?.metadata?.files || []);
  }, [project]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => handleUploadFile(acceptedFiles),
    noClick: true,
  });

  return (
    <Card className="flex min-w-[400px] min-h-[400px] flex-col">
      <ContextMenu>
        <ContextMenuTrigger className="size-full p-5 items-center justify-center text-sm">
          <CardHeader className="w-full flex-row items-center h-fit pt-3 pb-0 px-3">
            <Breadcrumb>
              <BreadcrumbList className="cursor-pointer">
                <BreadcrumbLink onClick={() => navigateToBreadcrumb(0)}>
                  Files
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                {breadcrumb?.map((folder, index) => (
                  <>
                    <BreadcrumbLink
                      key={index}
                      onClick={() => navigateToBreadcrumb(index + 1)}
                    >
                      {folder.name}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ContextMenuContent className="w-64">
              <ContextMenuItem onSelect={() => setIsCreatingFolder(true)}>
                New Folder
              </ContextMenuItem>
              <ContextMenuItem onSelect={open}>Upload File</ContextMenuItem>
            </ContextMenuContent>
            {isCreatingFolder && (
              <FileForm callback={() => setIsCreatingFolder(false)} />
            )}
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
            </div>
            <div className="mt-4">
              {files.length === 0 ? (
                <p>No files or folders created yet.</p>
              ) : (
                <FileList project={project} />
              )}
            </div>
          </CardContent>
        </ContextMenuTrigger>
      </ContextMenu>
    </Card>
  );
};
