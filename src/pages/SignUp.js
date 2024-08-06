import React, {useState} from 'react'
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] =useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    });
    const navigate = useNavigate();
    const handleOnChange =(e) => {
        const {name, value} = e.target;

        setData((prev)=> {
            return{
                ...prev,
                [name] : value
            }
        })
    };

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0];

        const imagePic = await imageToBase64(file);
        setData((prev)=>{
            return{
                ...prev,
                profilePic : imagePic
            }
        })
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();

        if (data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            const consoleData = await dataResponse.json();

            if(consoleData.success){
                toast.success(consoleData.message)
                navigate("/login")

            }
            if(consoleData.error){
                toast.error(consoleData.message)
            }
        }
        else{
            console.log("check the password and confirm password")
        }        
    }


  return (
    <section id="signup">
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-md mx-auto max-w-sm'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                    <img src={data.profilePic || loginIcon} alt="Login Icon" />
                </div>
                <form>
                    <label>
                        <div className='text-xs bg-slate-200 cursor-pointer bg-opacity-80 pb-4 pt-2 text-center absolute bottom-0 w-full'>
                            Upload Photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Username: </label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type='text' 
                            placeholder='Enter your Name'
                            name="name"
                            value={data.name}
                            onChange={handleOnChange} 
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div className='grid'>
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
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                            type={showConfirmPassword? "text" : "password"} 
                            placeholder='enter Confirm Password'
                            name= "confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleOnChange} 
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                            <span>
                                { showConfirmPassword ? (
                                    <FaEyeSlash/>
                                ) : (<FaEye/>)}                                  
                                
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-red-700 transition-all mx-auto block mt-6'>
                        Sign Up
                </button>
            </form>
            <p className='my-5'>Already have an account ? <Link to={"/login"} className='hover:text-red-600 hover:underline'>Login</Link> </p>
        </div>
    </div>
</section>
  )
}

export default SignUp