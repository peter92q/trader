import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from './animations';

export const TypingText = ({ title, textLogic }) => (
    <motion.p
      variants={textContainer}
      className={`${textLogic}`}
    >
      {Array.from(title).map((letter: string, index)=>(
        <motion.span
          variants={textVariant2}
          key={index}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p> 
  );