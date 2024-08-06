import React from 'react'
import Logo from './Logo'
import { IoSearchSharp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Logo w={90} h={50}/>
            </div>
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3 '>
                <input type='text' placeholder='Search Products Here....' className='w-full outline-none'/>
                <div className='text-lg min-w-[50px] h-8  bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                    <IoSearchSharp/>
                </div>
            </div>
            <div className='flex items-center gap-7'>
                <div className='text-2xl cursor-pointer'>
                    <CiUser/>
                </div>
                <div className='text-2xl relative'>
                    <span><IoCartOutline/></span>
                    <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center p-1 absolute -top-2 -right-2'>
                        <p className='text-xs'>0</p>
                    </div>
                </div>
                <div>
                    <Link to="login" className='px-2 py-1 bg-red-600 rounded-full text-white hover:bg-red-700'>Login</Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header