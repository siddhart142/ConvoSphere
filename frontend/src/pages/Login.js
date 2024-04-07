import React, { useState } from 'react'
import {useForm} from "react-hook-form"
const Login = () => {

    const [isLogin,setIsLogin] = useState(true)

    const toggleLogin = ()=>{
        setIsLogin(!isLogin)
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      const onSubmit = (data) => console.log(data)

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-green-500'>
    {isLogin && (
    <div className='bg-white shadow-2xl w-2/4 rounded-2xl p-8'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Login</h2>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <input className='m-4 p-4 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='User Name*' {...register("userName", { required: true, maxLength: 20 })} />
            {errors.userName && <p  className='text-red-500 mx-4' role="alert">User Name required</p>}
            <input className='m-4 p-4 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Password*' {...register("password", {required : true})} />
            {errors.password && <p className='text-red-500 mx-4' role="alert">Password is required</p>}
            <button className='m-4 p-4 border-2 border-gray-800 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300' type="submit">Login</button>
        </form>
        <h2 className='text-3xl  mb-4 text-center'>OR</h2>
        <h3 className='text-3xl  mb-4 text-center text-blue-400 cursor-pointer' onClick={toggleLogin}>Sign Up Instead</h3>
    </div>
    )}
    {!isLogin && (
    <div className='bg-white shadow-2xl w-2/4 rounded-2xl p-8'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Sign Up</h2>
        <img src="" alt="avatar"/>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <input className='m-4 p-4 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='User Name*' {...register("userName", { required: true, maxLength: 20 })} />
            {errors.userName && <p  className='text-red-500 mx-4' role="alert">User Name required</p>}
            <input className='m-4 p-4 border-2 border-gray-800 rounded-lg focus:outline-none' placeholder='Password*' {...register("password", {required : true})} />
            {errors.password && <p className='text-red-500 mx-4' role="alert">Password is required</p>}
            <button className='m-4 p-4 border-2 border-gray-800 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300' type="submit">Login</button>
        </form>
        <h2 className='text-3xl  mb-4 text-center'>OR</h2>
        <h3 className='text-3xl  mb-4 text-center text-blue-400 cursor-pointer' onClick={toggleLogin}>Sign Up Instead</h3>
    </div>

    )}
</div>

  )
}

export default Login
