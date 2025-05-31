'use client';
import React from 'react';
import Link from 'next/link';

const Sitemap = () => {
	// Define site structure
	const siteStructure = [
		{
			title: 'Main Pages',
			links: [
				{ name: 'Home', path: '/' },
				{ name: 'About Us', path: '/about-us' },
				{ name: 'Our Products', path: '/products' },
				{ name: 'Press', path: '/press' },
				{ name: 'Book Event', path: '/events' },
				{ name: 'Wholesale', path: '/wholesale' },
				{ name: 'Find Us', path: '/find-us' },
				{ name: 'Order Ahead', path: 'https://trestellecoffeeco.square.site/' },
			],
		},
		{
			title: 'Product Categories',
			links: [
				{ name: 'Coffee Beans', path: '/products/coffee-beans' },
				{ name: 'Brewing Equipment', path: '/products/equipment' },
				{ name: 'Merchandise', path: '/products/merchandise' },
				{ name: 'Gift Cards', path: '/products/gift-cards' },
			],
		},
		{
			title: 'About Us',
			links: [
				{ name: 'Our Story', path: '/about-us' },
				{ name: 'Our Team', path: '/about-us/team' },
				{ name: 'Coffee Sourcing', path: '/about-us/sourcing' },
				{ name: 'Sustainability', path: '/about-us/sustainability' },
			],
		},
		{
			title: 'Events',
			links: [
				{ name: 'Private Events', path: '/events/private' },
				{ name: 'Corporate Events', path: '/events/corporate' },
				{ name: 'Coffee Tastings', path: '/events/tastings' },
				{ name: 'Workshops', path: '/events/workshops' },
			],
		},
		{
			title: 'Wholesale',
			links: [
				{ name: 'Wholesale Program', path: '/wholesale' },
				{ name: 'Become a Partner', path: '/wholesale/partner' },
				{ name: 'Current Partners', path: '/wholesale/current-partners' },
			],
		},
		{
			title: 'Customer Support',
			links: [
				{ name: 'Contact Us', path: '/contact' },
				{ name: 'FAQs', path: '/faqs' },
				{ name: 'Shipping & Returns', path: '/shipping-returns' },
			],
		},
		{
			title: 'Legal',
			links: [
				{ name: 'Privacy Policy', path: '/privacy-policy' },
				{ name: 'Terms and Conditions', path: '/terms' },
				{ name: 'Sitemap', path: '/sitemap' },
			],
		},
	];

	return (
		<div className="bg-soft-white py-24">
			<div className="container mx-auto px-4 max-w-5xl">
				<h1 className="text-4xl font-bold text-primary mb-12 text-center">Sitemap</h1>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{siteStructure.map((section, index) => (
						<div key={index} className="bg-white p-6 rounded-lg shadow-md">
							<h2 className="text-xl font-bold text-primary mb-4 pb-2 border-b border-gray-200">
								{section.title}
							</h2>
							<ul className="space-y-2">
								{section.links.map((link, linkIndex) => (
									<li
										key={linkIndex}
										className="hover:translate-x-1 transition-transform duration-200"
									>
										<Link
											href={link.path}
											className="text-tertiary hover:text-secondary transition-colors duration-200 flex items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 mr-2 text-secondary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<p className="text-gray-600">
						This sitemap provides an overview of all available content on our website.
					</p>
					<p className="text-gray-600 mt-2">
						If you can&apos;t find what you&apos;re looking for, please{' '}
						<Link href="/contact" className="text-secondary hover:underline">
							contact us
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Sitemap;
