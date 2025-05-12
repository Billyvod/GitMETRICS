export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="h-[360px] bg-muted/30 rounded-lg animate-pulse" />
        <div className="h-[360px] bg-muted/30 rounded-lg animate-pulse" />
      </div>
      
      <div className="h-[400px] bg-muted/30 rounded-lg animate-pulse" />
      
      <div className="h-[500px] bg-muted/30 rounded-lg animate-pulse" />
    </div>
  );
}