import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ModeToggle } from '@/components/ModeToggle';
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox, User } from 'lucide-react';

const Header = () => {
    // state to show sign in modal
    const [showSignIn, setShowSignIn] = useState(false);

    // checking role..
    const { user } = useUser();

    // redirecting with opened signin modal when we are on other route
    const [search, setSearch] = useSearchParams();
    useEffect(() => {
        if(search.get("sign-in")){
            setShowSignIn(true);
        }
    }, [search]);

    // hide sign in modal when clicking outside of it
    const handleHideSignIn = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({})
        }
    }
    return (
        <>
            <nav className='flex justify-between items-center px-10 py-3 border-b-2 border-gray-900'>
                <Link to="/" className='hover:scale-110 transition-all duration-200 cursor-pointer font-bold'>Hirenix</Link>
                <div className='flex gap-4 items-center'>
                    <SignedOut>
                        <button className='px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-bold' onClick={() => setShowSignIn(true)}>Login</button>
                    </SignedOut>
                    <SignedIn>
                        {user?.unsafeMetadata?.role === 'recruiter' && (
                            <Link to="/post-job" className='px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-bold'>
                                <PenBox className='inline mr-1' size={16} />
                                Post a Job
                            </Link>
                        )}
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs' 
                                    labelIcon={<BriefcaseBusiness size={15} />} 
                                    href='/my-jobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs' 
                                    labelIcon={<Heart size={15} />} 
                                    href='/saved-jobs'
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                    <ModeToggle />
                </div>
            </nav>
            {showSignIn && 
                <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center' onClick={handleHideSignIn}>
                    <SignIn
                        signUpForceRedirectUrl='/onboarding'
                        fallbackRedirectUrl='/onboarding'
                    />
                </div>
            }
        </>
    )
}

export default Header