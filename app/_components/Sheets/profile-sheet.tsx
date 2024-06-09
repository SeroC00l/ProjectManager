import * as Icons from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import UserAvatar from "../user-avatar";
import { Provider, User } from "@supabase/supabase-js";
import { PhotoViewer } from "../Modal/photo-viewer";
import { Button } from "../ui/button";
import { updateUserAvatar, updateUserData } from "@/lib/actions/user.actions";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import Image from "next/image";
import { uploadFile } from "@/lib/actions/file.actions";
import { Form } from "../Form";
import { Textarea } from "../Form/text-area";
import { profileSchema } from "@/constants/schemas";
import { Input } from "../Form/input";
import { z } from "zod";
import { UserIcon } from "lucide-react";

const providerIconMap: { [key: string]: React.ElementType } = {
  github: Icons.FaGithub,
  google: Icons.FaGoogle,
  facebook: Icons.FaFacebook,
  twitter: Icons.FaTwitter,
  email: Icons.FaEnvelope,
};

export const ProfileSheet = ({ user }: { user: User }) => {
  console.log(user);

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const updatedUser = await updateUserData(values);
      if (updatedUser) {
        toast({
          title: "Success",
          duration: 2000,
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.log("Error updating user data:", error);
      toast({
        title: "Error",
        duration: 2000,
        description: "There was an error updating your profile.",
      });
    }
  };

  const handleSaveAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "avatars");
      const data = await uploadFile(formData);
      if (data) {
        await updateUserAvatar(data.publicUrl);
        toast({
          title: "Success",
          duration: 2000,
          description: "Profile photo updated successfully",
        });
      }
      toast({
        title: "Success",
        duration: 2000,
        description: "Profile photo updated successfully",
      });
    } catch (error) {
      console.log("Error updating user avatar:", error);
      toast({
        title: "Error",
        duration: 2000,
        description: "There was an error updating your profile photo.",
      });
    }
  };

  const defaultValues = {
    name: user?.user_metadata?.name || "",
    description: user?.user_metadata?.description || "",
  };

  const getProviderIcon = (provider: Provider) => {
    const IconComponent = providerIconMap[provider.toLowerCase()];
    return IconComponent ? (
      <IconComponent className="h-4 w-4" />
    ) : (
      <Icons.FaUser className="h-4 w-4" />
    );
  };

  return (
    <Sheet>
      <SheetTrigger className="flex px-2 py-1 hover:bg-muted justify-start m-0 items-center w-full text-sm">
        <UserIcon className="mr-2 size-4" />
        Edit profile
        <DropdownMenuShortcut>⇧⌘p</DropdownMenuShortcut>
      </SheetTrigger>
      <SheetContent className="p-0 w-[700px] border-0">
        <SheetHeader className="mb-10">
          <SheetTitle>Edit your profile</SheetTitle>
        </SheetHeader>

        <div className="absolute top-0 h-40 w-full bg-gray-800"></div>
        <PhotoViewer
          onSave={handleSaveAvatar}
          title="Your Profile Photo"
          alt="Your profile photo"
          initialImageUrl={user?.user_metadata?.user_metadata?.avatar_url}
          triggerButton={
            <div className="relative group flex items-center size-40 mx-auto justify-center">
              <UserAvatar user={user} className="size-40" />
              <div className="absolute text-gray-300 size-40 flex flex-col items-center justify-center cursor-pointer bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icons.FaImage className="size-10 " />
                <span>view photo</span>
              </div>
            </div>
          }
        ></PhotoViewer>
        <Form
          onSubmit={handleSubmit}
          schema={profileSchema}
          defaultValues={defaultValues}
          className="flex flex-col p-5 gap-5 group"
        >
          <Input
            name="name"
            autoFocus={false}
            className="cursor-pointer text-4xl flex text-center gap-2 border-0 outline-none"
          />
          <Label>Email</Label>
          <h4>{user?.user_metadata?.email}</h4>
          <Label className="mb-2">Providers</Label>

          <div className="flex w-full items-center gap-4">
            {user?.app_metadata?.providers?.map((provider: Provider) => (
              <div className="flex items-center gap-2" key={provider}>
                {getProviderIcon(provider)}
                <span>{provider}</span>
              </div>
            ))}
          </div>

          <Label className="mb-2">Description</Label>
          <Textarea
            autoFocus={false}
            name="description"
            className="cursor-pointer w-full border-none resize-none"
            placeholder="Write your description here"
          />
          <Button
            variant="default"
            className="w-fit mx-auto text-primary-foreground dark:text-secondary-foreground hidden group-focus-within:block"
          >
            Save changes
          </Button>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
