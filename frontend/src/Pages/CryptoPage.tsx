import { useParams } from "react-router-dom"
import MainChart from "../Components/CryptoPageComponents/MainChart";

export default function CryptoPage() {
  const {id} = useParams();

  return ( 
    <MainChart selectedCrypto={id}/>
  )
}
