import { fetchProfile } from "@/services/profile.service";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const profile = await fetchProfile();

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your profile settings.</p>
      <div className="mt-6 max-w-2xl">
        <SettingsForm profile={profile} />
      </div>
    </div>
  );
}
