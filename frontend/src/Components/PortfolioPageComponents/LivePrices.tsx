import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function LivePrice({crypto, value, index, percentChange}
  :{crypto: string, value: number, index: number,percentChange: number }) {
  return (  
    <>    
      <tr>
        <td className="responsive-text6  text-gray-500 font-extralight text-center">
          {index + 1}
        </td>
        <td className="first-letter:uppercase responsive-text6  xl:pr-[5rem] text-gray-300 pl-[0.7rem]">
          {crypto === "binancecoin" ? "BNB" : crypto} {percentChange > 0 ? <ExpandLessIcon sx={{fill: "green"}}/> : <ExpandMoreIcon sx={{fill: "red"}}/>}
        </td>
        <td className="text-gray-200 3 responsive-text6  text-end">
          ${value} 
        </td>
        <td className={`text-gray-200 responsive-text6small align-top p-0 text-start ${percentChange > 0 ? "text-green-500" : "text-red-500"}`}>
          {percentChange> 0 ? "+" +Number(percentChange).toFixed(2)+"%" : Number(percentChange).toFixed(2)+"%"}
        </td>
      </tr>
    </>
  )
}