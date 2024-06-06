import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'

function RestaurantReviewList({ reviewList }) {
    return (
        <div className='flex flex-col gap-5'>
            {/* Display each review */}
            {reviewList ? reviewList.map((review, index) => (
                <div key={index} className='flex gap-5 items-center border rounded-lg p-2 md:p-4 bg-gray-50'>
                    {/* Display user profile image */}
                    <Image 
                        className='rounded-full border-slate-400 shadow-md' 
                        src={review.profileImage ? review.profileImage : '/default-profile.png'} 
                        alt='profileImage'
                        width={50}
                        height={50} 
                    />
                    <div>
                        {/* Display user name and review date */}
                        <h2 className='text-sm'>
                            <span className='font-semibold'>{review.userName}</span> at {moment(review.publishedAt).format('DD/MMM/yyyy')}
                        </h2>
                        {/* Display user rating */}
                        <ReactRating style={{ maxWidth: 100 }} value={review.star} isDisabled={true} />
                        {/* Display user review text */}
                        <h2 className='sm:text-sm'>{review.reviewText}</h2>
                    </div>
                </div>
            ))
            :
            // Placeholder for loading animation
            [1, 2, 3, 4, 5].map((item, index) => (
                <div key={index} className='w-full h-[110px] rounded-lg bg-slate-200 animate-pulse'></div>
            ))
            }
        </div>
    )
}

export default RestaurantReviewList
