import Link from "next/link";
import { MainMenu } from "./menu";

export const Header = async ({ user }: any) => {
  return (
    <header className="flex justify-between p-2 h-14 border-b">
      <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-transparent bg-clip-text">
        <Link href="/">
          <h1 className="text-3xl font-bold">Project Manager</h1>
        </Link>
      </div>
      <MainMenu user={user} />
    </header>
  );
};
