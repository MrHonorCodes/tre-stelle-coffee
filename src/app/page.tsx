/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect } from 'react';
import FadeIn from '../../components/ui/FadeIn';
import ScrollReveal from '../../components/ui/ScrollReveal';

import dynamic from 'next/dynamic';

// Use Next.js dynamic import with SSR disabled
const VideoSection = dynamic(() => import('../../components/ui/VideoSection'), { 
  ssr: false 
});

export default function Home() {
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
    <section className="relative h-screen overflow-hidden bg-primary pt-16">
      <div className="container mx-auto px-4 h-[calc(100%-80px)] flex items-center">
        <div className="w-full md:w-1/2 lg:w-2/5 text-light-text relative z-10 md:pl-8">
          <FadeIn delay={0.2}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Bridging the gap between modern & traditional coffee!
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-base md:text-lg mb-8 max-w-lg">
              We partner with trusted suppliers to bring you the finest coffee beans, carefully selected from farms worldwide. Discover the harmony of tradition and quality in every cup.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap gap-4">
              <a href="/shop" className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary">
                Shop Now
              </a>
              <a href="/about" className="px-8 py-3 text-light-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-light-text hover:text-primary border-2 border-light-text">
                Learn More
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Video Embed Section */}
          <VideoSection />

      </div>
    </section>

      {/* About Section with tertiary color accents */}
      <section className="py-24 bg-soft-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <ScrollReveal className="lg:w-1/2">
              <span className="text-sm text-secondary uppercase tracking-wider font-semibold mb-4 block">
                Since 2019
              </span>
              <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Coffee Roasting Company
              </h2>
                <p className="text-gray-700 mb-4">
                Founded in late 2019 as a dedicated roasting company with the support of his father, Jonathan&apos;s business has since grown into a full-fledged Coffee Shop & Roastery. Beyond serving exceptional coffee, our mission is to create an inclusive space that welcomes individuals from all walks of life.
                </p>
              <p className="text-gray-700 mb-6">
                We take pride in sourcing the finest beans from around the world and roasting them to perfection, creating unique flavor profiles that highlight each coffee&apos;s natural characteristics.
              </p>
              <a href="/about" className="px-8 py-3 bg-tertiary text-light-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-tertiary border-2 border-tertiary">
                About Us
              </a>
            </ScrollReveal>
            <ScrollReveal className="lg:w-1/2" delay={0.2} direction="right">
              {/* Add border with primary color */}
              <div className="rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-video bg-tertiary border-4 border-primary"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Feature Section with primary/tertiary color combination */}
      <section className="py-16 bg-tertiary text-light-text">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-8">Our Coffee Journey</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-primary/20 p-6 rounded-lg hover:bg-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sourcing</h3>
                  <p>We partner with farmers who are passionate about quality and sustainability.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="bg-primary/20 p-6 rounded-lg hover:bg-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Roasting</h3>
                  <p>We roast in small batches to ensure the perfect flavor profile for each bean.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="bg-primary/20 p-6 rounded-lg hover:bg-primary/30 transition-all duration-300 h-full">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Serving</h3>
                  <p>We prepare each cup with care, highlighting the unique qualities of our beans.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      {/* Location Section with wave divider */}
<section className="relative bg-primary py-24">
  {/* Wavy top divider */}
  <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180" style={{ height: '100px', transform: 'translateY(-99px)' }}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-soft-white"></path>
    </svg>
  </div>
  
  <div className="container mx-auto px-4">
    <ScrollReveal>
      <h2 className="text-4xl font-bold text-center text-light-text mb-16">Where to Find us?</h2>
    </ScrollReveal>
    
    <div className="bg-soft-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
      <ScrollReveal delay={0.1}>
        <div className="relative rounded-full p-4 bg-white">
          <img 
            src="/images/Tre-Stelle-Co-Coffee-Shop.jpg" 
            alt="Tre Stelle Coffee Shop Storefront" 
            className="w-full object-cover rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Tre+Stelle+Coffee+Storefront';
            }}
          />
          <div className="absolute inset-0 bg-primary/20 rounded-full"></div>
        </div>
        
        <div className="p-8 text-center">
          <h3 className="text-3xl font-bold text-primary mb-4">Tre Stelle Coffee Co.</h3>
          <address className="not-italic mb-6 text-lg">
            17390 Preston Road, suite 210<br/>
            Dallas, Texas 75252
          </address>
          <a 
            href="https://maps.google.com/?q=17390+Preston+Road+suite+210+Dallas+Texas+75252" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary text-light-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary"
          >
            VIEW LOCATION
          </a>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

{/* Contact and Follow Section */}
<section className="relative py-20 bg-tertiary text-light-text overflow-hidden">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-primary-fix/80"></div>
    <div 
      className="absolute inset-0 bg-primary-fix text-white bg-cover bg-center opacity-30 rounded-lg" 
      style={{ 
      backgroundImage: "url('/images/coffee-bean-1.jpg')", 
      backgroundSize: 'cover'
      }}
    ></div>
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
            Have questions or need assistance? Reach out to Tre Stelle Coffee Co. — We&apos;re here to help!
            </p>
          
          <div className="flex items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:contact@trestellecoffeeco.com" className="hover:text-secondary transition-colors">
              contact@trestellecoffeeco.com
            </a>
          </div>
          
          <div className="flex items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:9723734355" className="hover:text-secondary transition-colors">
              (972) 373-4355
            </a>
          </div>
          
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <address className="not-italic hover:text-secondary transition-colors">
              17390 Preston road suite 210<br/>
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
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>
    </main>
  );
}