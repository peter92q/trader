import {useMediaQuery} from '@mui/material';
import {motion} from 'framer-motion';
import { staggerContainer, zoomIn } from '../../Configs/FramerMotion/animations';
import LeftRotatedWidget from './LeftRotatedWidget';
import RightRotatedWidget from './RightRotatedWidget';
import TraderTextAnimation from './TraderTextAnimation';
import PromoTextAnimation from './PromoTextAnimation';

const mainContainer = "w-full h-full flex relative items-center text-center justify-evenly gap-2 text-[40px] flex-col sm:flex-row px-1 mx-auto"

export default function Landing() {
    
  const isWidthBelow930px = useMediaQuery('(max-width:930px)');

  return (
    <motion.div
       variants={staggerContainer}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true, amount: 0.25}}  
       className={mainContainer}
      > 
      {/*left side*/} 
      <LeftRotatedWidget isWidthBelow930px={isWidthBelow930px}/>

      {/*center, composed of 3 boxes*/}
      <div className="flex md:flex-row flex-col justify-center items-center">
        {/*box1*/}
        <TraderTextAnimation/>
  
        {/*box2*/} 
        <motion.div
          variants={zoomIn(0.4, 1)}
        >
          <img src='./ball.png' alt='ball' className="rounded-full"/>
        </motion.div>

        {/*box3*/}
        <PromoTextAnimation/>
      </div>
      {/*right side*/} 
      <RightRotatedWidget isWidthBelow930px={isWidthBelow930px}/>
      {/*gradients*/}
    </motion.div>
  )
}
