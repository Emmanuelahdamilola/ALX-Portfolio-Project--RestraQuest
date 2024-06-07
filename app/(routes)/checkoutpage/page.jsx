/**
 * Checkout component for handling user checkout process
 * Renders billing details and cart summary
 * Handles order creation and payment through PayPal
 */
'use client'
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { useUser } from '@clerk/nextjs';
import { CartUpdate } from '@/app/_context/CartUpdate';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';

function Checkout() {
    // Get URL search parameters
    const params = useSearchParams();
    // Get the logged-in user information
    const { user } = useUser();
    // State to store cart items
    const [cart, setCart] = useState([]);
    // Context for updating the cart
    const { updateCart, setUpdateCart } = useContext(CartUpdate);
    // State variables for calculating totals
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryAmount, setDeliveryAmount] = useState(5);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    // State variables for user information
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [zip, setZip] = useState();
    const [address, setAddress] = useState();

    // State variable for loading
    const [loading, setLoading] = useState(false);


    // Effect to fetch user cart when user or updateCart changes
    useEffect(() => {
        user && GetUserCart();
    }, [user, updateCart]);

    // Fetch user cart information
    const GetUserCart = () => {
        GlobalApi.UserCart(user?.primaryEmailAddress?.emailAddress).then(resp => {
            setCart(resp?.userCarts);
            calculateTotalAmount(resp?.userCarts);
        });
    };

    // Calculate the total amount of the cart items
    const calculateTotalAmount = (cart_) => {
        let total = 0;
        cart_.forEach((item) => {
            total += item.price;
        });
        const subtotal = total;
        const tax = total * 0.07;
        const grandTotal = total + tax + deliveryAmount;

        setSubtotal(subtotal.toFixed(2));
        setTax(tax.toFixed(2));
        setTotal(grandTotal);
    };

    // Add order to the database
    const addToOrder = () => {
        setLoading(true);
        const data = {
            email: user.primaryEmailAddress.emailAddress,
            orderAmount: total.toFixed(2),
            restaurantName: params.get('restaurant'),
            username: user.fullName,
            phoneNumber: phone,
            zipCode: zip,
            address: address
        };
        GlobalApi.CreateNewOrder(data).then(resp => {
            const resultedId = resp?.createOrder?.id;
            if (resultedId) {
                cart.forEach((item) => {
                    GlobalApi.UpdateOrderToAddedOrder(item.productName, item.price, resultedId, user?.primaryEmailAddress.emailAddress).then(result => {
                        setLoading(false);
                        toast('Order Successfully!');
                        setUpdateCart(!updateCart);
                    }, (error) => {
                        setLoading(false);
                    })
                })
            };
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <div className='bg-green-600'>
            <h2 className='text-2xl my-5 font-bold p-5 text-center text-white'> Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5 bg-white'>
                <div className=' md:col-span-2 md:mx-20'>
                    <h2 className='text-2xl font-bold'>Billing Details</h2>
                    <div className=' mt-3'>
                        <Input onChange={(e) => setUserName(e.target.value)} placeholder='Username' />
                    </div>
                    <div className='mt-3'>
                        <Input onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>
                    <div className='mt-3'>
                        <Input onChange={(e) => setPhone(e.target.value)} placeholder='phone number' />
                    </div>
                    <div className='mt-3'>
                        <Input onChange={(e) => setZip(e.target.value)} placeholder=' Zip Code' />
                    </div>
                    <div className='mt-3'>
                        <Input onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                    </div>
                </div>
                <div className='md:mx-10 border'>
                    <h2 className='bg-green-400 font-bold text-center p-3 text-white'> Total Cart  ({cart?.length})</h2>
                    <div className='flex flex-col gap-4 p-4'>
                        <h2 className='flex justify-between font-bold'>Subtotal : <span>${subtotal}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Delivery : <span>${deliveryAmount}</span></h2>
                        <h2 className='flex justify-between'>Tax (7%) : <span>${tax}</span></h2>
                        <hr />
                        <h2 className='flex justify-between font-bold'>Total : <span>${total.toFixed(2)}</span></h2>

                        {/* implement the paypal button for payment */}
                        {total > 5 && <PayPalButtons
                        
                            disabled={!(username && email && address && zip) || loading}
                            style={{ layout: 'horizontal' }}
                            onApprove={addToOrder}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: total.toFixed(2),
                                                currency_code: 'USD'
                                            }
                                        }
                                    ]
                                })
                            }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
