'use client';

import React from 'react';
import Link from 'next/link';

export default function FreeShippingBanner() {
	return (
		<Link href="/products">
			<div 
				className="w-full text-center px-4 fixed top-0 left-0 right-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:brightness-110"
				style={{ 
					backgroundColor: '#4a0000', 
					color: '#f8f5f2',
					fontSize: '16px',
					fontWeight: 'bold',
					zIndex: 60,
					height: '48px'
				}}
			>
				🚚 Free Shipping on Orders Over $50! 
				<span className="ml-2 text-sm opacity-75">→ Shop Now</span>
			</div>
		</Link>
	);
}