'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Icons.BarChart3 },
  { href: "/dashboard/pages", label: "Pages", icon: Icons.FolderOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Icons.Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavClick() {
    setMobileOpen(false);
  }

  return (
    <>
      <button
        className="fixed left-4 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-md border bg-background sm:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Icons.Menu className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 flex flex-col border-r bg-background transition-all duration-200 sm:static sm:flex",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        <div className={cn(
          "flex items-center border-b px-4 py-4",
          collapsed ? "justify-center" : "gap-2"
        )}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            L
          </div>
          {!collapsed && (
            <span className="text-lg font-bold font-heading whitespace-nowrap">LinkForge</span>
          )}
        </div>

        <div className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("h-4 w-4 shrink-0", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="border-t px-3 py-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icons.ChevronLeft className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              collapsed && "rotate-180",
              !collapsed && "mr-3"
            )} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </nav>
    </>
  );
}
