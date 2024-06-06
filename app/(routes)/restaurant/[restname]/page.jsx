'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import RestaurantHeader from '../_components/RestaurantHeader';
import GlobalApi from '@/app/_utils/GlobalApi';
import RestaurantTabs from '../_components/RestaurantTabs';

function RestaurantDetail() {
    const param = usePathname();
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        GetRestaurantDetail(param.split('/')[2])
    }, [])
    const GetRestaurantDetail = async (restraSlug) => {
        try {
            const resp = await GlobalApi.GetBusinessDetail(restraSlug);
            console.log(resp);
            setRestaurant(resp?.restaurant || []);
        } catch (error) {
            console.error('Error fetching restaurant:', error);
        }
    };

    return (
        <div className='px-5 md:px-10 bg-green-50'>
            <RestaurantHeader restaurant={restaurant}/>
            <RestaurantTabs restaurant={restaurant} />
        </div>
    )
}

export default RestaurantDetail