import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-28 h-8" />
      <div className="flex flex-col px-4 gap-4">
        <div className="flex flex-col gap-1">
          <div>
            <Skeleton className="w-64 h-6 rounded-md" />
            <Skeleton className="w-24 h-6 rounded-md mt-2" />
            <Skeleton className="w-full h-10 rounded-md mt-2" />
          </div>
        </div>
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
      <Skeleton className="w-96 h-6" />
    </div>
  );
}
