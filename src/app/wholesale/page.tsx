/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

export default function Wholesale() {
// Add smooth scrolling effect
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
    document.documentElement.style.scrollBehavior = 'auto';
    };
}, []);

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
            <span className="text-sm text-tertiary uppercase tracking-wider font-semibold">Partner With Us</span>
            <h2 className="text-4xl font-bold text-primary mt-4 mb-6">We love partnering up with other local businesses!</h2>
            <p className="text-gray-700">
                At Tre Stelle Coffee Co., we&apos;re passionate about helping businesses elevate their coffee offerings. As a locally owned roastery established in 2019, we understand the importance of quality, consistency, and personalized service. Our goal is to be more than just a supplier – we aim to be your partner in creating exceptional coffee experiences.
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Coffee</h3>
                <p>Fresh-roasted specialty coffee beans from around the world, available in bulk quantities for your business needs.</p>
                </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
                <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Barista Training</h3>
                <p>Professional training for your staff to ensure quality and consistency in every cup served at your establishment.</p>
                </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
                <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm h-full hover:bg-white/20 transition-all duration-300">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Consulting Services</h3>
                <p>Expert advice on menu development, equipment selection, and workflow optimization for coffee service.</p>
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
                For all our wholesale partners, we can provide numerous coffee offerings, cold brew, barista training, consultation, and much more! Our commitment to quality and freshness ensures your customers experience the best coffee possible.
            </p>
            <p className="text-gray-700 mb-6">
                We work closely with each partner to develop a customized program that meets your specific needs and budget. Whether you&apos;re a café, restaurant, office, or retail shop, we&apos;ll help you create a coffee program that delights your customers and sets you apart.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Freshly Roasted</span>
                </div>
                <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quality Control</span>
                </div>
                <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Reliable Delivery</span>
                </div>
                <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ongoing Support</span>
                </div>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>



    {/* Contact Section */}
    <section className="py-24 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
            <ScrollReveal>
            <span className="text-sm text-tertiary uppercase tracking-wider font-semibold">Get In Touch</span>
            <h2 className="text-4xl font-bold text-primary mt-4 mb-6">Ready to partner with us?</h2>
            <p className="text-gray-700 mb-8">
                If interested in partnering up with us, please reach us on the following email: 
                <a href="mailto:contact@trestellecoffeeco.com" className="text-primary font-semibold hover:text-secondary transition-colors"> contact@trestellecoffeeco.com</a>
            </p>
            <a 
                href="mailto:contact@trestellecoffeeco.com" 
                className="inline-block px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
            >
                Contact Us Today
            </a>
            </ScrollReveal>
        </div>
        </div>
    </section>
    </main>
);
}