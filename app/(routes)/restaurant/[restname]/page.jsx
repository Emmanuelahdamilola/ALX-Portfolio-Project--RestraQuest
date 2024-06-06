// 'use client': Indicates that this component is used on the client-side.
'use client'

// Imports:
import { usePathname } from 'next/navigation'; 
import React, { useEffect, useState } from 'react'; 
import RestaurantHeader from '../_components/RestaurantHeader'; 
import GlobalApi from '@/app/_utils/GlobalApi'; 
import RestaurantTabs from '../_components/RestaurantTabs'; 

function RestaurantDetail() {
    // State variable to store the current pathname
    const param = usePathname();
    // State variable to store the restaurant details
    const [restaurant, setRestaurant] = useState([]);

    // Effect to fetch restaurant details when the component mounts
    useEffect(() => {
        GetRestaurantDetail(param.split('/')[2]);
    }, []);

    // Function to fetch restaurant details
    const GetRestaurantDetail = async (restraSlug) => {
        try {
            // Making an API request to fetch restaurant details
            const resp = await GlobalApi.GetBusinessDetail(restraSlug); 
            console.log(resp);
            // Updating the restaurant state with the fetched details
            setRestaurant(resp?.restaurant || []); 
        } catch (error) {
            console.error('Error fetching restaurant:', error); 
        }
    };
    return (
        <div className='px-5 md:px-10 bg-green-50'>
             {/* Passing the restaurant details as props to the RestaurantHeader component */}
            <RestaurantHeader restaurant={restaurant}/> 

           {/* Passing the restaurant details as props to the RestaurantTabs component */}
            <RestaurantTabs restaurant={restaurant} /> 
        </div>
    )
}

export default RestaurantDetail;
