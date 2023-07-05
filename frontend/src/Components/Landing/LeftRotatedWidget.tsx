import {motion} from "framer-motion";
import { slideIn } from "../../Configs/FramerMotion/animations";

interface Props{
    isWidthBelow930px: boolean;
}

export default function LeftRotatedWidget({isWidthBelow930px}:Props) {
  return (
    <motion.div 
      variants={slideIn("down","tween", 0.2, 1)}
      className={`${isWidthBelow930px ? "hidden" : "flex flex-col text-white items-center justify-center gap-1"}`}>
      <div className="w-[1px] bg-gray-300 h-[5px]"/>
      <div className="w-[1px] bg-gray-300 h-[5px]"/>
      <div className="w-[1px] bg-gray-300 h-[5px] "/>
      <div className="w-[1px] bg-gray-300 h-[150px] mb-[110px]"/>
      <h2 className="rotate-text text-gray-300 text-[17px] w-[50px] mt-5 tracking-[15px]"
       >flexible <p className="translate-x-[12px]">trading</p>
       </h2> 
    </motion.div>
  )
}
