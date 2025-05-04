// LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import data from '../companiesData/data.json';
import faq from '../companiesData/faq.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// AutoCarousel Component
const AutoCarousel = ({ data }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollSpeed = 1; // px per frame
        let animationFrameId;

        const scroll = () => {
        scrollContainer.scrollLeft += scrollSpeed;

        // If we've scrolled to the end, reset to start
        if (
            scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
            scrollContainer.scrollWidth
        ) {
            scrollContainer.scrollLeft = 0;
        }

        animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="flex items-center justify-center overflow-x-hidden py-2 px-4 rounded-xl carousel-container">
        <div
            ref={scrollRef}
            className="flex gap-6 w-full max-w-6xl overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
            {data.map(({ id, name, path }) => (
            <div
                key={id}
                className="flex flex-col items-center justify-center rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-105 flex-none basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <img
                    src={path}
                    alt={name}
                    className="w-20 h-full object-contain"
                />
                </div>
                <h2 className="text-center text-sm sm:text-base font-semibold mt-3 text-gray-700">
                {name}
                </h2>
            </div>
            ))}
        </div>
        </div>
    );
};

    // LandingPage Component
const LandingPage = () => {
    return (
        <div className='overflow-x-hidden'>
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
                    <h1 className='text-2xl lg:text-4xl font-bold text-center'>Welcome to the HireNix</h1>
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
                <AutoCarousel data={data} />

                {/* Cards */}
                <div className='flex flex-col lg:flex-row items-center justify-center gap-6 mb-10 mt-5 px-5 lg:px-0'>
                    <div> 
                        <Card className={"bg-[rgba(0,123,255,0.04)] backdrop-blur-md rounded-lg"}>
                            <CardHeader>
                                <CardTitle>For Job Seekers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Search and apply for jobs, track applications and more.</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card className={"bg-[rgba(0,123,255,0.04)] backdrop-blur-md rounded-lg"}>
                            <CardHeader>
                                <CardTitle>For Employers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Post jobs,manage applications, and find the best candidates</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQS */}
                <div className='w-full max-w-4xl px-5 lg:px-2 mb-5 bg-[rgba(0,123,255,0.04)] backdrop-blur-md rounded-lg'>
                    <Accordion type="single" collapsible>
                        {faq.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;