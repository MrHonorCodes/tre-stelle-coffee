
'use client';
import ScrollReveal from '../ui/ScrollReveal';

export default function ContactSection() {
	return (
		<section className="relative py-20 bg-tertiary text-light overflow-hidden">
			<div className="absolute inset-0 z-0">
				{/* Image Div */}
				<div
					className="absolute inset-0 bg-primary text-white bg-cover bg-center opacity-15 rounded-lg"
					style={{
						backgroundImage: "url('/images/coffee-bean-1.jpg')",
						backgroundSize: 'cover',
					}}
				></div>
				{/* Gradient Overlay Div - Placed above image, below main overlay */}
				<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-tertiary to-transparent pointer-events-none rounded-t-lg"></div>
				{/* Main Color Overlay */}
				<div className="absolute inset-0 bg-primary/80"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
					{/* Contact Us Column */}
					<ScrollReveal direction="left">
						<div>
							<h3 className="text-2xl font-bold mb-8">Business Hours:</h3>
							<p className="text-xl mb-2 font-bold">Mon-Fri: 7am – 5pm</p>
							<p className="text-xl mb-8 font-bold">Sat-Sun: 7am – 6pm</p>

							<h3 className="text-3xl font-bold mb-4">Contact us</h3>
							<div className="w-16 h-1 bg-secondary mb-8"></div>

							<p className="mb-6">
								Have questions or need assistance? Reach out to Tre Stelle Coffee Co. — We&apos;re
								here to help!
							</p>

							<div className="flex items-start mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-secondary mr-3 mt-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<a
									href="mailto:contact@trestellecoffeeco.com"
									className="hover:text-secondary transition-colors"
								>
									contact@trestellecoffeeco.com
								</a>
							</div>

							<div className="flex items-start mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-secondary mr-3 mt-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<a href="tel:9723734355" className="hover:text-secondary transition-colors">
									(972) 373-4355
								</a>
							</div>

							<div className="flex items-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-secondary mr-3 mt-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<address className="not-italic hover:text-secondary transition-colors">
									17390 Preston Road, Suite 210
									<br />
									Dallas, Texas 75252
								</address>
							</div>
						</div>
					</ScrollReveal>

					{/* Follow Us Column */}
					<ScrollReveal direction="right">
						<div className="flex flex-col h-full justify-center items-center md:items-start">
							<h3 className="text-3xl font-bold mb-4">Follow Us</h3>
							<div className="w-16 h-1 bg-secondary mb-12"></div>

							<div className="flex space-x-6">
								<a
									href="https://www.facebook.com/Tre-Stelle-Coffee-Co-101818161638598/"
									target="_blank"
									rel="noopener noreferrer"
									className="h-14 w-14 rounded-full bg-primary flex items-center justify-center border-2 border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
									</svg>
								</a>
								<a
									href="https://www.instagram.com/trestellecoffee/"
									target="_blank"
									rel="noopener noreferrer"
									className="h-14 w-14 rounded-full bg-primary flex items-center justify-center border-2 border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</svg>
								</a>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}