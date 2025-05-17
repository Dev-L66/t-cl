const RightPanelSkeleton = () => {
  return (
   <div className="flex w-50 flex-col gap-4">
  <div className="flex items-center gap-4">
    <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-1">
      <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-20"></div>
    </div>
    <div>
        <button className="skeleton h-8 w-15 rounded-2xl"></button>
    </div>
  </div>

</div>
  )
}

export default RightPanelSkeleton;