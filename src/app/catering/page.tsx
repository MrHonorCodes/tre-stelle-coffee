import type { Metadata } from 'next';
import ContactSection from '../../../components/layout/ContactSection';

export const metadata: Metadata = {
	title: 'Catering Services | Tre Stelle Coffee Co.',
	description: 'Professional catering services by Tre Stelle Coffee Co. Perfect for corporate events, weddings, and special occasions.',
};

export default function CateringPage() {
	return (
		<div className="min-h-screen bg-soft-white">
			{/* Hero Section */}
			<section className="relative h-64 bg-primary flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
						Catering Services
					</h1>
					<p className="text-xl text-white">
						Bringing exceptional coffee experiences to your event
					</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="py-16 px-4">
				<div className="container mx-auto max-w-4xl">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-primary mb-6">
							Professional Coffee Catering
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed">
							Make your event memorable with our premium coffee catering services. 
							From corporate meetings to weddings and special celebrations, we bring 
							the finest Ethiopian coffee experience directly to you.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 mb-12">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h3 className="text-xl font-semibold text-primary mb-4">
								Corporate Events
							</h3>
							<p className="text-gray-700 mb-4">
								Elevate your business meetings, conferences, and corporate gatherings 
								with our professional coffee service.
							</p>
							<ul className="text-gray-600 space-y-2">
								<li>• Fresh brewed specialty coffee</li>
								<li>• Professional barista service</li>
								<li>• Complete setup and cleanup</li>
								<li>• Customizable menu options</li>
							</ul>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h3 className="text-xl font-semibold text-primary mb-4">
								Special Occasions
							</h3>
							<p className="text-gray-700 mb-4">
								Perfect for weddings, birthday parties, and other celebrations 
								where you want to offer your guests something special.
							</p>
							<ul className="text-gray-600 space-y-2">
								<li>• Wedding coffee stations</li>
								<li>• Birthday and anniversary parties</li>
								<li>• Community events</li>
								<li>• Private gatherings</li>
							</ul>
						</div>
					</div>

					<div className="text-center">
						<h3 className="text-2xl font-semibold text-primary mb-6">
							Ready to Discuss Your Event?
						</h3>
						<p className="text-lg text-gray-700 mb-8">
							Contact us to learn more about our catering services and get a custom quote for your event.
						</p>
						<div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
							<a
								href="tel:(972) 555-0123"
								className="inline-block bg-secondary text-primary font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-secondary/80 hover:-translate-y-1"
							>
								Call Us: (972) 555-0123
							</a>
							<a
								href="mailto:catering@trestellecoffee.com"
								className="inline-block bg-primary text-secondary font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
							>
								Email Us
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<ContactSection />
		</div>
	);
}