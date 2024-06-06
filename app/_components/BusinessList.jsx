import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import BusinessListLoading from './BusinessListLoading';

function BusinessList() {
    // Hook to get URL search parameters
    const params = useSearchParams();

    // State variables

    // State for category filter
    const [category, setCategory] = useState('all'); 
    // State for the list of businesses
    const [businessList, setBusinessList] = useState([]); 
    // State for loading status
    const [loading, setLoading] = useState(false); 

    // Effect to fetch business list when URL search parameters change
    useEffect(() => {
        if (params) {
            const categoryParam = params.get('category'); 
            setCategory(categoryParam || 'all-menu'); 
            // Fetch business list based on category
            getBusinessList(categoryParam || 'all-menu'); 
        }
    }, [params]); // Dependency on params

    // Function to fetch business list
    const getBusinessList = async (category_) => {
        // Set loading to true while fetching
        setLoading(true); 
        // Fetch business list from API
        try {
            const resp = await GlobalApi.GetBusiness(category_); 
            // Log response for debugging
            console.log(resp); 
            // Set business list state with fetched data
            setBusinessList(resp?.restaurants || []); 
            // Set loading to false after fetching
            setLoading(false); 

        } catch (error) {
            // Log error if fetching fails
            console.error('Error fetching restaurants:', error); 
        }
    };

    return (
        <div className='mt-10'>
            {/* Title */}
            <h2 className='font-bold text-2xl'>Popular Restaurants</h2>

            {/* Number of results */}
            <h2 className='text-primary font-bold'>{businessList.length} Results</h2>

            {/* Grid layout for business list */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-5'>
                
                {/* Render business list items or loading placeholders */}
                {!loading ? businessList.map((restaurant, index) => (
                    <BusinessListItem
                        key={index}
                        business={restaurant} />
                )) :
                [1,2,3,4,5,6,7,8,9].map((item, index)=>(
                    <BusinessListLoading key={index} />
                ))
                }
            </div>
        </div>
    );
}

export default BusinessList;
