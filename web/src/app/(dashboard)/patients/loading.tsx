import { Skeleton } from "@/components/ui/skeleton";

export default function PatientsPageLoading() {
  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {[...new Array(9)].map((_, idx) => (
        <Skeleton key={idx} className="h-64 w-full" />
      ))}
    </div>
  );
}
