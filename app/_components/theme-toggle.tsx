import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export const SwitchMode = () => {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? "light" : "dark");
  };

  return (
    <Button variant={"ghost"} className="size-3 " onClick={toggleDarkMode}>
      <Switch checked={darkMode} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
