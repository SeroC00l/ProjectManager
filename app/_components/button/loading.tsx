import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading: boolean;
}

export const LoadingButton = ({ children, loading, ...props }: Props) => {
  return (
    <Button
      {...props}
      className={cn(
        "text-primary-foreground dark:text-secondary-foreground",
        props.className
      )}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin text-primary-foreground dark:text-secondary-foreground" />
      ) : (
        children
      )}
    </Button>
  );
};
