import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-28 h-8" />
      <div className="flex flex-col px-4 gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-64 h-6 rounded-md" />
          <div className="flex gap-1 w-full">
            <div className="w-full">
              <Skeleton className="w-28 h-6 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md mt-2" />
            </div>
            <div className="w-full">
              <Skeleton className="w-24 h-6 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md mt-2" />
            </div>
          </div>
          <div className="w-full">
            <Skeleton className="w-24 h-6 rounded-md" />
            <Skeleton className="w-full h-10 rounded-md mt-2" />
          </div>
          <div className="flex gap-1 w-full">
            <div className="w-full">
              <Skeleton className="w-28 h-6 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md mt-2" />
            </div>
            <div className="w-full">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md mt-2" />
            </div>
          </div>
          <div className="w-full">
            <Skeleton className="w-16 h-6 rounded-md" />
            <div className="flex gap-2">
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-12 h-6 rounded-md" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-16 h-6 rounded-md" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
      <Skeleton className="w-96 h-6" />
    </div>
  );
}
