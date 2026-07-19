export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-neutral-200 w-full"></div>
      <div className="p-5">
        <div className="h-4 bg-neutral-200 rounded w-1/4 mb-3"></div>
        <div className="h-5 bg-neutral-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
          <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
