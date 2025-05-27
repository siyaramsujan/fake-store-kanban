import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex items-center justify-center max-h-64 min-h-64 overflow-hidden">
        <Skeleton className="h-64 w-full rounded-md" />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

