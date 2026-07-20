"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { upsertProfile } from "@/services/profile.service";
import { createClient } from "@/lib/supabase/client";

interface Props {
  userId: string;
  userEmail: string;
  profile: Profile | null;
}

export default function SettingsForm({ userId, userEmail, profile }: Props) {
  const router = useRouter();
  const { addToast } = useToast();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertProfile(userId, {
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      });
      addToast({ title: "Profile saved", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Failed to save profile",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange() {
    // Supabase handles password reset via email
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail);
      if (error) throw error;
      addToast({ title: "Password reset email sent", variant: "success" });
    } catch (err) {
      addToast({
        title: "Failed to send reset email",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    try {
      const { error } = await supabase.rpc("delete_user");
      if (error) throw error;
      addToast({ title: "Account deleted", variant: "success" });
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      addToast({
        title: "Failed to delete account",
        description:
          err instanceof Error
            ? err.message
            : "Account deletion may not be available. Contact support.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Profile section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your public profile information.</p>
        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio about yourself"
              rows={3}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </form>
      </Card>

      <Separator />

      {/* Account section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account settings.</p>
        <div className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label>Email</Label>
            <p className="text-sm">{userEmail}</p>
          </div>
          <Button variant="outline" onClick={handlePasswordChange}>
            <Icons.KeyRound className="mr-2 h-4 w-4" />
            Change password
          </Button>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive" type="button">
                  <Icons.Trash2 className="mr-2 h-4 w-4" />
                  Delete account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete account</DialogTitle>
                  <DialogDescription>
                    This action is permanent and cannot be undone. All pages, data, and
                    uploaded files will be deleted.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="deleteConfirm">
                    Type <span className="font-bold">DELETE</span> to confirm
                  </Label>
                  <Input
                    id="deleteConfirm"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    disabled={deleteConfirm !== "DELETE" || deleting}
                    onClick={handleDeleteAccount}
                  >
                    {deleting && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete my account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      <Separator />

      {/* API / Export section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold">API & Export</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Programmatic access and data export coming soon.
        </p>
        <div className="mt-4">
          <Button variant="outline" disabled>
            <Icons.Download className="mr-2 h-4 w-4" />
            Export data
          </Button>
        </div>
      </Card>
    </div>
  );
}
