import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "avatar";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        variant === "card" && "h-32 w-full rounded-lg",
        variant === "text" && "h-4 w-full",
        variant === "avatar" && "h-10 w-10 rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
