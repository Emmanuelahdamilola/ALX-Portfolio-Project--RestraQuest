// Directive indicating this is a client-side rendered component
'use client'; 

import React, { useEffect, useRef, useState } from 'react'; 
import GlobalApi from '../_utils/GlobalApi'; 
import Image from 'next/image'; 
import Link from 'next/link'; 
import { useSearchParams } from 'next/navigation'; 
import { ArrowRightCircle } from 'lucide-react'; 


// Component for rendering a list of categories
function CategoryList() {
  // Reference to list container
  const listRef = useRef(null); 

  // State for category list
  const [categoryList, setCategoryList] = useState([]); 

  // Hook to get URL search parameters
  const params = useSearchParams(); 

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('all_menu'); 

  // Effect to update selected category when URL search parameters change
  useEffect(() => {
    setSelectedCategory(params.get('category')); // Update selected category based on URL parameter
  }, [params]);

  // Effect to fetch category list on component mount
  useEffect(() => {
    getCategoryList(); // Fetch category list
  }, []);

  // Function to fetch category list
  const getCategoryList = async () => {
    try {
      // Fetch category list from API
      const resp = await GlobalApi.GetCategory(); 
      // Log categories for debugging
      console.log(resp.categories); 
      // Set category list state
      setCategoryList(resp.categories); 
    } catch (error) {
      // Log error if fetching fails
      console.error('Error fetching categories:', error); 
    }
  };

  // Function to handle scrolling right in the category list
  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 150,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <div className='relative mt-10'>
        {/* Title */}
        <h1 className='p-4 text-xl font-extrabold text-primary'>Categories</h1>

        {/* Category list */}
        <div className='flex gap-4 overflow-auto scrollbar-hide ' ref={listRef}>

          {/* Map through categoryList */}
          {categoryList && categoryList.map((category, index) => (
            <Link href={'?category=' + category.slug} key={index}
              className={`flex flex-col items-center gap-3 min-w-28 p-3 border rounded-md cursor-pointer
          hover:border-primary hover:bg-green-50 hover:shadow-lg group
          ${selectedCategory == category.slug && 'bg-primary text-white border-primary shadow-md'}`}>

              {/* Display category icon and name */}
              {category.icon?.url && (
                <div>
                  <Image
                    src={category.icon.url}
                    alt={category.name}
                    width={40}
                    height={40}
                    className='group-hover:scale-110 transition-all duration-200'
                  />
                  <h2 className='text-sm font-semibold group-hover:text-primary'>{category.name}</h2>
                </div>
              )}
            </Link>
          ))}
        </div>
        
        {/* Scroll right button */}
        <ArrowRightCircle onClick={scrollRightHandler} className='absolute -right-3 md:-right-10 w-6 h-6 bg-primary rounded-3xl text-white top-20 cursor-pointer' />
      </div>
    </div>
  );
}

export default CategoryList;
