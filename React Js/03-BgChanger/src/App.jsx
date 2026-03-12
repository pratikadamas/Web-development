import { useState } from "react"  

function App() {
  const [bgColor, setBgColor] = useState("blue")


  return (
    <div className="w-full h-screen" style={{ backgroundColor: bgColor }}>
      <nav className="bg-gray-800 p-4 flex gap-2">
        <h1 className="text-white text-2xl font-bold mr-auto">Color Changer</h1>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={()=>setBgColor("red")}>
          Red
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("green")}>
          Green
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("blue")}>
          Blue
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("yellow")}>
          Yellow
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("purple")}>
          Purple
        </button>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("pink")}>
          Pink
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("orange")}>
          Orange
        </button>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded" onClick={() => setBgColor("cyan")}>
          Cyan
        </button>
      </nav>
    </div>
  )
}
export default App