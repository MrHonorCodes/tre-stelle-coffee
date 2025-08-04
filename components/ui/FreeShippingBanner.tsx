'use client';

import React from 'react';
import Link from 'next/link';

export default function FreeShippingBanner() {
	return (
		<Link href="/products">
			<div className="w-full fixed top-0 left-0 right-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:brightness-110 text-xs sm:text-sm md:text-base font-bold h-10 sm:h-12 bg-primary text-light z-[60] px-2 sm:px-4">
				🚚 Free Shipping on Orders Over $50!
				<span className="hidden md:inline ml-2 text-xs opacity-75">→ Shop Now</span>
			</div>
		</Link>
	);
}