import { motion } from 'framer-motion';
import { textVariant } from '../../Configs/FramerMotion/animations';

const textLogic2 = "z-10 uppercase tracking-wider font-bold bg-gradient-to-l from-[#ca136d] via-[#880949] to-[#280316] bg-clip-text text-transparent"
const textLogic3 = "z-10 uppercase tracking-wider font-bold bg-gradient-to-l from-[#b9b2b5] via-[#b8b5b6] to-[#2a2626] bg-clip-text text-transparent"

export default function PromoTextAnimation() {
  return (
    <div className="hidden flex-col gap-1 responsive-text items-start md:flex font-audiowide ">
    <motion.h3
    variants={textVariant(0.5)} className={textLogic2}>The</motion.h3>
    <motion.h3
    variants={textVariant(0.6)} className={textLogic3}>Future</motion.h3>
    <motion.h3
    variants={textVariant(0.7)} className={textLogic2}>Of</motion.h3>
    <motion.h3
    variants={textVariant(0.9)} className={textLogic3}>Trading</motion.h3>
  </div>
  )
}
