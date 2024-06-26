import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@supabase/supabase-js";
import { Member, Sender } from "@/type";
import { AvatarProps } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface Props extends AvatarProps {
  user: User | Sender | Member;
}

const UserAvatar = ({ user, className, ...props }: Props) => {
  const imageUrl =
    (user as User)?.user_metadata?.avatar_url || (user as Sender)?.avatarUrl;
  const name =
    (user as User)?.user_metadata?.name ||
    (user as Sender | Member)?.name ||
    "No User Name";
  const splitName = name.split(" ");
  let initials = "";

  if (splitName.length > 1) {
    initials = splitName[0][0] + splitName[splitName.length - 1][0];
  } else {
    initials = name.slice(0, 2);
  }

  const sizeClassName = className?.split(" ").find(cls => cls.startsWith("size-")) || "";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar {...props} className={className}>
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback className={`${sizeClassName} text-xs`}>{initials.toUpperCase()}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserAvatar