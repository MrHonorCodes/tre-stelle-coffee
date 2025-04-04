"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Our Products', path: '/products' },
    { name: 'Press', path: '/press' },
    { name: 'Book Event', path: '/events' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Find Us', path: '/find-us' },
    { name: 'Order Ahead', path: 'https://trestellecoffeeco.square.site/' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <header className="fixed w-full z-50 shadow-md py-4" style={{ backgroundColor: '#F8F5F2' }}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            {/* Replace with your actual logo */}
            <div className="h-10 w-28 bg-soft-white/10 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-light-text font-bold" style={{ color: '#F8F5F2' }}>Tre Stelle</span>
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
          
          {/* Desktop and Large Tablet Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.path}
                className="font-medium text-sm hover:text-secondary-fix transition-colors duration-300 relative"
                style={{
                  position: 'relative',
                  color: 'var(--color-primary)'
                }}
              >
                <span>{link.name}</span>
                <span 
                  style={{
                    content: "''",
                    position: 'absolute',
                    height: '2px',
                    width: '0',
                    left: '0',
                    bottom: '-4px',
                    backgroundColor: 'var(--color-secondary)',
                    transition: 'all 0.3s ease'
                  }}
                  className="link-underline"
                ></span>
              </Link>
            ))}
          </div>
          
          {/* Mid-sized device navigation (fewer items) */}
          <div className="hidden md:flex lg:hidden space-x-4">
            {navLinks.slice(0, 4).map((link) => (
              <Link 
                key={link.name}
                href={link.path}
                className="font-medium text-sm hover:text-secondary-fix transition-colors duration-300 relative"
                style={{
                  position: 'relative',
                  color: 'var(--color-primary)'
                }}
              >
                <span>{link.name}</span>
                <span 
                  style={{
                    content: "''",
                    position: 'absolute',
                    height: '2px',
                    width: '0',
                    left: '0',
                    bottom: '-4px',
                    backgroundColor: 'var(--color-secondary)',
                    transition: 'all 0.3s ease'
                  }}
                  className="link-underline"
                ></span>
              </Link>
            ))}
            {/* Dropdown for additional menu items on mid-sized devices with click instead of hover */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="font-medium text-sm flex items-center transition-colors duration-300"
                style={{ color: isDropdownOpen ? 'var(--color-secondary)' : 'var(--color-primary)' }}
              >
                <span>More</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg"
                  style={{ backgroundColor: '#F8F5F2', zIndex: 50 }}
                >
                  <div className="py-1">
                    {navLinks.slice(4).map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="block px-4 py-3 hover:text-secondary-fix transition-colors duration-200"
                        style={{ color: 'var(--color-primary)' }}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button style={{ color: 'var(--color-primary)' }} className="hover:text-secondary-fix transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button style={{ color: 'var(--color-primary)' }} className="hover:text-secondary-fix transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'var(--color-primary)' }}
            className="md:hidden hover:text-secondary-fix transition-colors"
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
      
      {/* Mobile menu with animation - centered items */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: '#F8F5F2' }}
      >
        <div className="py-3 space-y-3 px-4 flex flex-col items-center text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block py-2 text-lg hover:text-secondary-fix transition-colors w-full"
              style={{ color: 'var(--color-primary)' }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t w-full flex justify-center space-x-10" style={{ borderColor: 'var(--color-tertiary)' }}>
            <button style={{ color: 'var(--color-primary)' }} className="hover:text-secondary-fix transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button style={{ color: 'var(--color-primary)' }} className="hover:text-secondary-fix transition-colors">
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