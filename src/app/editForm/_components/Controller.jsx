"use client" 
import React,{useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";


export default function Controller({ setSelectTheme,setEnableAuth,enabelauth,selectedGradient }) {
  
    const [showAll, setShowAll] = useState(false);
    const [selected,setSelected]= useState(-1);
    const [selectdThem,setselectedThema]= useState("light")
    const [selectedStyle, setSelectedStyle] = useState(null);
    

    useEffect(()=>{
      console.log(enabelauth);
    },[enabelauth])

    const gradients = [
  "bg-white", // plain white added
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-blue-500 to-cyan-400",
  "bg-gradient-to-r from-green-400 to-emerald-500",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
  "bg-gradient-to-r from-red-400 to-pink-500",
  "bg-gradient-to-r from-indigo-500 to-sky-500",
  "bg-gradient-to-r from-fuchsia-500 to-purple-600",
  "bg-gradient-to-r from-rose-500 to-orange-400",
  "bg-gradient-to-r from-slate-600 to-zinc-800",
  "bg-gradient-to-r from-amber-400 to-orange-600",
  "bg-gradient-to-r from-emerald-400 to-teal-600",
  "bg-gradient-to-r from-pink-400 to-red-500",
  "bg-gradient-to-r from-sky-400 to-blue-600",
  "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  "bg-gradient-to-r from-gray-500 to-stone-800",
  "bg-gradient-to-r from-lime-400 to-green-600",
  "bg-gradient-to-r from-teal-400 to-cyan-600",
  "bg-gradient-to-r from-indigo-400 to-violet-600",
  "bg-gradient-to-r from-orange-400 to-red-500",
  "bg-gradient-to-r from-blue-400 to-purple-600",
];


  const visibleGradients = showAll ? gradients : gradients.slice(0, 8);

  return (
    <div>
    <div className="my-3 flex justify-center items-center">
      <Select onValueChange={(value) => {setSelectTheme(value);setselectedThema(value)}}>
    <SelectTrigger className="w-[240px]">{selectdThem.charAt(0).toUpperCase() + selectdThem.slice(1).toLowerCase()}</SelectTrigger>
    <SelectContent>
      <SelectItem value="aqua">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#09ecf3] border" /> Aqua
        </div>
      </SelectItem>

      <SelectItem value="dark">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#1e1e1e] border" /> Dark
        </div>
      </SelectItem>

      <SelectItem value="light">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#ffffff] border" /> Light
        </div>
      </SelectItem>

      <SelectItem value="cupcake">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#f1c1e0] border" /> Cupcake
        </div>
      </SelectItem>

      <SelectItem value="bumblebee">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#f9d72f] border" /> Bumblebee
        </div>
      </SelectItem>

      <SelectItem value="emerald">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#50c878] border" /> Emerald
        </div>
      </SelectItem>

      <SelectItem value="corporate">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#4b6bfb] border" /> Corporate
        </div>
      </SelectItem>

      <SelectItem value="synthwave">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#2b0070] border" /> Synthwave
        </div>
      </SelectItem>

      <SelectItem value="retro">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#ef9995] border" /> Retro
        </div>
      </SelectItem>

      <SelectItem value="cyberpunk">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#ff7598] border" /> Cyberpunk
        </div>
      </SelectItem>

      <SelectItem value="valentine">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#ffadc6] border" /> Valentine
        </div>
      </SelectItem>

      <SelectItem value="halloween">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#f28c18] border" /> Halloween
        </div>
      </SelectItem>

      <SelectItem value="garden">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#5c832f] border" /> Garden
        </div>
      </SelectItem>

      <SelectItem value="forest">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#0b3d0b] border" /> Forest
        </div>
      </SelectItem>

      <SelectItem value="aquaTheme">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#00ffff] border" /> Aqua
          Theme
        </div>
      </SelectItem>

      <SelectItem value="lofi">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#c8b6ff] border" /> Lofi
        </div>
      </SelectItem>

      <SelectItem value="pastel">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#ffd6a5] border" /> Pastel
        </div>
      </SelectItem>

      <SelectItem value="fantasy">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#a890fe] border" /> Fantasy
        </div>
      </SelectItem>

      <SelectItem value="wireframe">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#b8b8b8] border" /> Wireframe
        </div>
      </SelectItem>

      <SelectItem value="black">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#000000] border" /> Black
        </div>
      </SelectItem>

      <SelectItem value="luxury">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#cca43b] border" /> Luxury
        </div>
      </SelectItem>

      <SelectItem value="dracula">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#282a36] border" /> Dracula
        </div>
      </SelectItem>
    </SelectContent>
      </Select>
    </div>

    <div className="my-4 ">
      <h3 className="text-lg font-bold mb-2 text-center">
        🎨 Choose a Background Gradient
      </h3>

      <div className="grid grid-cols-4 px-2  gap-3">
        {visibleGradients.map((gradient, index) => (
          <div
            
            key={index}
            onClick={() => {
              selectedGradient(gradient)
              setSelected(index)
            }}
            className={`w-16 h-16 rounded-lg cursor-pointer shadow-md transition-all duration-200 hover:scale-105 ${gradient} ${selected === index ? "border-2" : ""}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>


     <div className="flex items-center gap-2 my-4">
      <Checkbox
        id="terms"
        defaultChecked={enabelauth}
        onCheckedChange={(checked) => setEnableAuth(checked)}
      />
      <p>Check to allow only authenticated users to fill the form</p>
    </div>


    </div>
</div>
  );
}
