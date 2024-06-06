import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'


function Slider() {
    // Autoplay plugin for carousel
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className="relative">

            {/* Carousel component */}
            <Carousel 
                // Autoplay plugin
                plugins={[plugin.current]} 
                className="w-full"
                // Pause autoplay on hover
                onMouseEnter={plugin.current.stop} 
                // Resume autoplay on mouse leave
                onMouseLeave={plugin.current.reset} 
            >
                <CarouselContent>
                    {/* Carousel items */}
                    <CarouselItem>
                        <div className="relative w-full h-[300px] md:h-[500px]">
                            {/* Image */}
                            <Image 
                                src='/hero2.jpg' 
                                alt='slider' 
                                layout='fill' 
                                className='rounded-lg object-cover' 
                            />

                            {/* Overlay */}
                            <div className='absolute inset-0 flex flex-col items-center justify-center p-3 bg-black bg-opacity-45 rounded-lg'>
                                <h2 className='font-semibold text-orange-400'>Welcome to</h2>
                                <h2 className='text-white text-4xl font-bold rounded text-center'>
                                    RestraQuest
                                </h2>
                                <h2 className='text-green-400 text-sm md:text-2xl font-bold p-2 md:p-4 rounded text-center md:w-1/2'>
                                    <p className='md:text-sm font-light text-white'>
                                        From savory to sweet, embark on a culinary journey through our diverse food categories, and uncover the finest restaurants waiting to serve your next delightful meal.
                                    </p>
                                </h2>

                                <Button>Learn More</Button>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="relative w-full h-[300px] md:h-[500px]">
 
                            <Image 
                                src='/hero1.jpg' 
                                alt='slider' 
                                layout='fill' 
                                className='rounded-lg object-cover' 
                            />
                            {/* Overlay */}
                            <div className='absolute inset-0 flex flex-col items-center justify-center p-3 bg-black bg-opacity-45 rounded-lg'>
                                <h2 className='text-white text-md md:text-4xl font-bold rounded text-center'>
                                    DISCOVER RESTAURANT AND FOOD
                                </h2>
                                <h2 className='text-green-400 text-sm md:text-2xl font-bold p-2 md:p-4 rounded text-center md:w-1/2'>
                                    Fresh, Healthy and Delicious meal to reach your optimum health and fitness
                                    <p className='hidden md:flex md:text-sm font-light text-white md:pt-5'>
                                        From savory to sweet, explore our diverse food categories and uncover the top restaurants ready to serve your next delicious meal.
                                    </p>
                                </h2>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>

                {/* Previous button */}
                <CarouselPrevious className='text-primary' />

                {/* Next button */}
                <CarouselNext className='text-primary' />
            </Carousel>
        </div>
    )
}

export default Slider
