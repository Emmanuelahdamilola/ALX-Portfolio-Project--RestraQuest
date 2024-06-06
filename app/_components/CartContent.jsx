import { Button } from '@/components/ui/button'; 
import { Trash } from 'lucide-react'; 
import Image from 'next/image'; 
import React, { useContext } from 'react'; 
import GlobalApi from '../_utils/GlobalApi'; 
import { toast } from 'sonner'; 
import { CartUpdate } from '../_context/CartUpdate'; 
import Link from 'next/link'; 

// Component for rendering cart content
function CartContent({ cart = [] }) {
  // Get updateCart state and setUpdateCart function from CartUpdate context
  const { updateCart, setUpdateCart } = useContext(CartUpdate); 

  // Calculate the total amount of the cart
  const calculateCartAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Remove item from the cart
  const removeItemFromCart = (id) => {
    GlobalApi.DeleteItemFromCart(id).then(resp => {
      if (resp) {
        // Show success message
        toast('Item Removed successfully!'); 

        // Trigger update of cart
        setUpdateCart(!updateCart); 
      } else {
        // Show error message
        toast('Failed to remove item'); 
      }
    }).catch(error => {
      console.error("Error removing item from cart:", error);

      // Show error message
      toast('Error removing item from cart'); 
    });
  };

  return (
    <div className='h-[500px] overflow-auto'>
      
      <div className='flex flex-col gap-3 mt-3'>
        {cart.map((item, index) => (
          <div key={index} className='flex justify-between items-center gap-5 bg-white p-4 rounded-lg shadow-md'>
            <div>
              <Image 
                className='w-[70px] h-[70px] object-cover rounded-lg' 
                src={item.productImage} 
                alt={item.productName} 
                width={70} 
                height={70} 
              />
            </div>
            <div className='flex flex-col'>
              <h2 className='text-primary font-bold'>{item?.productName}</h2>
              {cart.length > 0 && <h2 className='text-sm font-bold text-left'>{cart[0]?.restaurant?.name}</h2>}
              <h2 className='font-bold text-left pt-1 text-md'>
                ${item?.price} 
              </h2>
            </div>
            
            <div>
              <Trash 
                onClick={() => removeItemFromCart(item.id)} 
                className='text-slate-500 h-5 w-5 cursor-pointer' 
              />
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <div className='absolute bottom-3 w-[90%]'>
            <h2 className='font-bold flex justify-between text-slate-400 py-1'>Subtotal <span>${calculateCartAmount()}</span></h2>
            <Link href={'/checkoutpage?restaurant='+cart[0]?.restaurant?.name}>
              <Button className='w-full'>
                Checkout 
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartContent;
