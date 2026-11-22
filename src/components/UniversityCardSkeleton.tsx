export default function UniversityCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col animate-pulse">
      {/* Header Container */}
      <div className="pt-10 pb-4 px-4 flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50/70 relative">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="w-16 h-5 rounded-full bg-slate-200"></div>
          <div className="w-12 h-5 rounded-full bg-slate-200"></div>
        </div>

        {/* Circular Logo Skeleton */}
        <div className="w-24 h-24 rounded-full bg-slate-200 border-2 border-white shadow-xs"></div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="text-center space-y-2">
          {/* Title and subtitle */}
          <div className="h-5 bg-slate-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-3 bg-slate-200 rounded-md w-1/2 mx-auto"></div>

          {/* Location pill */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-4 bg-slate-200 rounded-full w-20"></div>
            <div className="h-4 bg-slate-200 rounded-full w-28"></div>
          </div>
        </div>

        {/* Cut-off scores */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded-md w-24"></div>
          <div className="h-4 bg-slate-200 rounded-md w-24"></div>
        </div>

        {/* Departments */}
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 rounded-md w-1/3"></div>
          <div className="flex flex-wrap gap-1.5">
            <div className="h-5 bg-slate-200 rounded-md w-20"></div>
            <div className="h-5 bg-slate-200 rounded-md w-24"></div>
            <div className="h-5 bg-slate-200 rounded-md w-16"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <div className="h-9 bg-slate-200 rounded-xl"></div>
          <div className="h-9 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
