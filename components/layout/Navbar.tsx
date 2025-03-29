"use client"
import Link from 'next/link';
import { useState } from 'react';
// import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Our Products', path: '/products' },
    { name: 'Press', path: '/press' },
    { name: 'Book Event', path: '/events' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Find Us', path: '/location' },
    { name: 'Order Ahead', path: 'https://trestellecoffeeco.square.site/' }
  ];
  
  return (
    <header className="fixed w-full bg-primary z-50 shadow-md py-4">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            {/* Replace with your actual logo */}
            <div className="h-10 w-28 bg-soft-white/10 flex items-center justify-center">
              <span className="text-soft-white font-bold">Tre Stelle</span>
            </div>
            {/* Uncomment when you have a logo */}
            {/* <Image 
              src="/logo.png" 
              alt="Tre Stelle Coffee Co. Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto" 
            /> */}
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path}
                className="text-soft-white font-medium text-sm hover:text-secondary transition-colors duration-300 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:left-0 after:bottom-[-4px] after:bg-secondary after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-soft-white hover:text-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-soft-white hover:text-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-soft-white hover:text-secondary transition-colors"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full bg-primary shadow-lg`}>
        <div className="py-3 space-y-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block py-2 text-soft-white hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-tertiary flex space-x-6">
            <button className="text-soft-white hover:text-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-soft-white hover:text-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}