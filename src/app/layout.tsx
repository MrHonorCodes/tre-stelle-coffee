import './globals.css';
// Navbar and Footer are now imported in InnerLayoutClient
// import Navbar from '../../components/layout/Navbar';
// import Footer from '../../components/layout/Footer';
// ClientLayout is now used within InnerLayoutClient
// import ClientLayout from '../../components/layout/ClientLayout';
// import SmoothScroller from '../../components/ui/SmoothScroller';
import BackToTop from '../../components/ui/BackToTop';
import { CartProvider } from '../context/CartContext';
// usePathname is no longer needed here
// import { usePathname } from 'next/navigation';
import InnerLayoutClient from './InnerLayoutClient'; // Import the new component

export const metadata = {
	title: 'Tre Stelle Coffee Co. | Premium Coffee Roastery',
	description:
		'Premium coffee roastery bridging modern and traditional coffee craftsmanship since 2019.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// const pathname = usePathname(); // Removed
	// const isStudioPage = pathname.startsWith('/studio'); // Removed

	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className="flex flex-col min-h-screen bg-soft-white text-dark-text"
			>
				<CartProvider>
					<InnerLayoutClient>{children}</InnerLayoutClient> {/* Use the new component here */}
					{/* Navbar, ClientLayout, and Footer are now inside InnerLayoutClient */}
					{/* {!isStudioPage && <Navbar />} // Removed */}
					{/* <ClientLayout> // Removed */}
					{/*   <div className="flex-grow"> // Removed */}
					{/*     {children} // Removed - children are passed to InnerLayoutClient */}
					{/*   </div> // Removed */}
					{/* </ClientLayout> // Removed */}
					{/* {!isStudioPage && <Footer />} // Removed */}
					<BackToTop />
				</CartProvider>
			</body>
		</html>
	);
}
