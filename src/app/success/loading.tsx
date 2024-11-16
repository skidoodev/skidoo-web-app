export default function Loading() {
    return (
      <div className="flex items-center bg-backgroud-pop justify-center h-screen space-x-2">
        <div className="h-5 w-5 animate-bounce rounded-full bg-[#1C423C] [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 animate-bounce rounded-full bg-[#1C423C] [animation-delay:-0.13s]"></div>
        <div className="h-5 w-5 animate-bounce rounded-full bg-[#1C423C]"></div>
    </div>
    )
  }