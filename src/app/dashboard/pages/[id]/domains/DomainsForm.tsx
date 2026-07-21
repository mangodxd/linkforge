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
      <div>
        <h2 className="text-lg font-semibold font-heading">Custom Domains</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect your own domain to this page.
        </p>
      </div>

      <Card className="relative overflow-hidden p-4">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />
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
            Add Domain
          </Button>
        </div>
      </Card>

      {domains.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Icons.Globe className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-3 font-semibold">No custom domains</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a domain above to use your own URL.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {domains.map((domain) => (
            <Card key={domain.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{domain.domain}</span>
                    {domain.verified ? (
                      <Badge variant="success">Verified</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                  {!domain.verified && (
                    <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                      <p>Add this TXT record to your domain DNS:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 rounded bg-muted px-2 py-1 text-xs font-mono">
                          linkforge-verify={domain.verification_token}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            navigator.clipboard.writeText(`linkforge-verify=${domain.verification_token}`);
                            addToast({ title: "Copied to clipboard", variant: "success" });
                          }}
                        >
                          <Icons.Clipboard className="h-3 w-3" />
                        </Button>
                      </div>
                      <p>DNS changes may take a few minutes to propagate.</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
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
                    className="hover:text-destructive"
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
