import { motion } from 'framer-motion';
import { textVariant } from '../../Configs/FramerMotion/animations';
import {useMediaQuery} from '@mui/material';


export default function TraderTextAnimation() {


  const isWidthBelow630px = useMediaQuery('(max-width:630px)');
  const textLogic = `font-audiowide font-bold ${isWidthBelow630px ? 
    "bg-gradient-to-r from-[#ca136d] via-[#880949] to-[#ff5eb1b2] bg-clip-text text-transparent" 
    :
    "bg-gradient-to-r from-[#ca136d] via-[#880949] to-[#110109] bg-clip-text text-transparent"} `

  return (
    <div className="flex flex-row md:flex-col gap-1 responsive-text2 md:ml-[30px] lg:ml-[40px] mx-auto z-[20]">
    <motion.h1 
      variants={textVariant(0.4)}
      className={textLogic}>
      TR
    </motion.h1>
    <motion.h1
      variants={textVariant(0.5)} 
      className={textLogic}>
      AD
    </motion.h1>
    <motion.h1 
      variants={textVariant(0.7)}
      className={textLogic}>
      ER
    </motion.h1>
  </div>
  )
}
