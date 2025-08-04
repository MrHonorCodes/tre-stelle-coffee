'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ClientLayout from '../../components/layout/ClientLayout';
import FreeShippingBanner from '../../components/ui/FreeShippingBanner';

export default function InnerLayoutClient({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isStudioPage = pathname?.startsWith('/studio');

	return (
		<>
			{!isStudioPage && <FreeShippingBanner />}
			{!isStudioPage && <Navbar />}
			{/* <SmoothScroller> - Assuming this is still intended to be commented out or handled elsewhere */}
			<ClientLayout>
				<div className={`flex-grow ${!isStudioPage ? 'mt-26 sm:mt-28' : ''}`}>{children}</div>
			</ClientLayout>
			{!isStudioPage && <Footer />}
			{/* </SmoothScroller> */}
		</>
	);
}
