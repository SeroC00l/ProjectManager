"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { LoadingButton } from "../button/loading"; 
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Modal } from ".";

interface Props {
  initialImageUrl?: string;
  triggerButton: React.ReactNode;
  title: string;
  alt: string;
  onSave: (file: File) => Promise<void>;
}

export const PhotoViewer = ({
  triggerButton,
  title,
  alt,
  initialImageUrl,
  onSave,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || "");
  const [Loading, setLoading] = useState(false);

  const triggerFileInput = () => {
    const fileInput = document.querySelector<HTMLInputElement>("#avatar-input");
    if (fileInput) fileInput.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleSaveImage = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }
      setLoading(true);
      await onSave(file);
      toast({
        title: "Success",
        duration: 2000,
        description: "Image saved successfully",
      });
    } catch (error) {
      console.log("Error saving image:", error);
      toast({
        title: "Error",
        duration: 2000,
        description: "There was an error saving the image.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={title} triggerButton={triggerButton}>
      <Image
        width={600}
        height={600}
        src={imageUrl}
        alt={alt}
        className="rounded-lg"
      />
      <LoadingButton
        onClick={handleSaveImage}
        loading={Loading}
        variant="default"
        className="w-full text-primary-foreground dark:text-secondary-foreground"
      >
        Save Image
      </LoadingButton>

      <input
        id="avatar-input"
        type="file"
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <Button
        onClick={triggerFileInput}
        variant="default"
        className="text-primary-foreground dark:text-secondary-foreground"
      >
        <Upload className="mr-2 h-4 w-4" />
        Change Photo
      </Button>
    </Modal>
  );
};
