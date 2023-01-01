import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { navlinks } from '../constants'
import { logo,sun } from '../assets'
import { useState } from 'react'

const Icon =({styles,imgUrl,name,isActive,disabled,handleClick,})=>{
  return(
    <div className={`w-[3rem] h-[3rem] rounded-[1rem] ${isActive && isActive === name && 'bg-[#2c2f32'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {
        !isActive ?
        <img src={imgUrl} alt="fund_logo" className='w-1/2 h-1/2' />
        :
        (
          <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !==name && 'grayscale'}`} />
        )
      }
    </div>
  )
}

const Sidebar = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState('dashboard')
  return (
    <div className='flex justify-between items-center h-[93vh] flex-col sticky top-5'>
        <Link to='/'>
          <Icon styles="w-[4rem] h-[4rem] bg-[#2c2f32]" imgUrl={logo} />
        </Link>

        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'>
          <div className='flex flex-col justify-center  items-center gap-3 '>
            {
              navlinks.map((link)=>{
                return(
                <Icon 
                  key={link.name}
                   {...link}
                   isActive={active}
                   handleClick={()=>{
                    if(!link.disabled){
                      setActive(link.name)
                      navigate(link.link)
                    }
                   }}
                />
                )
              })
            }
          </div>
          <Icon imgUrl={sun} styles="bg-[#1c1c24] shadow-secondary " />
        </div>

    </div>
  )
}

export default Sidebar