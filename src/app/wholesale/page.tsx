'use client';
import { useEffect, useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import ContactSection from '../../../components/layout/ContactSection';

export default function Wholesale() {
	// Add smooth scrolling effect
	useEffect(() => {
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	// State for wholesale inquiry form
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		businessName: '',
		businessType: '',
		monthlyVolume: '',
		additionalInfo: '',
	});

	// Handle form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Form submission logic
		const subject = 'New Wholesale Partnership Inquiry';
		const body = `
Name: ${formData.name}
Email: ${formData.email}
Business Name: ${formData.businessName}
Business Type: ${formData.businessType || 'Not specified'}
Estimated Monthly Volume: ${formData.monthlyVolume}
Additional Information:
${formData.additionalInfo || 'None provided'}
    `;
		const mailtoLink = `mailto:contact@trestellecoffeeco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	};

	return (
		<main className="min-h-screen bg-soft-white">
			{/* Hero Section with image background */}
			<section className="relative h-[60vh] overflow-hidden bg-primary pt-16 flex items-center">
				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-3xl mx-auto text-center">
						<FadeIn delay={0.2}>
							<h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-secondary">
								Wholesale Partnerships
							</h1>
						</FadeIn>
						<FadeIn delay={0.4}>
							<p className="text-xl text-light mb-8">
								Quality coffee solutions for cafes, restaurants, offices, and more
							</p>
						</FadeIn>
					</div>
				</div>

				{/* Background overlay */}
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-maroon/80"></div>
					<div
						className="absolute inset-0 bg-cover bg-center opacity-50 bg-maroon"
						style={{
							backgroundImage: "url('/images/wholesale.jpg')",
							backgroundSize: 'cover',
							filter: 'brightness(0.4)',
						}}
					></div>
				</div>
			</section>

			{/* Intro Section */}
			<section className="py-20 bg-soft-white">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center mb-16">
						<ScrollReveal>
							<span className="text-sm text-tertiary uppercase tracking-wider font-semibold">
								Partner With Us
							</span>
							<h2 className="text-4xl font-bold text-primary mt-4 mb-6">
								We love partnering up with other local businesses!
							</h2>
							<p className="text-gray-700">
								At Tre Stelle Coffee Co., we&apos;re passionate about helping businesses elevate
								their coffee offerings. As a locally owned Roastery, we understand the importance of
								quality, consistency, and personalized service. Our goal is to be more than just a
								supplier – we aim to be your partner in creating exceptional coffee experiences.
							</p>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-16 bg-primary text-light">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<ScrollReveal>
							<h2 className="text-3xl font-bold mb-8">What We Offer</h2>
						</ScrollReveal>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<ScrollReveal delay={0.1}>
								<div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
									<div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-secondary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-2">Premium Coffee</h3>
									<p>
										Fresh-roasted specialty coffee beans from around the world, available in bulk
										quantities for your business needs.
									</p>
								</div>
							</ScrollReveal>
							<ScrollReveal delay={0.2}>
								<div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
									<div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-secondary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-2">Barista Training</h3>
									<p>
										Professional training for your staff to ensure quality and consistency in every
										cup served at your establishment.
									</p>
								</div>
							</ScrollReveal>
							<ScrollReveal delay={0.3}>
								<div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
									<div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-secondary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-2">Consulting Services</h3>
									<p>
										Expert advice on menu development, equipment selection, and workflow
										optimization for coffee service.
									</p>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-24 bg-soft-white">
				<div className="container mx-auto px-4">
					<div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
						{/*             <ScrollReveal className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-video bg-tertiary border-4 border-primary relative">
                <img 
                    src="/images/roasting.jpg" 
                    alt="Coffee roasting process" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Coffee+Roasting';
                    }}
                />
                </div>
            </div>
            </ScrollReveal> */}
						<ScrollReveal className="lg:w-1/2 text-center" delay={0.2} direction="right">
							<span className="text-sm text-tertiary uppercase tracking-wider font-semibold mb-4 block">
								Why Choose Us
							</span>
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
								Quality, Consistency & Partnership
							</h2>
							<p className="text-gray-700 mb-4">
								For all our wholesale partners, we can provide numerous coffee offerings, cold brew,
								barista training, consultation, and much more! Our commitment to quality and
								freshness ensures your customers experience the best coffee possible.
							</p>
							<p className="text-gray-700 mb-6">
								We work closely with each partner to develop a customized program that meets your
								specific needs and budget. Whether you&apos;re a café, restaurant, office, or retail
								shop, we&apos;ll help you create a coffee program that delights your customers and
								sets you apart.
							</p>
							<div className="grid grid-cols-2 gap-4 mb-6">
								<div className="flex items-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-secondary mr-2 mt-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Freshly Roasted</span>
								</div>
								<div className="flex items-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-secondary mr-2 mt-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Quality Control</span>
								</div>
								<div className="flex items-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-secondary mr-2 mt-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Reliable Delivery</span>
								</div>
								<div className="flex items-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-secondary mr-2 mt-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>Ongoing Support</span>
								</div>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Wholesale Inquiry Form Section */}
			<section id="inquiry-form" className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<ScrollReveal>
						<div className="max-w-4xl mx-auto">
							<span className="text-sm text-tertiary uppercase tracking-wider font-semibold block text-center">
								Get In Touch
							</span>
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-2 text-center">
								Ready to partner with us?
							</h2>
							<p className="text-gray-600 text-center mb-12">
								Fill out the form below to inquire about our wholesale partnership opportunities. We&apos;ll get back to you within 24 hours to discuss how we can work together.
							</p>

							<form onSubmit={handleSubmit} className="bg-soft-white rounded-xl shadow-md p-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
									<div>
										<label htmlFor="name" className="block text-gray-700 font-medium mb-2">
											Full Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											placeholder="Enter your full name"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-gray-700 font-medium mb-2">
											Email Address <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											placeholder="Enter your email address"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
									<div>
										<label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
											Business Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="businessName"
											name="businessName"
											value={formData.businessName}
											onChange={handleInputChange}
											placeholder="Enter your business name"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
									<div>
										<label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">
											Business Type
										</label>
										<select
											id="businessType"
											name="businessType"
											value={formData.businessType}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										>
											<option value="">Select business type</option>
											<option value="cafe">Café</option>
											<option value="restaurant">Restaurant</option>
											<option value="office">Office</option>
											<option value="retail">Retail Shop</option>
											<option value="hotel">Hotel/Hospitality</option>
											<option value="catering">Catering Service</option>
											<option value="other">Other</option>
										</select>
									</div>
								</div>

								<div className="mb-6">
									<label htmlFor="monthlyVolume" className="block text-gray-700 font-medium mb-2">
										Estimated Monthly Volume <span className="text-red-500">*</span>
									</label>
									<select
										id="monthlyVolume"
										name="monthlyVolume"
										value={formData.monthlyVolume}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
									>
										<option value="">Select estimated monthly volume</option>
										<option value="5-10 lbs">5-10 lbs (Small Office/Café)</option>
										<option value="10-25 lbs">10-25 lbs (Medium Business)</option>
										<option value="25-50 lbs">25-50 lbs (Large Restaurant/Café)</option>
										<option value="50-100 lbs">50-100 lbs (Multiple Locations)</option>
										<option value="100+ lbs">100+ lbs (Enterprise)</option>
										<option value="unsure">Unsure - Need Consultation</option>
									</select>
								</div>

								<div className="mb-8">
									<label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
										Additional Information
									</label>
									<textarea
										id="additionalInfo"
										name="additionalInfo"
										value={formData.additionalInfo}
										onChange={handleInputChange}
										rows={5}
										placeholder="Please share any additional details about your business, specific coffee preferences, equipment needs, or questions you may have."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
									></textarea>
								</div>

								<div className="flex justify-center">
									<button
										type="submit"
										className="px-8 py-4 bg-secondary text-dark-text border-2 border-secondary font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-transparent hover:text-secondary hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-secondary/30 cursor-pointer"
									>
										Submit Partnership Inquiry
									</button>
								</div>
							</form>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Contact Section */}
			<ContactSection />
		</main>
	);
}
