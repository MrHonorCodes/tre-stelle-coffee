'use client';

import React from 'react';

export default function FreeShippingBanner() {
	return (
		<div 
			className="w-full text-center px-4 fixed top-0 left-0 right-0 flex items-center justify-center"
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
		</div>
	);
}