import React from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/ModeToggle';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
    return (
        <>
            <nav className='flex justify-between items-center px-10 py-3'>
                <Link to="/" className='hover:scale-110 transition-all duration-200 cursor-pointer font-bold'>JobHunt</Link>
                <div className='flex gap-4 items-center'>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <ModeToggle />
                </div>
            </nav>
        </>
    )
}

export default Header