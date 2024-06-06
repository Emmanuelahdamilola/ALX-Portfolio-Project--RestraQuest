import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import AboutRest from './AboutRest';

function RestaurantTabs({ restaurant }) {
    return (
        // Define tabs with default value and styling
        <Tabs defaultValue="category" className="w-full mt-5 bg-white p-3 rounded-xl">
            <TabsList>
                {/* Trigger for the Menu tab */}
                <TabsTrigger value="category">Menu</TabsTrigger>

                {/* Trigger for the Reviews tab */}
                <TabsTrigger value="review">Reviews</TabsTrigger>

            </TabsList>

            {/* Content for the Menu section */}
            <TabsContent value="category"><MenuSection restaurant={restaurant} /></TabsContent>

            {/* Content for the Reviews section */}
            <TabsContent value="review">
                <ReviewSection restaurant={restaurant} />
            </TabsContent>
        </Tabs>
    );
}

export default RestaurantTabs;
