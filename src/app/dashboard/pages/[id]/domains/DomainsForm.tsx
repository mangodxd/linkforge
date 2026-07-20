"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomDomain } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";
import { createDomain, removeDomain, verifyDomainOwnership } from "@/services/domain.service";

interface Props {
  pageId: string;
  initialDomains: CustomDomain[];
}

export default function DomainsForm({ pageId, initialDomains }: Props) {
  const router = useRouter();
  const { addToast } = useToast();
  const [domains, setDomains] = useState<CustomDomain[]>(initialDomains);
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  async function handleAdd() {
    const domain = newDomain.toLowerCase().trim();
    if (!domain) return;
    setAdding(true);
    try {
      const created = await createDomain(pageId, domain);
      setDomains((prev) => [created, ...prev]);
      setNewDomain("");
      addToast({ title: "Domain added", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Failed to add domain",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeDomain(id);
      setDomains((prev) => prev.filter((d) => d.id !== id));
      addToast({ title: "Domain removed", variant: "success" });
      router.refresh();
    } catch (err) {
      addToast({
        title: "Failed to remove domain",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleVerify(id: string) {
    setVerifying(id);
    try {
      const verified = await verifyDomainOwnership(id);
      if (verified) {
        setDomains((prev) =>
          prev.map((d) => (d.id === id ? { ...d, verified: true } : d))
        );
        addToast({ title: "Domain verified", variant: "success" });
      } else {
        addToast({
          title: "Verification failed",
          description:
            "Add a TXT record to your domain DNS settings with the value shown below, then try again.",
          variant: "destructive",
        });
      }
      router.refresh();
    } catch (err) {
      addToast({
        title: "Verification error",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setVerifying(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Add domain */}
      <Card className="p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-1">
            <Label htmlFor="domain">Domain name</Label>
            <Input
              id="domain"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="links.example.com"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <Button onClick={handleAdd} disabled={adding || !newDomain.trim()}>
            {adding && <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Add
          </Button>
        </div>
      </Card>

      {/* Domain list */}
      {domains.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center">
          <Icons.Globe className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No custom domains configured.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {domains.map((domain) => (
            <Card key={domain.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{domain.domain}</span>
                    {domain.verified ? (
                      <Badge variant="secondary">Verified</Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>
                  {!domain.verified && (
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <p>Add this TXT record to your domain DNS:</p>
                      <code className="block rounded bg-muted px-2 py-1 text-xs">
                        linkforge-verify={domain.verification_token}
                      </code>
                      <p className="mt-1">
                        DNS changes may take a few minutes to propagate.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!domain.verified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerify(domain.id)}
                      disabled={verifying === domain.id}
                    >
                      {verifying === domain.id ? (
                        <Icons.Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Icons.RefreshCw className="h-3 w-3" />
                      )}
                      <span className="ml-1">Verify</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(domain.id)}
                  >
                    <Icons.Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
