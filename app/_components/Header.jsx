'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { CartUpdate } from '../_context/CartUpdate'
import GlobalApi from '../_utils/GlobalApi'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CartContent from './CartContent'
import Link from 'next/link'



function Header() {
    // Authenticate if the user is signed in
    const { user, isSignedIn } = useUser();
    const [cart, setCart] = useState([]);

    // Context for updating the cart
    const { updateCart, setUpdateCart } = useContext(CartUpdate);

    // Fetch user cart whenever 'user' or 'updateCart' changes
    useEffect(() => {
        if (user) {
            GetUserCart();
        }
    }, [user, updateCart]);

    // Fetch cart information
    const GetUserCart = () => {
        GlobalApi.UserCart(user?.primaryEmailAddress?.emailAddress).then(resp => {
            console.log(resp);
            setCart(resp?.userCarts);
        });
    };

    return (
        <div className='w-full flex justify-between items-center p-3 md:p-5 md:px-18 shadow-md '>

            <Link href={'/'}>
                <Image src="/logo.jpg" alt='logo'
                    width={200}
                    height={200} />
            </Link>
            {/* Search Bar */}
            <div className='hidden md:flex p-2 bg-gray-50 rounded-sm w-96'>
                <input type="text" name="" id="" className='bg-transparent outline-none w-full' placeholder='Search...' />
                <Search />
            </div>

            {/* Conditional Rendering based on user authentication */}
            {isSignedIn ?
                <div className='flex items-center gap-3'>
                    {/* Shopping Cart */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <ShoppingBasket className='text-md ' />
                                {/* Display number of items in the cart */}
                                <label className='bg-primary text-white rounded-full p-1 px-3'>{cart?.length}</label>
                            </div>
                        </SheetTrigger>
                        {/* Cart Content */}
                        <SheetContent className='w-full bg-green-50'>
                            <SheetHeader>
                                <SheetTitle className='bg-primary text-white font-bold text-lg border-b p-2'>
                                    <h2>My Order</h2>
                                </SheetTitle>
                                <SheetDescription>
                                    {/* Render cart items */}
                                    <CartContent cart={cart} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    {/* User Button */}
                    <UserButton />

                   
                </div>

                // If user is not signed in
                : <div className='flex gap-4 md:gap-6'>
                    {/* Sign In and Sign Up buttons */}
                    <SignInButton mode='modal'>
                        <Button>Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button variant="outline">Sign Up</Button>
                    </SignUpButton>
                </div>
            }
        </div>
    );
}

export default Header;
