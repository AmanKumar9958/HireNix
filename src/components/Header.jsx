import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
    return (
        <>
            <nav className='flex justify-between items-center px-10 py-3'>
                <Link to="/" className='hover:scale-110 transition-all duration-200 cursor-pointer font-bold'>JobHunt</Link>
                <Button variant="outline" className='cursor-pointer'>Login</Button>
            </nav>
        </>
    )
}

export default Header