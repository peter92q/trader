import { cryptos } from '../../StaticData/cryptos';
import ExploreCard from './ExploreCard';

const styles = {
  mainContainer: `sm:p-16 xs:p-8 px-6 py-12`,
  motionContainer: `2xl:max-w-[1280px] w-full mx-auto flex flex-col relative`,
  cardMapper:`mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5`,
  pinkGradient:`absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] sm:opacity-50 rounded-full pink__gradient`,
  purpleGradient:`absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] sm:opacity-50 rounded-full purple__gradient`,
  blueGradient:`absolute z-[0] w-[40%] h-[40%] right-[25%] bottom-0 sm:bottom-[20%] sm:opacity-50 rounded-full blue__gradient`
}
  
export default function Explore ()  {

  return (
    <div className={`${styles.mainContainer}`} id="explore">
      <div className={`${styles.motionContainer}`}
      > 
        <div className={`${styles.pinkGradient}`}/>
        <div className={`${styles.purpleGradient}`}/>
        <div className={`${styles.blueGradient}`}/>
        <p 
          className="text-center responsive-text3 font-medium text-white" >
            | Begin your journey 
          </p> 
        <div className={`${styles.cardMapper}`}>
          {cryptos.map((crypto, index) => ( 
            <ExploreCard 
              key={crypto.id}
              {...crypto}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
