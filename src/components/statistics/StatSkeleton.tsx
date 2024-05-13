function StatSkeleton() {
  return (
    <div role="status" className="layout animate-pulse">
      <div className="flex justify-center items-center gap-3 mb-4">
        <div className="w-[100px] h-8 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-[240px] bg-gray-200"></div>
      
      <div className="flex justify-center items-center gap-3 mt-12">
        <div className="w-[100px] h-8 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-[160px] my-12 bg-gray-200 rounded-xl"></div>
      <div className="h-[160px] my-12 bg-gray-200 rounded-xl"></div>
    </div>
  )
}

export default StatSkeleton;