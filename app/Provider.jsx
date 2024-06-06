// Directive indicating this is a client-side rendered component
'use client'; 

import React, { useState } from 'react';
import Header from './_components/Header';
import { Toaster } from '@/components/ui/sonner';
import { CartUpdate } from './_context/CartUpdate';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Provider component definition
function Provider({ children }) {
  // State to manage cart updates
  const [updateCart, setUpdateCart] = useState(false); 

  return (
    // PayPal script provider for PayPal integration
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>

      {/* Context provider for cart updates */}
      <CartUpdate.Provider value={{ updateCart, setUpdateCart }}>
        <div>
          {/* Header component */}
          <Header /> 

          {/* Toaster component for notifications */}
          <Toaster /> 
          
          {/* Render child components */}
          {children} 
        </div>
      </CartUpdate.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;
