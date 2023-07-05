import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../Configs/Redux/store"
import Cookies from 'js-cookie';
import { fetchCurrentUser } from "../../Configs/Redux/accountSlice";
import { Link } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import ApiIcon from '@mui/icons-material/Api';

export default function Navbar({scrollToParent}:{scrollToParent: ()=>void}) {
  const dispatch = useAppDispatch(); 
  
  const initApp = useCallback(async () => {
    const cookieUser = Cookies.get('user');
    if (cookieUser) {
      try {
        await dispatch(fetchCurrentUser());
      } catch (error: any) {
        console.log(error);
      }
    }
  }, [dispatch]);  

  useEffect(()=>{
    initApp();
  },[initApp])

  return (
    <div className="w-full h-[3rem] flex items-center justify-between px-3 mt-3.5 bg-transparent">
      <Link to='/' className="z-[999]">
        <ApiIcon sx={{fontSize: 50, fill: "#ad196b"}}/>
      </Link>
      <NavbarMenu scrollToParent={scrollToParent}/> 
    </div>
  )
}
