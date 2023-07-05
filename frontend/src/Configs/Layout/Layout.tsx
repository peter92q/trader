import { useRef } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Gradients from "./Gradients";

interface Props{
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
  const parentRef = useRef(null);

  const scrollToParent = () => {
    parentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return ( 
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden relative">
     <Navbar scrollToParent={scrollToParent}/>
      <Gradients/>
      {children}
      <div ref={parentRef}/>
     <Footer/>
    </div>
  )
} 
