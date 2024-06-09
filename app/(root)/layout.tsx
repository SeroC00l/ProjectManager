import { Header } from "@/app/_components/header";
import { Sidebar } from "@/app/_components/sidebar";
import { getUserProjects } from "@/lib/actions/project.actions";
import { getSession } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }: { children: string }) {
  const user = await getSession();
  if (user) {
  } else {
    redirect("/login");
  }
  const projects = await getUserProjects(user)
  return (
    <>
      <Header user={user} />
      <main id="main" className="flex h-[calc(100vh-56px)]">
        <Sidebar projects={projects} user={user} />
        {children}
      </main>
    </>
  );
}
