"use client"
import Link from 'next/link';

export default function Footer() {
  // Move the date calculation inside the component function 
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-soft-white">
      <div className="container mx-auto px-4 py-12">
        {/* Rest of your footer content */}
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {currentYear} All rights reserved - Tre Stelle Coffee Co. Created by <a href="#" className="text-secondary hover:underline">Danny Amezquita - Web Developer</a></p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="text-secondary hover:underline mx-2">Privacy Policy</Link> | 
            <Link href="/terms" className="text-secondary hover:underline mx-2">Terms and Conditions</Link> | 
            <Link href="/sitemap" className="text-secondary hover:underline mx-2">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}