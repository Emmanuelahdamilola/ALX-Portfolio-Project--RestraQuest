import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { CirclePlus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdate } from '@/app/_context/CartUpdate';

function MenuSection({ restaurant }) {
    // Get the logged-in user information
    const { user } = useUser();

    // Context for updating the cart
    const { updateCart, setUpdateCart } = useContext(CartUpdate)

    // State to store the list of menu items based on the selected category
    const [menuList, setMenuList] = useState(null);

    useEffect(() => {
        // Filter the menu when the component mounts or when the restaurant menu changes
        restaurant?.menu && filterMenu(restaurant?.menu[0]?.category)
    }, [restaurant])

    // Filter the menu based on the selected category
    const filterMenu = (category) => {
        const result = restaurant?.menu?.filter((item) => item.category === category);
        setMenuList(result[0] || { category, menuItem: [] });
    };

    // Add selected menu item to the cart
    const addToCartHandler = (item) => {
        const data = {
            email: user?.primaryEmailAddress?.emailAddress,
            name: item.name,
            description: item?.description,
            productImage: item?.productImage?.url,
            price: item?.price,
            restaurantSlug: restaurant.slug
        }

        // Adding menu to the cart
        GlobalApi.AddToCart(data).then(resp => {
            console.log(resp);
            setUpdateCart(!updateCart);
            toast('Added to Cart')
        }, (error) => {
            toast('Error while adding to cart')
        })
    }

    return (
        <div className='grid grid-cols-4 mt-2'>

            {/* Display the menu categories */}
            <div className='hidden md:flex flex-col gap-3 mr-10 bg-green-50 rounded-lg'>
                {restaurant?.menu?.map((item, index) => (
                    <Button key={index}
                        className='text-primary flex justify-start text-md'
                        onClick={() => filterMenu(item.category)}
                        variant='ghost'>{item.category}</Button>
                ))}
            </div>

            {/* Display the menus according to selected category */}
            <div className='md:col-span-3 col-span-4'>
                <h2 className='text-lg font-extrabold text-primary'>{menuList?.category}</h2>
                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 '>
                    {menuList?.menuItem?.map((item, index) => (
                        <div key={index} className='flex gap-3 p-2 rounded-lg border bg-green-50 shadow-lg cursor-pointer hover:border-green-500'>
                            <Image
                                src={item?.productImage?.url}
                                alt={item.name}
                                width={130}
                                height={130}
                                className='w-[130px] h-[130px] rounded-xl object-cover '
                            />
                            <div className='flex flex-col gap-2 '>
                                <h2 className='font-bold md:text-md text-sm text-green-500'>{item.name}</h2>
                                <h2 className='text-sm line-clamp-2 text-green-700'>{item.description}</h2>
                                <div className='flex justify-between items-center pt-2 font-bold gap-4'>
                                    <h2>${item.price}</h2>
                                    <span><CirclePlus
                                        onClick={() => addToCartHandler(item)}
                                        className=' cursor-pointer text-green-500' /></span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuSection;
