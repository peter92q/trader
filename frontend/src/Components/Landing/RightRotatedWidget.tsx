import {motion} from "framer-motion";
import { slideIn } from "../../Configs/FramerMotion/animations";

interface Props{
    isWidthBelow930px: boolean;
}

export default function RightRotatedWidget({isWidthBelow930px}:Props) {
  return (
    <motion.div 
      variants={slideIn("up","tween", 0.2, 1)} 
      className={`${isWidthBelow930px ? "hidden" : "flex flex-col text-white items-center justify-center gap-1"}`}>
    <h2 className="rotate-90 text-gray-300 text-[17px] w-[50px] mt-5 tracking-[15px] mb-[135px]"
      >realtime <p className="translate-x-[-47px]">movements</p>
   </h2> 
     <div className="w-[1px] bg-gray-300 h-[150px]"/>
     <div className="w-[1px] bg-gray-300 h-[5px]"/>
     <div className="w-[1px] bg-gray-300 h-[5px]"/>
     <div className="w-[1px] bg-gray-300 h-[5px] mb-[110px]"/>
   </motion.div>
  )
}
