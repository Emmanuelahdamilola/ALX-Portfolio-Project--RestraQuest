// Directive indicating this is a client-side rendered component
"use client"; 

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import Footer from "./_components/Footer";
import Slider from "./_components/Slider";


// Home component definition
export default function Home() {
  return (
    
    <div className="bg-slate-50"> 
      <div className="p-5 md:p-20 md:py-5">
        {/* Slider component */}
        <Slider /> 

        {/* Category list component */}
        <CategoryList /> 

        {/* Business list component */}
        <BusinessList /> 
      </div>

      {/* Footer component */}
      <Footer /> 
    </div>
  );
}
