function RecordSkeleton() {
  return (
    <div role="status">
      <div className="flex justify-between items-center fixed top-0 left-0 z-10 w-full p-3 px-5 pr-0 bg-black"></div>
      <div className="rounded-br-[48px] py-10 bg-black">
        <div className="flex items-center w-[95%] md:w-[90%] max-w-[1200px] mb-10 ml-auto md:mx-auto animate-pulse">
          <div className="relative w-[120px] h-[170px] mr-[-50px] bg-gray-200 shrink-0"></div>
          <div className="h-[240px] rounded-b-[48px] p-12 pl-[4.5em] bg-white w-full">
            <div>
              <div className="w-44 h-5 mb-1 bg-gray-200 rounded-full"></div>
              <div className="w-28 h-5 mb-8 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      
        <div className="md:flex md:items-center md:gap-5 w-[90%] max-w-[1200px] m-auto animate-pulse">
          <div className="md:flex-initial md:w-1/2 mb-8 md:mb-0">
            <div className="w-16 h-5 mb-2 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col items-center justify-center gap-1 w-full h-[120px] md:h-[98px] bg-gray-200 rounded-xl"></div>
          </div>
          <div className="md:flex-initial md:w-1/2">
            <div className="w-16 h-5 mb-2 bg-gray-200 rounded-full"></div>
            <div className="h-10 mb-2 bg-gray-200 rounded-xl"></div>
            <div className="h-10 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>

      <div className="layout animate-pulse">
        <div className="w-20 h-5 mb-8 bg-gray-200 rounded-full"></div>
        <div className="h-[220px] bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  )
}

export default RecordSkeleton;