"use client";
import React, { useState } from "react";
import { Camera, Headphones, PhoneCall, Video } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { createPortal } from "react-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { FaMicrophone } from "react-icons/fa";

export const Call = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <Video className="size-5" />
            </TooltipTrigger>
            <TooltipContent>Video Call</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <PhoneCall className="size-4" />
            </TooltipTrigger>
            <TooltipContent>Start Call</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {open &&
        createPortal(
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 z-50">
            <Card className="w-[700px] h-[120px]">
              <div className="absolute top-2 left-2 z-10 size-4 rounded-full bg-secondary" />
              <CardHeader>
                <h4>Project Call Room</h4>
              </CardHeader>
              <CardContent className="flex items-center justify-center gap-4">
                <FaMicrophone className="size-5" />
                <Headphones className="size-6 " />
                <Camera className="size-6 " />
              </CardContent>
            </Card>
          </div>,
          document.body
        )}
    </>
  );
};

