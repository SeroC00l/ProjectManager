import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@supabase/supabase-js";
import { AvatarProps } from "@radix-ui/react-avatar";

interface Props extends AvatarProps {
  user: User;
}

const UserAvatar = ({ user, ...props }: Props) => {
  const imageUrl = user?.user_metadata?.avatar_url;
  const name = user?.user_metadata?.name;
  const initials = name
    ?.split(" ")
    .map((part: string) => part[0])
    .join("");

  return (
    <Avatar {...props}>
      <AvatarImage src={imageUrl} alt="@shadcn" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
