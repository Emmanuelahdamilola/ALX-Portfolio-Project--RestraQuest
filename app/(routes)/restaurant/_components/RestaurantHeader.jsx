import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function RestaurantHeader({ restaurant }) {
  const [totalRateReview, setTotalRateReview] = useState(0);
  const [averageRateReview, setAverageRateReview] = useState(4.5);

  useEffect(() => {
    if (restaurant) {
      calculateRating();
    }
  }, [restaurant]);

  // calculating the total rating
  const calculateRating = () => {
    let total = 0;
    let count = 0;
    restaurant?.reviews?.forEach(item => {
      total += item.star;
      count++;
    });
    setTotalRateReview(count);
    const result = count > 0 ? total / count : 3;
    setAverageRateReview(result.toFixed(1));
  };

  return (
    <div className='bg-green-50 p-3 rounded-xl'>
      {restaurant?.banner?.url ? (
        <div>
          <Image
            src={restaurant.banner.url}
            width={1000}
            height={200}
            className='w-full object-cover md:h-[450px] rounded-xl'
          />
        </div>
      ) : (
        <div className='h-[450px] w-full bg-slate-100 animate-pulse rounded-xl'></div>
      )}
      <div>
        <h2 className='text-3xl mt-3 font-bold'>{restaurant?.name}</h2>
        <div className='mt-3 flex items-center gap-3'>
          <Image src='/star.png' alt='star' width={30} height={30} />
          <label className='text-slate-500'>{averageRateReview}  <span>({totalRateReview})</span></label>
        </div>
        <h2 className='mt-2 text-slate-500 flex gap-2 items-center'>
          <MapPinIcon className='text-green-600' />
          {restaurant?.address}
        </h2>
        <br />
        <hr />
      </div>
    </div>
  );
}

export default RestaurantHeader;
