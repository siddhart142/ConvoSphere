import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Login = () => {

    const navigate = useNavigate()
    const [isLogin,setIsLogin] = useState(true)
    const [avatar, setAvatar] = useState(null);

    const toggleLogin = ()=>{
        setIsLogin(!isLogin)
    }
    

    const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()


      const onSignUp = async(formData) => {
        console.log("form",formData);
        try {
          const {data} = await axios.post("http://localhost:8000/api/v1/users/register", formData, {
          // withCredentials: true, // Set the withCredentials option to true
          // other options if needed
        });
        console.log(data)
        navigate("/")

        } catch (error) {
            console.log(error)
        }

      
      };

      const onLogin = async(formData) => {
        console.log("form",formData);
        try {
          const {data} = await axios.post("http://localhost:8000/api/v1/users/Education", formData, {
          // withCredentials: true, // Set the withCredentials option to true
          // other options if needed
        });
        console.log(data)
        navigate("/")

        } catch (error) {
            console.log(error)
        }

      
      };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-green-500'>
    {isLogin && (
    <div className='bg-white shadow-2xl w-1/4 rounded-2xl p-8'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <form className='flex flex-col ' onSubmit={handleSubmit(onLogin)}>
            <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='User Name*' {...register("userName", { required: true, maxLength: 20 })} />
            {errors.userName && <p  className='text-red-500 mx-4' role="alert">User Name required</p>}
            <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Password*' {...register("password", {required : true})} />
            {errors.password && <p className='text-red-500 mx-4' role="alert">Password is required</p>}
            <button className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300' type="submit">Login</button>
        </form>
        <h2 className='text-xl  mb-4 text-center'>OR</h2>
        <h3 className='text-xl  mb-4 text-center text-blue-400 cursor-pointer' onClick={toggleLogin}>Sign Up Instead</h3>
    </div>
    )}
    {!isLogin && (
        <div className='bg-white shadow-2xl w-1/4 rounded-2xl p-8 flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSignUp)}>
        <div className='relative flex justify-center items-center'>
          <img
            className='rounded-full w-36 h-36 mb-2'
            src={avatar ? URL.createObjectURL(avatar) : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}
            alt="avatar"
          />
          <label htmlFor="avatar"  className='absolute bottom-0  ml-32 text-blue-500 cursor-pointer'>
            <CameraAltIcon />
          </label>
          <input
            id="avatar"
            type="file"
            className="hidden"
            onChange={handleAvatarChange}
            {...register("avatar")}
          />
        </div>
        <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Email*' {...register("email", { required: true })} />
        {errors.email && <p className='text-red-500 mx-4' role="alert">Email is required</p>}
        <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Bio*' {...register("bio", { required: true })} />
        {errors.bio && <p className='text-red-500 mx-4' role="alert">Bio is required</p>}
        <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='User Name*' {...register("name", { required: true, maxLength: 20 })} />
        {errors.userName && <p className='text-red-500 mx-4' role="alert">User Name is required</p>}
        <input className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Password*' {...register("password", { required: true })} />
        {errors.password && <p className='text-red-500 mx-4' role="alert">Password is required</p>}
        <button className='m-2 px-4 py-2 border-2 border-gray-800 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300' type="submit">Sign Up</button>
      </form>
      <h2 className='text-xl mb-2 text-blue-400 cursor-pointer' onClick={toggleLogin}>OR</h2>
      <h3 className='text-xl mb-4 text-blue-400 cursor-pointer' onClick={toggleLogin}>Login Instead</h3>
    </div>


    )}
</div>

  )
}

export default Login
