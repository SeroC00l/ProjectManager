import { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading: boolean;
}

export const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

LoadingButton.displayName = "LoadingButton";
