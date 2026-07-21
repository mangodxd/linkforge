"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { upsertProfile } from "@/services/profile.service";

interface Props {
  profile: Profile | null;
}

export default function SettingsForm({ profile }: Props) {
  const router = useRouter();
  const { addToast } = useToast();

  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url ?? "");
  const [avatarError, setAvatarError] = useState(false);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertProfile({
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

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden p-6">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />
        <h2 className="text-lg font-semibold font-heading">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your public profile information.</p>
        <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
          <div className="flex items-start gap-6">
            <div className="relative shrink-0">
              {avatarPreview && !avatarError ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-16 w-16 rounded-full border object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Icons.User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => {
                  setAvatarUrl(e.target.value);
                  setAvatarPreview(e.target.value);
                  setAvatarError(false);
                }}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

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
            <div className="flex items-center justify-between">
              <Label htmlFor="bio">Bio</Label>
              <span className="text-xs text-muted-foreground tabular-nums">{bio.length}/500</span>
            </div>
            <textarea
              id="bio"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              placeholder="A short bio about yourself"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={saving}>
              {saving && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Profile
            </Button>
            {(profile?.display_name || profile?.bio || profile?.avatar_url) && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setDisplayName(profile?.display_name ?? "");
                  setBio(profile?.bio ?? "");
                  setAvatarUrl(profile?.avatar_url ?? "");
                  setAvatarPreview(profile?.avatar_url ?? "");
                  setAvatarError(false);
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
