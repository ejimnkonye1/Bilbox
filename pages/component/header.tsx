import React from "react";
import { LuPlus } from "react-icons/lu";
import { PiTelevisionDuotone } from "react-icons/pi";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";

export default function Header () {
   const router = useRouter()

   const handleBack = () => {
    router.push('/')

   }
    return(
        <nav className="navbar ">
        <div className="container flex justify-between items-center px-10">
          <div className='icon-head w-[40px] h-[40px] border-2-[#89c5f1]  bg-[#89c5f1] flex justify-center items-center rounded-[20%] overflow-hidden'>
              
          <MdArrowBackIos className='' onClick={handleBack}/>
         
          </div>
        
         <div className='flex'>
         <div className="icon-head m-2  w-[40px] h-[40px] border-2-[#89c5f1]  bg-[#89c5f1] flex justify-center items-center rounded-[20%] overflow-hidden" >
                  <LuPlus className='plus-icon' />
                </div>
                <div className="icon-head m-2  w-[40px] h-[40px] border-2-[#89c5f1]  bg-[#89c5f1] flex justify-center items-center rounded-[20%] overflow-hidden">
                    <PiTelevisionDuotone className='tv' />
                  </div>
         </div>
         
      
        </div>
      </nav>

    )
 
}