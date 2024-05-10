import { MainMenu } from "@/components/menu";
import Link from "next/link";

export default function Homepage() {
  return (
    <main>
      <header className="flex justify-between p-4 border-b">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-transparent bg-clip-text">
          <Link href="/">
            <h1 className="text-3xl font-bold">Project Manager</h1>
          </Link>
        </div>
        <MainMenu />
      </header>
    </main>
  );
}
