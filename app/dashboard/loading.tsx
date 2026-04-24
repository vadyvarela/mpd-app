export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="mb-4 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-10">
          <div>
            <div className="h-7 w-32 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-full md:w-80 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-gray-200 rounded-lg" />
              <div className="h-8 w-8 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
