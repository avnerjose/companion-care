import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-16 h-8" />
        <div>
          <Skeleton className="w-64 h-6 rounded-md" />
          <Skeleton className="w-24 h-6 rounded-md" />
          <Skeleton className="w-64 h-10 rounded-md mt-2" />
        </div>
      </div>
      <Skeleton className="w-64 h-10 rounded-md" />
    </div>
  );
}
