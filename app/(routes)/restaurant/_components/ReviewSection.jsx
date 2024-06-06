import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Rating as ReactRating } from '@smastrom/react-rating';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import RestaurantReviewList from './RestaurantReviewList';

function ReviewSection({ restaurant }) {
    // State variables to manage rating, review text, user, and review list
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState();
    const { user } = useUser();
    const [reviewList, setReviewList] = useState();

    useEffect(() => {
        // Fetch review list when the restaurant prop changes
        restaurant && getReviewList();
    }, [restaurant]);

    // Method to submit a review
    const ReviewSubmitBtn = () => {
        const data = {
            email: user?.primaryEmailAddress.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            star: rating,
            reviewText: reviewText,
            RestraSlug: restaurant.slug
        };
        // Add new review to the restaurant
        GlobalApi.AddNewReview(data).then(resp => {
            console.log(resp);
            toast('Review Added!');
            resp && getReviewList();
        });
    };

    // Method to fetch review list
    const getReviewList = () => {
        GlobalApi.RestaurantReviews(restaurant.slug).then(resp => {
            console.log(resp);
            setReviewList(resp?.reviews);
        });
    };

    return (
        <div className='mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-3 md:gap-10 '>
            {/* Form for adding a review */}
            <div className='flex flex-col gap-2 p-5 rounded-lg '>
                <h2 className='text-primary text-lg font-bold'>Add you Review</h2>
                {/* Rating component */}
                <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
                {/* Textarea for review text */}
                <Textarea onChange={(e) => setReviewText(e.target.value)} placeholder="Type your message here." />
                    
                {/* Button to submit the review */}
                <Button onClick={() => ReviewSubmitBtn()} disabled={rating === 0 || !reviewText} className='mt-5'>Submit</Button>
            </div>

            {/* Display review list */}
            <div className='col-span-2 md:mr-10'>
                <h2 className='text-primary text-lg font-bold py-4'>Reviews</h2>
                {/* Component to display the list of reviews */}
                <RestaurantReviewList reviewList={reviewList} />
            </div>
        </div>
    );
}

export default ReviewSection;
