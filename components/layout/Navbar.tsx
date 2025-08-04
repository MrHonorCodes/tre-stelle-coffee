'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../../src/context/CartContext';

// Simple external link icon
const ExternalLinkIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-3 w-3 ml-1"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
		/>
	</svg>
);

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSmallDropdownOpen, setIsSmallDropdownOpen] = useState(false);
	const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
	const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const smallDropdownRef = useRef<HTMLDivElement>(null);
	const aboutDropdownXlRef = useRef<HTMLDivElement>(null);
	const aboutDropdownLgRef = useRef<HTMLDivElement>(null);
	const aboutDropdownMdRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { getItemCount } = useCart();
	const itemCount = getItemCount();

	const navLinks = [
		{ 
			name: 'About Us', 
			path: '/about-us',
			dropdown: [
				{ name: 'Our Story', path: '/about-us' },
				{ name: 'Find Us', path: '/find-us' }
			]
		},
		{ name: 'Our Products', path: '/products' },
		{ name: 'Wholesale', path: '/wholesale' },
		{ name: 'Book Event', path: '/events' },
		{ name: 'Catering', path: '/catering' },
		{ name: 'Order Ahead', path: 'https://trestellecoffeeco.square.site/', external: true },
	];

	// Effect to set isClient to true only on the client after mount
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Close dropdowns when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
			if (smallDropdownRef.current && !smallDropdownRef.current.contains(event.target as Node)) {
				setIsSmallDropdownOpen(false);
			}
			// Check all about dropdown refs
			const aboutRefs = [aboutDropdownXlRef, aboutDropdownLgRef, aboutDropdownMdRef];
			const clickedOutsideAbout = aboutRefs.every(ref => 
				!ref.current || !ref.current.contains(event.target as Node)
			);
			if (clickedOutsideAbout) {
				setIsAboutDropdownOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef, smallDropdownRef, aboutDropdownXlRef, aboutDropdownLgRef, aboutDropdownMdRef]);

	return (
		<header className="fixed w-full z-50 shadow-md py-4 bg-secondary-light" style={{ top: '48px' }}>
			<div className="container mx-auto px-4">
				<nav className="flex justify-between items-center">
					<Link href="/" className="flex-shrink-0 relative flex items-center space-x-3">
						<div className="p-1 bg-primary rounded-md inline-block">
							<Image
								src="/images/white-logo.png"
								alt="Tre Stelle Coffee Co. Logo"
								width={120}
								height={40}
								className="h-10 w-auto"
							/>
						</div>
						<div className="flex items-center justify-center">
							<h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-primary tracking-wide text-center whitespace-nowrap">
								TRE STELLE COFFEE CO.
							</h1>
						</div>
					</Link>

					{/* Desktop and Large Tablet Navigation - Only at widest desktop */}
					<div className="hidden xl:flex items-center space-x-6">
						{navLinks.map((link) => {
							if (link.external) {
								return (
									<Link
										key={link.name}
										href={link.path}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-secondary text-primary font-semibold rounded-md text-sm transition-all duration-300 hover:bg-secondary/80 flex items-center hover:-translate-y-1 transform"
									>
										<span>{link.name}</span>
										<ExternalLinkIcon />
									</Link>
								);
							}
							
							if (link.dropdown) {
								// Handle dropdown links - Desktop uses hover
								const isActive = link.dropdown.some(dropdownItem => pathname === dropdownItem.path);
								return (
									<div 
										key={link.name} 
										className="relative" 
										ref={aboutDropdownXlRef}
										onMouseEnter={() => setIsAboutDropdownOpen(true)}
										onMouseLeave={() => setIsAboutDropdownOpen(false)}
									>
										<button
											className={`font-medium text-sm transition-colors duration-300 relative group flex items-center ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
										>
											<span>{link.name}</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={`h-4 w-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
											<span
												style={{
													content: "''",
													position: 'absolute',
													height: '2px',
													width: isActive ? '100%' : '0',
													left: '0',
													bottom: '-4px',
													backgroundColor: isActive
														? 'var(--color-secondary-darker)'
														: 'var(--color-secondary)',
													transition: 'all 0.3s ease',
												}}
												className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
											></span>
										</button>
										{isAboutDropdownOpen && (
											<div
												className="absolute left-0 pt-2 w-48"
												style={{ zIndex: 50 }}
											>
												<div className="rounded-md shadow-lg py-1 bg-soft-white">
													{link.dropdown.map((dropdownItem) => (
														<Link
															key={dropdownItem.name}
															href={dropdownItem.path}
															className="block px-4 py-3 hover:text-secondary transition-colors duration-200 text-sm text-primary"
															onClick={() => setIsAboutDropdownOpen(false)}
														>
															{dropdownItem.name}
														</Link>
													))}
												</div>
											</div>
										)}
									</div>
								);
							}
							
							// Handle regular links
							const isActive = pathname === link.path;
							return (
								<Link
									key={link.name}
									href={link.path}
									className={`font-medium text-sm transition-colors duration-300 relative group ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
								>
									<span>{link.name}</span>
									<span
										style={{
											content: "''",
											position: 'absolute',
											height: '2px',
											width: isActive ? '100%' : '0',
											left: '0',
											bottom: '-4px',
											backgroundColor: isActive
												? 'var(--color-secondary-darker)'
												: 'var(--color-secondary)',
											transition: 'all 0.3s ease',
										}}
										className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
									></span>
								</Link>
							);
						})}
						{/* Cart button for xl screens */}
						<Link
							href="/cart"
							className="relative text-primary hover:text-secondary transition-colors p-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							{/* Only render badge on client AND if itemCount > 0 */}
							{isClient && itemCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</Link>
					</div>

					{/* Mid-sized device navigation (fewer items with More dropdown) */}
					<div className="hidden lg:flex xl:hidden items-center space-x-4">
						{navLinks.slice(0, 4).map((link) => {
							// Show first 4 links normally
							if (link.dropdown) {
								// Handle dropdown links - Desktop uses hover
								const isActive = link.dropdown.some(dropdownItem => pathname === dropdownItem.path);
								return (
									<div 
										key={link.name} 
										className="relative" 
										ref={aboutDropdownLgRef}
										onMouseEnter={() => setIsAboutDropdownOpen(true)}
										onMouseLeave={() => setIsAboutDropdownOpen(false)}
									>
										<button
											className={`font-medium text-sm transition-colors duration-300 relative group flex items-center ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
										>
											<span>{link.name}</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={`h-4 w-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
											<span
												style={{
													content: "''",
													position: 'absolute',
													height: '2px',
													width: isActive ? '100%' : '0',
													left: '0',
													bottom: '-4px',
													backgroundColor: isActive
														? 'var(--color-secondary-darker)'
														: 'var(--color-secondary)',
													transition: 'all 0.3s ease',
												}}
												className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
											></span>
										</button>
										{isAboutDropdownOpen && (
											<div
												className="absolute left-0 pt-2 w-48"
												style={{ zIndex: 50 }}
											>
												<div className="rounded-md shadow-lg py-1 bg-soft-white">
													{link.dropdown.map((dropdownItem) => (
														<Link
															key={dropdownItem.name}
															href={dropdownItem.path}
															className="block px-4 py-3 hover:text-secondary transition-colors duration-200 text-sm text-primary"
															onClick={() => setIsAboutDropdownOpen(false)}
														>
															{dropdownItem.name}
														</Link>
													))}
												</div>
											</div>
										)}
									</div>
								);
							}
							
							const isActive = pathname === link.path;
							return (
								<Link
									key={link.name}
									href={link.path}
									className={`font-medium text-sm transition-colors duration-300 relative group ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
								>
									<span>{link.name}</span>
									<span
										style={{
											content: "''",
											position: 'absolute',
											height: '2px',
											width: isActive ? '100%' : '0',
											left: '0',
											bottom: '-4px',
											backgroundColor: isActive
												? 'var(--color-secondary-darker)'
												: 'var(--color-secondary)',
											transition: 'all 0.3s ease',
										}}
										className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
									></span>
								</Link>
							);
						})}
						{/* Dropdown for additional menu items on mid-sized devices */}
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className={`font-medium text-sm flex items-center transition-colors duration-300 ${isDropdownOpen ? 'text-secondary' : 'text-primary'}`}
							>
								<span>More</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={`h-4 w-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{isDropdownOpen && (
								<div
									className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-soft-white"
									style={{ zIndex: 50 }}
								>
									{navLinks.slice(4).map((link) => {
										// Remaining links in dropdown
										if (link.external) {
											return (
												<Link
													key={link.name}
													href={link.path}
													target="_blank"
													rel="noopener noreferrer"
													className="w-full text-left px-4 py-2 my-1 bg-secondary text-primary font-semibold rounded-md text-sm transition-all duration-300 hover:bg-secondary/80 flex items-center justify-between hover:-translate-y-1 transform"
													onClick={() => setIsDropdownOpen(false)}
												>
													<span>{link.name}</span>
													<ExternalLinkIcon />
												</Link>
											);
										}
										
										if (link.dropdown) {
											// Handle dropdown items in the More dropdown
											return (
												<div key={link.name}>
													<div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
														{link.name}
													</div>
													{link.dropdown.map((dropdownItem) => (
														<Link
															key={dropdownItem.name}
															href={dropdownItem.path}
															className="block px-6 py-2 hover:text-secondary transition-colors duration-200 text-sm text-primary"
															onClick={() => setIsDropdownOpen(false)}
														>
															{dropdownItem.name}
														</Link>
													))}
												</div>
											);
										}
										
										return (
											<Link
												key={link.name}
												href={link.path}
												className="block px-4 py-3 hover:text-secondary transition-colors duration-200 text-sm text-primary"
												onClick={() => setIsDropdownOpen(false)}
											>
												{link.name}
											</Link>
										);
									})}
								</div>
							)}
						</div>
						{/* Cart button for lg screens */}
						<Link
							href="/cart"
							className="relative text-primary hover:text-secondary transition-colors p-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							{/* Only render badge on client AND if itemCount > 0 */}
							{isClient && itemCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</Link>
					</div>

					{/* Small tablet navigation (even fewer items) */}
					<div className="hidden md:flex lg:hidden items-center space-x-3">
						{navLinks.slice(0, 2).map((link) => {
							// Show first 2 links normally
							if (link.dropdown) {
								// Handle dropdown links - Tablet/mobile uses click
								const isActive = link.dropdown.some(dropdownItem => pathname === dropdownItem.path);
								return (
									<div key={link.name} className="relative" ref={aboutDropdownMdRef}>
										<button
											onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
											className={`font-medium text-sm transition-colors duration-300 relative group flex items-center ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
										>
											<span>{link.name}</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={`h-4 w-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
											<span
												style={{
													content: "''",
													position: 'absolute',
													height: '2px',
													width: isActive ? '100%' : '0',
													left: '0',
													bottom: '-4px',
													backgroundColor: isActive
														? 'var(--color-secondary-darker)'
														: 'var(--color-secondary)',
													transition: 'all 0.3s ease',
												}}
												className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
											></span>
										</button>
										{isAboutDropdownOpen && (
											<div
												className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-soft-white"
												style={{ zIndex: 50 }}
											>
												{link.dropdown.map((dropdownItem) => (
													<Link
														key={dropdownItem.name}
														href={dropdownItem.path}
														className="block px-4 py-3 hover:text-secondary transition-colors duration-200 text-sm text-primary"
														onClick={() => setIsAboutDropdownOpen(false)}
													>
														{dropdownItem.name}
													</Link>
												))}
											</div>
										)}
									</div>
								);
							}
							
							const isActive = pathname === link.path;
							return (
								<Link
									key={link.name}
									href={link.path}
									className={`font-medium text-sm transition-colors duration-300 relative group ${isActive ? 'text-secondary-darker' : 'text-primary hover:text-secondary'}`}
								>
									<span>{link.name}</span>
									<span
										style={{
											content: "''",
											position: 'absolute',
											height: '2px',
											width: isActive ? '100%' : '0',
											left: '0',
											bottom: '-4px',
											backgroundColor: isActive
												? 'var(--color-secondary-darker)'
												: 'var(--color-secondary)',
											transition: 'all 0.3s ease',
										}}
										className={`link-underline ${!isActive ? 'group-hover:w-full' : ''}`}
									></span>
								</Link>
							);
						})}
						{/* Dropdown for additional menu items on small tablet */}
						<div className="relative" ref={smallDropdownRef}>
							<button
								onClick={() => setIsSmallDropdownOpen(!isSmallDropdownOpen)}
								className={`font-medium text-sm flex items-center transition-colors duration-300 ${isSmallDropdownOpen ? 'text-secondary' : 'text-primary'}`}
							>
								<span>More</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={`h-4 w-4 ml-1 transition-transform duration-300 ${isSmallDropdownOpen ? 'rotate-180' : ''}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{isSmallDropdownOpen && (
								<div
									className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-soft-white"
									style={{ zIndex: 50 }}
								>
									{navLinks.slice(2).map((link) => {
										// Remaining links in dropdown
										if (link.external) {
											return (
												<Link
													key={link.name}
													href={link.path}
													target="_blank"
													rel="noopener noreferrer"
													className="w-full text-left px-4 py-2 my-1 bg-secondary text-primary font-semibold rounded-md text-sm transition-all duration-300 hover:bg-secondary/80 flex items-center justify-between hover:-translate-y-1 transform"
													onClick={() => setIsSmallDropdownOpen(false)}
												>
													<span>{link.name}</span>
													<ExternalLinkIcon />
												</Link>
											);
										}
										
										if (link.dropdown) {
											// Handle dropdown items in the More dropdown
											return (
												<div key={link.name}>
													<div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
														{link.name}
													</div>
													{link.dropdown.map((dropdownItem) => (
														<Link
															key={dropdownItem.name}
															href={dropdownItem.path}
															className="block px-6 py-2 hover:text-secondary transition-colors duration-200 text-sm text-primary"
															onClick={() => setIsSmallDropdownOpen(false)}
														>
															{dropdownItem.name}
														</Link>
													))}
												</div>
											);
										}
										
										return (
											<Link
												key={link.name}
												href={link.path}
												className="block px-4 py-3 hover:text-secondary transition-colors duration-200 text-sm text-primary"
												onClick={() => setIsSmallDropdownOpen(false)}
											>
												{link.name}
											</Link>
										);
									})}
								</div>
							)}
						</div>
						{/* Cart button for md screens */}
						<Link
							href="/cart"
							className="relative text-primary hover:text-secondary transition-colors p-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							{/* Only render badge on client AND if itemCount > 0 */}
							{isClient && itemCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</Link>
					</div>

					{/* Mobile Menu Toggle + Cart Icon */}
					<div className="flex items-center space-x-4 md:hidden">
						{/* Cart Icon for Mobile - Conditional render based on isClient */}
						<Link
							href="/cart"
							className="relative text-primary hover:text-secondary transition-colors p-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							{/* Only render badge on client AND if itemCount > 0 */}
							{isClient && itemCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</Link>
						{/* Mobile Menu Toggle Button */}
						<button
							onClick={() => {
								setIsOpen(!isOpen);
								// Reset mobile dropdown when closing main menu
								if (isOpen) {
									setIsMobileAboutDropdownOpen(false);
								}
							}}
							className="text-primary hover:text-secondary transition-colors"
							aria-label="Toggle menu"
						>
							{isOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</nav>
			</div>

			{/* Mobile menu content (cart icon removed from here) */}
			<div
				className={`md:hidden absolute top-full left-0 w-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} bg-soft-white`}
			>
				<div className="py-3 space-y-1 px-4 flex flex-col items-center text-center">
					{navLinks.map((link) => {
						if (link.external) {
							return (
								<Link
									key={link.name}
									href={link.path}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full py-3 my-1 bg-secondary text-primary font-semibold rounded-md text-base transition-all duration-300 hover:bg-secondary/80 flex items-center justify-center hover:-translate-y-1 transform"
									onClick={() => setIsOpen(false)}
								>
									<span>{link.name}</span>
									<ExternalLinkIcon />
								</Link>
							);
						}
						
						if (link.dropdown) {
							// Handle dropdown items in mobile navigation
							return (
								<div key={link.name} className="w-full">
									<button
										onClick={() => setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen)}
										className="w-full py-3 text-lg font-semibold text-primary border-b border-gray-200 mb-2 flex items-center justify-center gap-2 hover:text-secondary transition-colors"
									>
										<span>{link.name}</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={`h-5 w-5 transition-transform duration-300 ${isMobileAboutDropdownOpen ? 'rotate-180' : ''}`}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>
									<div 
										className={`overflow-hidden transition-all duration-300 ease-in-out ${
											isMobileAboutDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
										}`}
									>
										{link.dropdown.map((dropdownItem) => (
											<Link
												key={dropdownItem.name}
												href={dropdownItem.path}
												className="block py-3 text-base hover:text-secondary transition-colors w-full text-primary text-center bg-gray-50/80"
												onClick={() => {
													setIsOpen(false);
													setIsMobileAboutDropdownOpen(false);
												}}
											>
												{dropdownItem.name}
											</Link>
										))}
									</div>
								</div>
							);
						}
						
						return (
							<Link
								key={link.name}
								href={link.path}
								className="block py-2 text-lg hover:text-secondary transition-colors w-full text-primary"
								onClick={() => setIsOpen(false)}
							>
								{link.name}
							</Link>
						);
					})}
				</div>
			</div>
		</header>
	);
}
