import { getSession } from "@/lib/actions/user.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: string }) {
  const user = await getSession()
  if (user) return redirect("/")
  return (
    <main className="max-w-[500px] mx-auto flex h-hull flex-col items-center justify-center">
      <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-transparent bg-clip-text py-14">
        <Link href="/">
          <h1 className="text-6xl font-bold">Project Manager</h1>
        </Link>
      </div>
      {children}
    </main>
  );
}
