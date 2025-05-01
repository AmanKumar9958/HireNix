import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import data from '../companiesData/data.json'

const LandingPage = () => {
    return (
        <div className=''>
            <div className='grid-bg'></div>
            <div className='flex items-center justify-center min-h-screen gap-1 lg:gap-10 flex-col lg:flex-col'>
                {/* Hero Section */}
                <div className='flex flex-col mb-5 lg:mb-1 lg:flex-row'>
                    {/* Right (Image) */}
                    <div className='order-1 lg:order-2'>
                        <img src="man.png" alt="Man searching job" />
                    </div>

                    {/* Left (Text) */}
                    <div className='flex flex-col items-center justify-center order-2 lg:order-1 px-3 lg:px-0'>
                        <h1 className='text-2xl lg:text-4xl font-bold text-center'>Welcome to the JobHunt</h1>
                        <p className='mt-4 text-[1.09rem] lg:text-lg text-center'>Find your dream job or post a job for others.</p>
                        <div className='flex items-center justify-center mt-4 gap-4'>
                            <Link to={'/jobs'}>
                                <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-bold'>
                                    Find Jobs
                                </button>
                            </Link>
                            <Link to={'/post-job'}>
                                <button className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-bold'>
                                    Post a Job
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Carousel */}
                <div className="flex items-center justify-center overflow-x-hidden py-2 px-4 rounded-xl carousel-container">
                    <Carousel className="w-full max-w-6xl">
                        <CarouselContent className="flex gap-6">
                        {data.map(({ id, name, path }) => (
                            <CarouselItem
                            key={id}
                            className="flex flex-col items-center justify-center  rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-105 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                            >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                                <img
                                src={path}
                                alt={name}
                                className="w-20 h-full object-contain"
                                />
                            </div>
                            <h2 className="text-center text-sm sm:text-base font-semibold mt-3 text-gray-700 company-name">
                                {name}
                            </h2>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                    </Carousel>
                </div>

            </div>
            
        </div>
    )
}

export default LandingPage