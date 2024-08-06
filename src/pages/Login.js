import React, { useState } from 'react'
// import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] =useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleOnChange =(e) => {
        const {name, value} = e.target;

        setData((prev)=> {
            return{
                ...prev,
                [name] : value
            }
        })
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const consoleData = await dataResponse.json();

            if(consoleData.success){
                toast.success(consoleData.message)
            }
            if(consoleData.error){
                toast.error(consoleData.message)
            }
    }

    
  return (
    <section id="login">
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-md mx-auto max-w-sm'>
                <div className='w-20 h-20 mx-auto'>
                    {/* <img src={loginIcon || "alt"} alt="Login Icon" /> */}
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='email' 
                                placeholder='Email'
                                name="email"
                                value={data.email}
                                onChange={handleOnChange} 
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword? "text" : "password"} 
                                placeholder='Password'
                                name= "password"
                                value={data.password}
                                onChange={handleOnChange} 
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                                <span>
                                    { showPassword ? (
                                        <FaEyeSlash/>
                                    ) : (<FaEye/>)}                                  
                                    
                                </span>
                            </div>
                        </div>
                        <Link 
                            to={"/forgot-password"} 
                            className='block w-fit ml-auto hover:underline hover:text-red-600 '>
                            Forgot password
                        </Link>
                    </div>
                    <button 
                        className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-red-700 transition-all mx-auto block mt-6'>
                            Login
                    </button>
                </form>
                <p className='my-5'>Don't have an account ? <Link to={"/sign-up"} className='hover:text-red-600 hover:underline'>Sign-Up</Link> </p>
            </div>
        </div>
    </section>
  )
}

export default Login