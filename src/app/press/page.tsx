/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

// Press feature type
type PressFeature = {
id: number;
outlet: string;
logo: string;
headline?: string;
excerpt?: string;
date: string;
link: string;
featured?: boolean;
};

export default function Press() {
// Add smooth scrolling effect
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
    document.documentElement.style.scrollBehavior = 'auto';
    };
}, []);

// Press features data
const pressFeatures: PressFeature[] = [
    {
    id: 1,
    outlet: 'WFAA Good Morning Texas',
    logo: '/images/press/wfaa-logo.png',
    headline: 'Local Coffee Shop Brings Global Tastes to Dallas',
    excerpt: 'Tre Stelle Coffee Co. features beans sourced from around the world, roasted locally in Dallas.',
    date: 'September 15, 2023',
    link: 'https://www.wfaa.com',
    featured: true
    },
    {
    id: 2,
    outlet: 'Dallas Morning News',
    logo: '/images/press/dallas-morning-news-logo.png',
    headline: 'Tre Stelle Creates Community Through Coffee',
    excerpt: 'The local roastery is building bridges between cultures and neighborhoods through their inclusive approach.',
    date: 'July 3, 2023',
    link: 'https://www.dallasnews.com'
    },
    {
    id: 3,
    outlet: 'Dallas Weekly',
    logo: '/images/press/dallas-weekly-logo.png',
    headline: 'Eritrean Roots Inspire Dallas Coffee Shop',
    excerpt: 'How a summer trip to East Africa led to one of Dallas\'s most promising coffee businesses.',
    date: 'May 21, 2023',
    link: 'https://www.dallasweekly.com'
    },
    {
    id: 4,
    outlet: 'Daily Coffee News',
    logo: '/images/press/daily-coffee-news-logo.png',
    headline: 'Tre Stelle Focuses on Ethical Sourcing and Inclusion',
    excerpt: 'The Dallas-based roaster is setting a new standard for sustainable relationships with coffee farmers.',
    date: 'April 8, 2023',
    link: 'https://www.dailycoffeenews.com'
    },
    {
    id: 5,
    outlet: 'DALLAS OBSERVER',
    logo: '/images/press/dallas-observer-logo.png',
    headline: 'The Best New Coffee Shops in North Dallas',
    excerpt: 'Tre Stelle Coffee Co. making waves with its unique atmosphere and commitment to quality.',
    date: 'February 12, 2023',
    link: 'https://www.dallasobserver.com'
    }
];

// Get featured press item (if any)
const featuredPress = pressFeatures.find(item => item.featured);
const regularPress = pressFeatures.filter(item => !item.featured);

return (
    <main className="min-h-screen bg-soft-white">
    {/* Hero Section with maroon background */}
    <section className="relative h-[50vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
        {/* Overlay with coffee beans background */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ 
            backgroundImage: "url('/images/coffee-beans-bg.jpg')", 
            backgroundSize: 'cover'
            }}
        />
        <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-light-text">
            Press
            </h1>
        </FadeIn>
        </div>
    </section>

    {/* Press Section */}
    <section className="py-16 md:py-24 bg-soft-white">
        <div className="container mx-auto px-4">
        {/* Introduction Text */}
        <div className="text-center mb-16">
            <FadeIn>
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Tre Stelle in the News
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
                We&apos;re grateful for the attention our coffee and story have received. Here&apos;s some of the 
                press coverage featuring Tre Stelle Coffee Co.
            </p>
            </FadeIn>
        </div>

        {/* Featured Press Item (if exists) */}
        {featuredPress && (
            <div className="mb-20">
            <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="h-16 mb-8 flex items-center">
                        <img 
                        src={featuredPress.logo} 
                        alt={featuredPress.outlet} 
                        className="h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x100?text=${featuredPress.outlet}`;
                        }}
                        />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary font-bold mb-4">
                        {featuredPress.headline}
                    </h3>
                    <p className="text-gray-700 mb-4">
                        {featuredPress.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">{featuredPress.date}</span>
                        <a 
                        href={featuredPress.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-primary text-light-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary"
                        >
                        Read Article
                        </a>
                    </div>
                    </div>
                    <div className="bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                    </div>
                    <img 
                        src="/images/press/tv-interview.jpg" 
                        alt="Television Interview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=TV+Interview';
                        }}
                    />
                    </div>
                </div>
                </div>
            </ScrollReveal>
            </div>
        )}

        {/* Regular Press Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularPress.map((press, index) => (
            <ScrollReveal key={press.id} delay={index * 0.1}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-8">
                    <div className="h-12 mb-6 flex items-center">
                    <img 
                        src={press.logo} 
                        alt={press.outlet} 
                        className="h-full object-contain"
                        onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x60?text=${press.outlet}`;
                        }}
                    />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                    {press.headline}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                    {press.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{press.date}</span>
                    <a 
                        href={press.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-1 bg-primary text-light-text font-medium rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary"
                    >
                        Read News
                    </a>
                    </div>
                </div>
                </div>
            </ScrollReveal>
            ))}
        </div>
        </div>
    </section>

    {/* Media Kit Section */}
    <section className="py-16 bg-tertiary text-light-text">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
            <ScrollReveal>
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Resources</h2>
                <p className="text-lg">
                For press inquiries, please contact us directly. We&apos;ve also prepared a media kit with 
                resources for publications and press.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Brand Assets</h3>
                <p className="text-center mb-4">Logos, product images, and brand guidelines.</p>
                <div className="text-center">
                    <a 
                    href="#" 
                    className="text-secondary hover:underline"
                    >
                    Download ZIP
                    </a>
                </div>
                </div>
                
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Company Fact Sheet</h3>
                <p className="text-center mb-4">Key information about our history and products.</p>
                <div className="text-center">
                    <a 
                    href="#" 
                    className="text-secondary hover:underline"
                    >
                    Download PDF
                    </a>
                </div>
                </div>
                
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Founder Bios</h3>
                <p className="text-center mb-4">Background information on our team and story.</p>
                <div className="text-center">
                    <a 
                    href="#" 
                    className="text-secondary hover:underline"
                    >
                    Download PDF
                    </a>
                </div>
                </div>
            </div>
            
            <div className="text-center">
                <a 
                href="mailto:press@trestellecoffeeco.com" 
                className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
                >
                Contact Press Team
                </a>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>
    
    {/* Press Quotes */}
    <section className="py-20 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
            <ScrollReveal>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
                What People Are Saying
                </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white rounded-xl shadow-md p-8 md:p-10 relative">
                <svg className="absolute text-primary opacity-10 top-6 left-6" width="50" height="50" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <div className="text-center mb-8">
                    <p className="text-lg md:text-xl italic text-gray-700 mb-6 relative z-10">
                    &quot;Tre Stelle Coffee Co. has brought a fresh energy to the Dallas coffee scene with their 
                    dedication to quality beans and inclusive community space.&quot;
                    </p>
                    <div className="h-12 flex items-center justify-center">
                    <img 
                        src="/images/press/dallas-morning-news-logo.png" 
                        alt="Dallas Morning News Logo" 
                        className="h-full object-contain"
                        onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x50?text=Dallas+Morning+News';
                        }}
                    />
                    </div>
                </div>
                
                <div className="text-center mb-8">
                    <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                    &quot;A coffee shop with a mission – Tre Stelle blends Eritrean tradition with 
                    contemporary coffee culture in a way that feels both authentic and innovative.&quot;
                    </p>
                    <div className="h-12 flex items-center justify-center">
                    <img 
                        src="/images/press/dallas-observer-logo.png" 
                        alt="Dallas Observer Logo" 
                        className="h-full object-contain"
                        onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x50?text=Dallas+Observer';
                        }}
                    />
                    </div>
                </div>
                </div>
            </div>
            </ScrollReveal>
        </div>
        </div>
    </section>
    
    {/* Press Contact CTA */}
    <section className="py-16 bg-primary text-light-text">
        <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Write About Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
            Interested in featuring Tre Stelle Coffee Co. in your publication? 
            We&apos;d love to share our story with you.
            </p>
            <a 
            href="mailto:press@trestellecoffeeco.com" 
            className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
            >
            Contact For Press Inquiries
            </a>
        </ScrollReveal>
        </div>
    </section>
    </main>
);
}