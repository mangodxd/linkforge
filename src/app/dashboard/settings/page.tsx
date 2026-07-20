import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fetchProfile } from "@/services/profile.service";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const profile = await fetchProfile(user.id);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account and profile settings.</p>
      <div className="mt-6 max-w-2xl">
        <SettingsForm userId={user.id} userEmail={user.email ?? ""} profile={profile} />
      </div>
    </div>
  );
}
