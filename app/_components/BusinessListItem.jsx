import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function BusinessListItem({ business }) {
  
  // Function to calculate the average rating of the business
  const calculateRating = () => {
    let total = 0; 
    let count = 0; 

     // Loop through reviews
    business?.reviews.forEach(item => {
      // Sum up the star rating
      total = total + item.star; 
      // Increment count
      count++; 
    });

    // Calculate average rating
    const result = total / count; 
    // Return average rating with one decimal place, default to 5 if no rating available
    return result ? result.toFixed(1) : 5; 
  };

  return (
    // Link to the individual restaurant page
    <Link href={'/restaurant/' + business?.slug} className='p-3 hover:border hover:border-primary hover:rounded-lg bg-white'>
      <div className='relative w-full h-[150px]'>

        {/* Display business banner */}
        <Image
          src={business.banner?.url} 
          alt={business.name} 
          layout='fill' 
          objectFit='cover' 
          className='rounded-md' 
        />
      </div>

      <div className='mt-3'>
        {/* Business name */}
        <h2 className='text-md sm:text-lg font-bold'>{business.name}</h2>
        <div className='flex justify-between items-center mt-1'>

          <div className='flex items-center gap-2'>
            {/* Star icon */}
            <Image src='/star.png' alt='star' width={15} height={15} />
            {/* Display average rating */}
            <label className='text-gray-400 text-sm'>{calculateRating()}</label>
            {/* Display restaurant type */}
            <h2 className='text-sm text-green-400'>{business?.restraType[0]}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessListItem;
