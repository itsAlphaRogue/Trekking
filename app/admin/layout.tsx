import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin | Himalayan Vistas",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin-login");

  // Check role — this is the definitive server-side guard
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    // Sign out then redirect — they have a session but aren't admin
    await supabase.auth.signOut();
    redirect("/admin-login?error=not_admin");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8 md:p-10">{children}</main>
      </div>
    </div>
  );
}
