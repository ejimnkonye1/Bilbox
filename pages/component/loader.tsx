

export default function Loader () {
    return(
        <div className="flex justify-center items-center h-screen bg-black fixed-0 inset-0 z-10">
          
<div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
        </div>
    )
}