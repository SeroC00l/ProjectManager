"use client";
import { updateProject } from "@/lib/actions/project.actions";
import { uploadFile, deleteFile } from "@/lib/actions/file.actions";
import { FileItem, Project } from "@/type";
import { folderSchema } from "@/constants/schemas";
import { z } from "zod";
import { useStore } from "zustand";
import { toast } from "../_components/ui/use-toast";
import { useParams } from "next/navigation";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import useFileStore from "../_store/files";

export const useFiles = (project?: Project) => {
  const {
    setFiles,
    setCurrentFolder,
    setBreadcrumb,
    addBreadcrumbItem,
    resetBreadcrumb,
  } = useFileStore();
  const { id } = useParams();
  const breadcrumb = useStore(useFileStore, (state) => state.breadcrumb);
  const files = useStore(useFileStore, (state) => state.files);
  const currentFolder = useStore(useFileStore, (state) => state.currentFolder);

  const navigateToFolder = (folder: FileItem | null) => {
    if (folder) {
      addBreadcrumbItem(folder);
    } else {
      resetBreadcrumb();
    }
    setCurrentFolder(folder);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === 0) {
      resetBreadcrumb();
      setCurrentFolder(null);
    } else {
      const newBreadcrumb = breadcrumb.slice(0, index);
      setCurrentFolder(newBreadcrumb[newBreadcrumb.length - 1]);
      setBreadcrumb(newBreadcrumb);
    }
  };

  const handleUploadFile = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    let updatedFiles = [...files];
    let folderPath = `/files/${project?.id}`;
    if (currentFolder) {
      folderPath += `/${currentFolder.name}`;
    }
    formData.append("folder", folderPath);
    try {
      const response = await uploadFile(formData);
      const newFileItem: FileItem = {
        name: acceptedFiles[0].name,
        publicUrl: response.publicUrl,
        type: "file",
      };
      if (currentFolder) {
        currentFolder.files?.push(newFileItem);
      } else {
        updatedFiles.push(newFileItem);
      }
      setFiles(updatedFiles);
      await updateProject(id.toString(), { metadata: { files: updatedFiles } });
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to upload file: ${error}`,
      });
    }
  };

  const handleCreateFolder = async (values: z.infer<typeof folderSchema>) => {
    const folderName = values.folderName;
    if (folderName.trim() === "") return;
    const newFolder: FileItem = { name: folderName, type: "folder", files: [] };
    const currentFolderIndex = files.findIndex(
      (f) => f.name === currentFolder?.name
    );
    let updatedFiles = [...files];
    if (currentFolder) {
      updatedFiles[currentFolderIndex].files?.push(newFolder);
    } else {
      updatedFiles = [...files, newFolder];
    }
    setFiles(updatedFiles);
    await updateProject(id.toString(), { metadata: { files: updatedFiles } });
    toast({
      title: "Success",
      description: "Folder created successfully",
    });
  };

  const handleRenameFolder = async (file: FileItem, newName: string) => {
    let updatedFiles = [...files];
    updatedFiles[files.findIndex((f) => f.name === file.name)].name = newName;
    setFiles(updatedFiles);
    await updateProject(id.toLocaleString(), {
      metadata: { files: updatedFiles },
    });
    toast({
      title: "Success",
      description: "Folder renamed successfully",
    });
  };

  const handleDownload = async (file: FileItem) => {
    if (file.type === "folder") {
      try {
        const zip = new JSZip();
        const folder = zip.folder(file.name);
        if (!folder) {
          throw new Error("Failed to create folder in zip");
        }
        await addFilesToZip(folder, file.files || []);
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${file.name}.zip`);
        toast({
          title: "Success",
          description: "Folder downloaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to download folder: ${error}`,
        });
      }
    } else {
      if (!file.publicUrl) {
        toast({
          title: "Error",
          description: "File not found",
        });
        return;
      }
      try {
        const response = await fetch(file.publicUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to download file: ${error}`,
        });
      }
    }
  };

  const addFilesToZip = async (zipFolder: JSZip, files: FileItem[]) => {
    for (const file of files) {
      if (file.type === "folder") {
        const folder = zipFolder.folder(file.name);
        if (!folder) {
          throw new Error("Failed to create folder in zip");
        }
        await addFilesToZip(folder, file.files || []);
      } else {
        const response = await fetch(file.publicUrl || "");
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }
        const blob = await response.blob();
        zipFolder.file(file.name, blob);
      }
    }
  };

  const handleDelete = async (file: FileItem) => {
    let path = `/${id}`;
    if (currentFolder) {
      path += `/${currentFolder.name}`;
    }
    path += `/${file.name}`;
    if (!file.publicUrl) return;
    await deleteFile(path);
    let updatedFiles = [...files];
    updatedFiles = updatedFiles.filter((f) => f.name !== file.name);
    setFiles(updatedFiles);
    await updateProject(id.toString(), { metadata: { files: updatedFiles } });
    toast({
      title: "Success",
      description: `${file.type === "file" ?  "File" : "Folder"} ${file.name} deleted successfully`,
    });
  };

  return {
    files,
    setFiles,
    currentFolder,
    breadcrumb,
    setCurrentFolder,
    navigateToFolder,
    navigateToBreadcrumb,
    handleUploadFile,
    handleCreateFolder,
    handleRenameFolder,
    handleDownload,
    handleDelete,
  };
};
