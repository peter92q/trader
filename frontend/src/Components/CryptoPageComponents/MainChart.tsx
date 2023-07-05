import { useEffect, useState } from 'react'
import axios from 'axios'
import HighchartsChart from './HighchartsChart';
import PeriodicFetch from './PeriodicFetch';

const styles = {
  mainWrapper: "w-screen flex sm:flex-row flex-col justify-center items-center overflow-hidden relative mb-[11vh]", 
  secondaryWrapper:  "w-full sm:w-[90vw] mx-auto flex flex-col px-1 items-center mt-[10vh] relative",
  daySelectionWrapper: "w-full flex items-end justify-end sm:mr-5 sm:mt-0 mr-2 mt-2",
  daySelectionStyles: `sm:translate-y-[50px] translate-x-[-20px] 
  z-10 flex flex-row gap-4 px-1 py-1 font-medium w-[170px] text-white border-[0.01rem] border-gray-500/60 rounded-lg`,
}

export default function CryptoCharts({selectedCrypto}:{selectedCrypto: string}) {
  const [bigData, setBigData] = useState([]);
  const [interval, setInterval] = useState("1d");
 
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5223/api/HistoricData?interval=${encodeURIComponent(
        interval
      )}&currency=${encodeURIComponent(selectedCrypto)}`
    );
    setBigData(response.data);
    console.log(response.data);
  };

  const handleSubmit = (day: string) => {
    setInterval(day);
  }; 

  useEffect(()=>{
    fetchData();
  },[interval])

  const days = ["1d", "7d", "30d", "1y"]

  return (
    <div className={`${styles.mainWrapper}`}>
      <div className={`${styles.secondaryWrapper}`}>
       <div className={`${styles.daySelectionWrapper}`}>
        <div className={`${styles.daySelectionStyles}`}
        > 
          {days.map((day, index)=>(
            <div 
              key={index} 
              onClick={()=>handleSubmit(day)} 
              className={`
                cursor-pointer px-[4px] py-[1px] rounded-md ${interval===day && "bg-[#ac1161]"}` }
              style={{
                transition: 'background-color 0.3s'
              }}
              >
                {day}
            </div>
          ))}
         </div>
      </div> 
   
      <div className='xl:w-full lg:w-[90%] md:w-[85%] w-[100%]'>
         <HighchartsChart bigData={bigData} interval={interval} currency={selectedCrypto}/>
      </div> 

    </div>
        <div className='h-[16rem] w-[20rem] sm:mt-[40px] mr-3'>
          <PeriodicFetch selectedCrypto={selectedCrypto}/>
       </div>
    </div>
    
  );
}

