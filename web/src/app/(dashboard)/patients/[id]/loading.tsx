import { Skeleton } from "@/components/ui/skeleton";

export default function PatientDetailLoading() {
  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full ">
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-54" />
      </div>
      <Skeleton className="h-64 w-full mt-4" />
    </div>
  );
}
