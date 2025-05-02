import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const OnBoarding = () => {
    const { user, isLoaded } = useUser()
    const navigate = useNavigate()
    const handleRoleSelection = async (role) => {
        await user.update({
            unsafeMetadata: { role },
        }).then(() => {
            navigate(role === "recruiter" ? "/post-job" : "/jobs")
        }).catch((error) => {
            console.error("Error updating user metadata:", error);
        })
    }

    useEffect(() => {
        if(user?.unsafeMetadata?.role){
            navigate(user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs")
        }
    }, [user]);

    if(!isLoaded){
        return <BarLoader className='mb-4' width={"100%"} color='blue' />
    }

    return (
        <div className='flex flex-col items-center pt-[20vh] gap-10 h-screen'>
            <div>
                <p className='text-8xl font-bold'>I am a..</p>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center gap-10'>
                <button 
                    className='bg-blue-500 text-white px-4 py-2 rounded-md font-bold text-3xl hover:scale-110 transition-all duration-200'
                    onClick={() => handleRoleSelection("candidate")}
                >
                    Candidate
                </button>
                <button 
                    className='bg-red-500 text-white px-4 py-2 rounded-md font-bold text-3xl hover:scale-110 transition-all duration-200'
                    onClick={() => handleRoleSelection("recruiter")}
                >
                    Recruiter
                </button>
            </div>
        </div>
    )
}

export default OnBoarding