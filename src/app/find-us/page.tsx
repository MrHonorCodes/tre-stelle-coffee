'use client'
import { useEffect } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

export default function FindUs() {
// Add smooth scrolling effect
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
    document.documentElement.style.scrollBehavior = 'auto';
    };
}, []);

return (
    <main className="min-h-screen bg-soft-white">
    {/* Hero Section with dark overlay */}
    <section className="relative h-[60vh] overflow-hidden pt-16 flex items-center bg-primary-fix">
        <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
            <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-secondary-fix">
                Find Us
            </h1>
            </FadeIn>
        </div>
        </div>
        
        {/* Background overlay */}
        <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary-fix/90"></div>
        <div 
            className="absolute inset-0 bg-cover bg-top opacity-50 bg-maroon rounded-2xl" 
            style={{ 
            backgroundImage: "url('/images/Tre-Stelle-Co-Coffee-Shop.jpg')", 
            backgroundSize: 'cover',
            filter: 'brightness(0.4)',
            }}
        ></div>
        </div>
    </section>

    {/* Address and Hours Section */}
    <section className="py-16 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
            <h2 className="text-2xl font-bold text-primary mb-8">Address:</h2>
            <p className="text-xl text-gray-700 mb-12">
                17390 Preston road suite 210<br/>
                Dallas, Texas 75252
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-8">Business Hours:</h2>
            <p className="text-xl text-gray-700 mb-12">
                <span className="font-bold">Mon-Fri:</span> 7am-5pm<br/>
                <span className="font-bold">Sat-Sun:</span> 7am-6pm
            </p>
            
            <a 
                href="https://maps.google.com/?q=17390+Preston+Road+suite+210+Dallas+Texas+75252" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary mb-16"
            >
                GET DIRECTIONS
            </a>
            </ScrollReveal>
        </div>
        </div>
    </section>

    {/* Google Maps Section */}
    <section className="pb-20">
        <div className="container mx-auto px-4">
        <ScrollReveal>
            <div className="h-[500px] w-full border-4 border-primary rounded-lg overflow-hidden shadow-xl">
            {/* 
                Google Maps iframe - Replace the src with your actual Google Maps embed URL
                You'll need to get this from Google Maps by searching for your location,
                clicking "Share", selecting "Embed a map" and copying the iframe src
            */}
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.8553251157394!2d-96.80276908482509!3d32.9684054808882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c23d5f10ef4d7%3A0xa9437b247a3e5cb8!2s17390%20Preston%20Rd%20%23210%2C%20Dallas%2C%20TX%2075252!5e0!3m2!1sen!2sus!4v1648141234567!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tre Stelle Coffee Co. Location"
            ></iframe>
            </div>
        </ScrollReveal>
        </div>
    </section>

    {/* Contact Section */}
    <section className="py-16 bg-tertiary text-light-text">
        <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9723734355" className="text-xl hover:text-secondary transition-colors">
                (972) 373-4355
                </a>
            </div>
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@trestellecoffeeco.com" className="text-xl hover:text-secondary transition-colors">
                contact@trestellecoffeeco.com
                </a>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>

    {/* Social Media Section */}
    <section className="py-20 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary mb-8">Connect With Us</h2>
            <p className="text-gray-700 mb-8">
                Follow us on social media to stay updated on our latest offerings, events, and promotions.
            </p>
            <div className="flex justify-center space-x-6">
                <a 
                href="https://www.facebook.com/Tre-Stelle-Coffee-Co-101818161638598/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-14 w-14 rounded-full bg-primary flex items-center justify-center border-2 border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                </a>
                <a 
                href="https://www.instagram.com/trestellecoffee/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-14 w-14 rounded-full bg-primary flex items-center justify-center border-2 border-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                </a>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>
    </main>
);
}