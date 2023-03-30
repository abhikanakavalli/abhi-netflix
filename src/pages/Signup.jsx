import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { auth } from '../firebase';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, signUp} = UserAuth();
    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signUp(email, password);
          navigation('/')
        } catch (error) {
          console.log(error);
        }
      };
    

  return (
    <>
    <div className='w-full h-screen'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/5523db5a-e2b2-497f-a88b-61f175c3dbad/eb90437e-a876-47c3-a138-ca27772a4d2a/IN-en-20230306-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
            className='hidden absolute sm:block w-full h-full object-cover'
            alt="/"
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
        <div className='bg-black/75 max-w-[450px] h-[600px] mx-auto text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='texts-3xl font-bold'>Sign Up</h1>
            <form className='w-full flex flex-col py-4'
                onSubmit={handleSubmit}
            >
                <input type='email' 
                    onChange={(e)=> setEmail(e.target.value)}
                    autoComplete='email'
                    placeholder='Email or Phone Number'
                    className='p-3 my-2 bg-gray-700 rounded'
                    />
                <input type="password" 
                    onChange={(e)=> setPassword(e.target.value)}
                    autoComplete='current password'
                    placeholder='Password'
                    className='p-3 my-2 bg-gray-700 rounded'
                />
                <button 
                    className='bg-red-600 py-3 my-6 rounded font-bold'>
                    Sign Up
                </button>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                    <p>
                        <input className='mr-2' type="checkbox" />
                        Remember me
                    </p>
                    <p>Need Help?</p>
                </div>
                <p className='py-4 cursor-pointer'>
                    <span className='text-gray-600'>Already subscribed to Netflix?</span>
                    {' '}
                <Link to='/login'>
                    Sign In
                </Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Signup