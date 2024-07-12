function ListSkeleton() {
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(<div key={i}>
        <div className="w-full h-0 pt-[120%] mb-2 bg-gray-200"></div>
        <div className="h-2.5 mb-2 bg-gray-200 rounded-full"></div>
        <div className="w-1/3 h-2 bg-gray-200 rounded-full"></div>
      </div>);
    }
    return items;
  };

  return (
    <div role="status" className="layout animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="w-[260px] h-[20px] bg-gray-200 rounded-full"></div>
        <div className="w-[24px] h-[24px] bg-gray-200 rounded-full"></div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 mb-24">
        {renderItems()}
      </div>
    </div>
  )
}

export default ListSkeleton;