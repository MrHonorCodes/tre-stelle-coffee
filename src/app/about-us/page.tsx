/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

export default function AboutUs() {
// Add smooth scrolling effect
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
    document.documentElement.style.scrollBehavior = 'auto';
    };
}, []);

return (
    <main className="min-h-screen bg-soft-white">
    {/* Hero Section with maroon background */}
    <section className="relative h-[60vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
        {/* Overlay with coffee beans background */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-50" 
            style={{ 
            backgroundImage: "url('/images/about-us-banner.jpg')", 
            backgroundSize: 'cover',
            filter: 'brightness(0.4)',
            }}
        />
        <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-secondary">
        <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-light-text">
            About Us
            </h1>
        </FadeIn>
        </div>
    </section>

    {/* Main Content Section */}
    <section className="py-16 md:py-24 bg-soft-white">
        <div className="container mx-auto px-4">
        {/* Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <ScrollReveal>
            <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                src="/images/coffee-roasting-process.jpg" 
                alt="Coffee Roasting Process" 
                className="w-full aspect-video object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=Coffee+Roasting';
                }}
                />
            </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
            <span className="text-sm text-tertiary uppercase tracking-wider font-semibold mb-4 block">
                ABOUT US
            </span>
            <h2 className="text-3xl md:text-5xl text-primary font-bold mb-6">
                Tre Stelle Coffee Co.
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                Tre Stelle Coffee Co. was founded in late 2019, initially as a specialized micro-roasting company; since then, we have expanded into a full-service Coffee Shop & Roastery. Beyond serving exceptional coffee, our core mission is to create an inclusive coffee business that welcomes individuals from all backgrounds and walks of life.
            </p>
            <Link href="/products" className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary">
                Our Products
            </Link>
            </ScrollReveal>
        </div>
        
        {/* Inspiration Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden mb-24">
            <ScrollReveal className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Inspiration
            </h2>
            <p className="text-gray-700 mb-2 text-lg">
                The name &quot;Tre Stelle&quot; draws inspiration from a well-known cafe in Asmara, Eritrea; Eritrea has rich Italian cultural influences, and &quot;Tre Stelle&quot; translates to &quot;Three Stars&quot; in Italian.
            </p>
            <p className="text-gray-700 text-lg">
                In 2019, our founder, Jonathan traveled to Eritrea and visited this café, which inspired him to adopt the name for our business.
            </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="h-full">
            <img 
                src="/images/eritrea-cafe.jpg" 
                alt="Original Tre Stelle Café in Eritrea" 
                className="w-full h-full object-cover"
                onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Original+Cafe+in+Eritrea';
                }}
            />
            </ScrollReveal>
        </div>
        
        {/* Sourcing Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
            <ScrollReveal className="order-2 md:order-1 h-full">
            <img 
                src="/images/coffee-beans-sack.jpg" 
                alt="Coffee Beans in Burlap Sack" 
                className="w-full h-full object-cover"
                onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Coffee+Beans';
                }}
            />
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="p-8 md:p-12 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Sourcing
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
                We work with green coffee suppliers who source beans from farms worldwide, ensuring we access only the highest quality coffee. This approach guarantees that farmers receive fair compensation for their hard work in producing exceptional beans.
            </p>
            <p className="text-gray-700 text-lg">
                This arrangement also creates greater transparency in the supply chain, establishing a direct line of communication between farmers, importers, and our roastery.
            </p>
            </ScrollReveal>
        </div>
        </div>
    </section>
    
    {/* Values Section with maroon background */}
    <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Values</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={0.1}>
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
                <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Inclusion</h3>
                <p className="text-center">
                We strive to create a welcoming space for people from all backgrounds and walks of life to enjoy great coffee together.
                </p>
            </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
                <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Quality</h3>
                <p className="text-center">
                From sourcing to roasting to brewing, we are committed to excellence at every step of the coffee-making process.
                </p>
            </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
                <div className="bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Community</h3>
                <p className="text-center">
                We believe in building relationships with our customers, suppliers, and the greater Dallas community.
                </p>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>

    
    {/* CTA Section */}
    <section className="py-16 bg-soft-white text-tertiary">
        <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
            Come experience our coffee, meet our team, and become part of the Tre Stelle community.
            </p>
            <div className="flex flex-col items-center gap-4">
                <a href="/find-us" className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary">
                    Visit Our Coffee Shop
                </a>
                {/* Contact Info from find-us page */}
                <div className="flex items-center justify-center mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tertiary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:9723734355" className="text-xl hover:text-secondary transition-colors">
                    (972) 373-4355
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tertiary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:contact@trestellecoffeeco.com" className="text-xl hover:text-secondary transition-colors">
                    contact@trestellecoffeeco.com
                    </a>
                </div>
            </div>
        </ScrollReveal>
        </div>
    </section>
    </main>
);
}