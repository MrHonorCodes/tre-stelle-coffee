/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import ContactSection from '../../../components/layout/ContactSection';

// Event Package Type - Commented out as the section using it is also commented out
/*
type EventPackage = {
id: number;
name: string;
price: string;
description: string;
features: string[];
popular?: boolean;
};
*/

export default function EventBooking() {
	// Add smooth scrolling effect
	useEffect(() => {
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	// State for form validation
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		time: '',
		hours: '',
		message: '',
	});

	// Event packages - Commented out as the section using it is also commented out
	/*
const eventPackages: EventPackage[] = [
    {
    id: 1,
    name: "Basic Event Space",
    price: "$100/hour",
    description: "Perfect for small gatherings and informal meetings.",
    features: [
        "Up to 25 guests",
        "Basic coffee service",
        "2-hour minimum"
    ]
    },
    {
    id: 2,
    name: "Standard Event Package",
    price: "$150/hour",
    description: "Ideal for birthday parties, art shows, and social gatherings.",
    features: [
        "Up to 50 guests",
        "Dedicated barista",
        "3-hour minimum"
    ],
    popular: true
    },
    {
    id: 3,
    name: "Premium Event Experience",
    price: "$200/hour",
    description: "The complete package for corporate events and special celebrations.",
    features: [
        "Up to 75 guests",
        "Dedicated barista team",
        "4-hour minimum"
    ]
    }
];
*/

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

		// Convert 24-hour time to 12-hour format for the email
		let formattedTime = '';
		if (formData.time) {
			const [hourString, minuteString] = formData.time.split(':');
			let hour = parseInt(hourString, 10);
			const minute = parseInt(minuteString, 10);
			const ampm = hour >= 12 ? 'PM' : 'AM';
			hour = hour % 12;
			hour = hour ? hour : 12; // Convert hour '0' to '12'
			const minuteFormatted = minute < 10 ? '0' + minute : minute;
			formattedTime = `${hour}:${minuteFormatted} ${ampm}`;
		} else {
			formattedTime = 'Not specified'; // Fallback if time is somehow empty despite being required
		}

		// Form submission logic
		const subject = 'New Event Booking Request';
		const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.date}
Start Time: ${formattedTime}
Number of Hours: ${formData.hours}
Event Details:
${formData.message}
    `;
		const mailtoLink = `mailto:contact@trestellecoffeeco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
		// Optional: You might want to still give some feedback to the user on the page,
		// as they will be navigated away to their email client.
		// For example, you could show a temporary message like "Preparing your email..."
		// or reset the form.
		// For now, we'll just navigate.
	};

	return (
		<main className="min-h-screen bg-soft-white">
			{/* Hero Section with maroon background */}
			<section className="relative h-[60vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
				<div className="absolute inset-0 z-0">
					{/* Overlay with coffee event background */}
					<div
						className="absolute inset-0 bg-cover bg-center opacity-50"
						style={{
							backgroundImage: "url('/images/events-banner.jpg')",
							backgroundSize: 'cover',
							filter: 'brightness(0.4)',
						}}
					/>
					<div className="absolute inset-0 bg-primary/70"></div>
				</div>

				<div className="container mx-auto px-4 relative z-10 text-center">
					<FadeIn delay={0.2}>
						<h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-secondary">
							Event Booking
						</h1>
						<p className="text-xl text-light max-w-2xl mx-auto">
							Host your next special occasion in our welcoming coffee shop space
						</p>
					</FadeIn>
				</div>
			</section>

			{/* Event Space Gallery */}
			<section className="py-16 bg-soft-white">
				<div className="container mx-auto px-4">
					<ScrollReveal>
						<h2 className="text-3xl md:text-4xl text-primary font-bold mb-8 text-center">
							Our Versatile Event Space
						</h2>
					</ScrollReveal>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
						<ScrollReveal delay={0.1}>
							<div className="rounded-lg overflow-hidden shadow-md h-64">
								<img
									src="/images/event1.jpg"
									alt="Event Space - Café View"
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
									onError={(e) => {
										(e.target as HTMLImageElement).onerror = null;
										(e.target as HTMLImageElement).src =
											'https://via.placeholder.com/800x600?text=Event+Space';
									}}
								/>
							</div>
						</ScrollReveal>
						<ScrollReveal delay={0.2}>
							<div className="rounded-lg overflow-hidden shadow-md h-64">
								<img
									src="/images/event2.jpg"
									alt="Event Space - Tables Setup"
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
									onError={(e) => {
										(e.target as HTMLImageElement).onerror = null;
										(e.target as HTMLImageElement).src =
											'https://via.placeholder.com/800x600?text=Table+Setup';
									}}
								/>
							</div>
						</ScrollReveal>
						<ScrollReveal delay={0.3}>
							<div className="rounded-lg overflow-hidden shadow-md h-64">
								<img
									src="/images/event3.jpg"
									alt="Event Space - Coffee Bar"
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
									onError={(e) => {
										(e.target as HTMLImageElement).onerror = null;
										(e.target as HTMLImageElement).src =
											'https://via.placeholder.com/800x600?text=Coffee+Bar';
									}}
								/>
							</div>
						</ScrollReveal>
					</div>

					<ScrollReveal>
						<div className="bg-white rounded-xl shadow-md p-8 md:p-10">
							<h3 className="text-2xl text-primary font-bold mb-6 text-center">
								A perfect venue for celebrations, corporate events, and creative showcases!
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
								<div>
									<h4 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">
										Event Details
									</h4>
									<ul className="space-y-3">
										<li className="flex items-start">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-secondary mr-2 flex-shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<div>
												<span className="font-medium">Timing:</span>
												<br />
												Mon-Fri: 5:30pm-12am
												<br />
												Sat-Sun: 6:30pm-12am
											</div>
										</li>
										<li className="flex items-start">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-secondary mr-2 flex-shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
												/>
											</svg>
											<div>
												<span className="font-medium">Capacity:</span> 75 guests maximum
											</div>
										</li>
										<li className="flex items-start">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-secondary mr-2 flex-shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<div>
												<span className="font-medium">Pricing:</span> Event space rental begins at{' '}
												<span className="text-primary font-semibold">$120/hour</span>
											</div>
										</li>
										<li className="flex items-start">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-secondary mr-2 flex-shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
												/>
											</svg>
											<div>
												<span className="font-medium">Service:</span> A barista will be present to
												monitor and will serve espresso-based drinks for sale
											</div>
										</li>
									</ul>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<h4 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2 text-green-600">
											Allowed
										</h4>
										<ul className="space-y-2">
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-green-500 mr-2"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												BYOB
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-green-500 mr-2"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												Outside food catering
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-green-500 mr-2"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												DJ or band
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-green-500 mr-2"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												Sitting outside
											</li>
										</ul>
									</div>

									<div>
										<h4 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2 text-red-600">
											Not Allowed
										</h4>
										<ul className="space-y-2">
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-red-500 mr-2"
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
												Smoking inside
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-red-500 mr-2"
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
												Entering kitchen area
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-red-500 mr-2"
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
												Opening back door
											</li>
											<li className="flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 text-red-500 mr-2"
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
												Using equipment
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Event Packages */}
			{/*  <section className="py-16 bg-tertiary text-light-text">
        <div className="container mx-auto px-4">
        <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Event Packages
            </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPackages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.1}>
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:-translate-y-2 relative ${pkg.popular ? 'ring-2 ring-secondary' : ''}`}>
                {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-primary font-bold py-1 px-4 text-sm">
                    POPULAR
                    </div>
                )}
                <div className="p-8">
                    <h3 className="text-xl font-bold text-primary mb-2">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-primary mb-4">{pkg.price}</div>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <ul className="space-y-2 mb-8">
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                        </li>
                    ))}
                    </ul>
                    <div className="mt-auto">
                    <a 
                        href="#booking-form" 
                        className="block w-full text-center px-6 py-3 bg-primary text-light-text font-medium rounded-lg transition-all duration-300 hover:bg-primary/80"
                    >
                        Book This Package
                    </a>
                    </div>
                </div>
                </div>
            </ScrollReveal>
            ))}
        </div>
        </div>
    </section>
 */}
			{/* Booking Form Section */}
			<section id="booking-form" className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<ScrollReveal>
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-2 text-center">
								Let&apos;s make your event unforgettable!
							</h2>
							<p className="text-gray-600 text-center mb-12">
								Fill out the form below to book your slot. We&apos;ll get back to you within 24
								hours to confirm details.
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

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
									<div>
										<label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
											Phone Number <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											placeholder="Enter your phone number"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
									<div>
										<label htmlFor="date" className="block text-gray-700 font-medium mb-2">
											Event Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											id="date"
											name="date"
											value={formData.date}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
									<div>
										<label htmlFor="time" className="block text-gray-700 font-medium mb-2">
											Start Time <span className="text-red-500">*</span>
										</label>
										<input
											type="time"
											id="time"
											name="time"
											value={formData.time}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
										/>
									</div>
								</div>

								<div className="mb-6">
									<label htmlFor="hours" className="block text-gray-700 font-medium mb-2">
										Number of Hours <span className="text-red-500">*</span>
									</label>
									<select
										id="hours"
										name="hours"
										value={formData.hours}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
									>
										<option value="">Select number of hours</option>
										<option value="2">2 hours</option>
										<option value="3">3 hours</option>
										<option value="4">4 hours</option>
										<option value="5">5 hours</option>
										<option value="6">6 hours</option>
										<option value="7">7+ hours (specify in message)</option>
									</select>
								</div>

								<div className="mb-8">
									<label htmlFor="message" className="block text-gray-700 font-medium mb-2">
										Event Details
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										rows={5}
										placeholder="Please describe your event, including type of event, approximate guest count, and any special requirements."
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
									></textarea>
								</div>

								<div className="flex justify-center">
									<button
										type="submit"
										className="px-8 py-4 bg-secondary text-dark-text border-2 border-secondary font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-transparent hover:text-secondary hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-secondary/30 cursor-pointer"
									>
										Submit Booking Request
									</button>
								</div>
							</form>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-soft-white">
				<div className="container mx-auto px-4">
					<ScrollReveal>
						<h2 className="text-3xl md:text-4xl text-primary font-bold mb-12 text-center">
							Frequently Asked Questions
						</h2>
					</ScrollReveal>

					<div className="max-w-3xl mx-auto">
						<div className="space-y-6">
							<ScrollReveal delay={0.1}>
								<div className="bg-white rounded-lg shadow-md p-6">
									<h3 className="text-xl font-bold text-primary mb-3">
										How far in advance should I book?
									</h3>
									<p className="text-gray-600">
										We recommend booking at least 2-3 weeks in advance for weekday events and 4-6
										weeks for weekend events. Popular dates can fill up quickly, especially during
										holiday seasons.
									</p>
								</div>
							</ScrollReveal>

							<ScrollReveal delay={0.2}>
								<div className="bg-white rounded-lg shadow-md p-6">
									<h3 className="text-xl font-bold text-primary mb-3">
										Can I bring my own food and drinks?
									</h3>
									<p className="text-gray-600">
										Yes! You&apos;re welcome to bring your own food or arrange catering. We also
										allow BYOB for alcoholic beverages. Our barista will be available to serve
										coffee drinks from our menu at regular prices.
									</p>
								</div>
							</ScrollReveal>

							<ScrollReveal delay={0.3}>
								<div className="bg-white rounded-lg shadow-md p-6">
									<h3 className="text-xl font-bold text-primary mb-3">Is a deposit required?</h3>
									<p className="text-gray-600">
										Yes, we require a 50% deposit to secure your booking. The remaining balance is
										due on the day of your event. The deposit is fully refundable with 7 days&apos;
										notice of cancellation.
									</p>
								</div>
							</ScrollReveal>

							<ScrollReveal delay={0.4}>
								<div className="bg-white rounded-lg shadow-md p-6">
									<h3 className="text-xl font-bold text-primary mb-3">Can I decorate the space?</h3>
									<p className="text-gray-600">
										Absolutely! You&apos;re welcome to decorate the space to suit your event. We ask
										that you avoid anything that would damage walls or surfaces (no nails or
										permanent adhesives). Please plan to arrive 30 minutes before your event to set
										up.
									</p>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<ScrollReveal>
						<h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Have Questions?</h2>
						<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
							Our team is ready to help you plan the perfect gathering at Tre Stelle Coffee Co.
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							<a
								href="tel:9723734355"
								className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary flex items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
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
								(972) 373-4355
							</a>
							<a
								href="mailto:contact@trestellecoffeeco.com"
								className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary flex items-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
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
								Email Us
							</a>
						</div>
					</ScrollReveal>
				</div>
			</section>

			{/* Contact Section */}
			<ContactSection />
		</main>
	);
}
