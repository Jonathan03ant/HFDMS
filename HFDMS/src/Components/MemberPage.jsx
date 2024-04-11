import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberPage() {
    const navigate = useNavigate();
    return (
        <div className='container h-screen flex justify-center items-center space-x-34 w-full'>
            <div className='w-1/3'>
                {/* Place your Lottie animation component here */}
                <p>Lottie animation here</p>
            </div>
            <div className="flex flex-col justify-center space-x-5 mt-20 ml-20">
                <div className='font-cara flex flex-col justify-center space-y-5 mt-20'>
                    <button className=' bg-blue-200 w-32 hover:bg-gray-200 text-black py-2 px-4 rounded'
                        onClick={() => navigate('/member-login')}> SIGNIN
                    </button>

                    <button className='bg-blue-200 w-32 hover:bg-gray-200 text-black py-2 px-4 rounded' 
                        onClick={() => navigate('/member-signup')}> SIGNUP
                    </button>
                </div>
            </div>
        </div>
    );
}