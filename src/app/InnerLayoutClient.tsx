'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ClientLayout from '../../components/layout/ClientLayout';

export default function InnerLayoutClient({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isStudioPage = pathname?.startsWith('/studio');

	return (
		<>
			{!isStudioPage && <Navbar />}
			{/* <SmoothScroller> - Assuming this is still intended to be commented out or handled elsewhere */}
			<ClientLayout>
				<div className="flex-grow">{children}</div>
			</ClientLayout>
			{!isStudioPage && <Footer />}
			{/* </SmoothScroller> */}
		</>
	);
}
