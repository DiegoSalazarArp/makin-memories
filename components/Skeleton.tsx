const shimmer =
  "h-[500px] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"

export function SkeletonList() {
  return (
    <main className="animate-in flex flex-1 flex-col gap-4 lg:gap-6 ">
      <div className="flex items-center mb-10 ">
        <div className="ml-2 h-6 w-[50%] rounded-md bg-gray-100 text-sm font-medium " />
      </div>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex py-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-5 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8 min-h-[70%]">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </main>
  )
}
