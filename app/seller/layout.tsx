'use client';

import React, { Suspense } from 'react';
import SellerSidebar from '@/components/SellerSidebar';

function SellerLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex relative h-full">
                {/* Seller Sidebar */}
                <SellerSidebar />

                {/* Main Content Area */}
                <div className="flex-1 ml-[60px] min-w-0 h-full relative p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <SellerLayoutContent>{children}</SellerLayoutContent>
        </Suspense>
    );
}
