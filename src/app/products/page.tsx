/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

// Product Type Definition
type Product = {
id: number;
name: string;
category: string;
price: number;
image: string;
description?: string;
options?: boolean;
};

export default function Shop() {
// Add smooth scrolling effect
useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
    document.documentElement.style.scrollBehavior = 'auto';
    };
}, []);

// Sample product data
const products: Product[] = [
    {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    category: 'Coffee',
    price: 19.00,
    image: '/images/products/ethiopian-yirgacheffe.jpg',
    description: 'Bright, fruity notes with vibrant acidity and floral undertones'
    },
    {
    id: 2,
    name: 'Brazil Fazenda',
    category: 'Coffee',
    price: 17.00,
    image: '/images/products/brazil-fazenda.jpg',
    description: 'Nutty, mild sweetness with chocolate notes'
    },
    {
    id: 3,
    name: 'Colombia Excelso',
    category: 'Coffee',
    price: 17.00,
    image: '/images/products/colombia-excelso.jpg',
    description: 'Rich caramel sweetness with a hint of citrus'
    },
    {
    id: 4,
    name: 'Highlands Blend',
    category: 'Coffee',
    price: 18.00,
    image: '/images/products/highlands-blend.jpg',
    description: 'A blend of Colombia Excelso, Brazil Fazenda, and Ethiopian Yirgacheffe'
    },
    {
    id: 5,
    name: 'Dr Congo Lake Kivu',
    category: 'Coffee',
    price: 17.00,
    image: '/images/products/dr-congo-lake-kivu.jpg',
    description: 'Sweet, complex with berry notes and a smooth finish'
    },
    {
    id: 6,
    name: 'Logo Sticker',
    category: 'Merchandise',
    price: 2.00,
    image: '/images/products/logo-sticker.jpg',
    description: 'Tre Stelle Coffee Co. logo sticker'
    },
    {
    id: 7,
    name: 'Bridging The Gap',
    category: 'Merchandise',
    price: 25.00,
    image: '/images/products/bridging-the-gap-shirt.jpg',
    description: 'Comfortable t-shirt with Tre Stelle logo',
    options: true
    }
];

// State for filtered products
const [category, setCategory] = useState<string>('All');
const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

// Filter products when category changes
useEffect(() => {
    if (category === 'All') {
    setFilteredProducts(products);
    } else {
    setFilteredProducts(products.filter(product => product.category === category));
    }
}, [category]);

// Unique categories for filter
const categories = ['All', ...new Set(products.map(product => product.category))];

return (
    <main className="min-h-screen bg-soft-white">
    {/* Hero Section with maroon background */}
    <section className="relative h-[50vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
        {/* Overlay with coffee brewing background */}
        <div 
            className="absolute inset-0 bg-cover bg-center rounded-2xl" 
            style={{ 
            backgroundImage: "url('/images/Products-Banner.png')", 
            backgroundSize: 'cover'
            }}
        />
        <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-secondary-fix">
            Shop
            </h1>
        </FadeIn>
        </div>
    </section>

    {/* Products Section */}
    <section className="py-16 md:py-24 bg-soft-white">
        <div className="container mx-auto px-4">
        {/* Introduction Text */}
        <div className="text-center mb-12">
            <FadeIn>
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
                Our Products
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
                We offer a carefully curated selection of premium coffees from around the world, 
                roasted to perfection to highlight their unique characteristics.
            </p>
            </FadeIn>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat, index) => (
            <button
                key={index}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${category === cat 
                    ? 'bg-primary text-light-text' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                {cat}
            </button>
            ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                    <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x400?text=${product.name}`;
                    }}
                    />
                </div>
                
                <div className="p-6">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                    {product.description && (
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button className={`px-4 py-2 ${product.options ? 'bg-white' : 'bg-primary'} text-${product.options ? 'primary' : 'light-text'} font-medium rounded-md border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300`}>
                        {product.options ? 'SELECT OPTIONS' : 'ADD TO CART'}
                    </button>
                    </div>
                </div>
                </div>
            </ScrollReveal>
            ))}
        </div>
        </div>
    </section>

    {/* Brewing Guide CTA */}
    <section className="py-16 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
                <ScrollReveal>
                <h2 className="text-2xl md:text-3xl text-primary font-bold mb-4">
                    Get the Most From Your Coffee
                </h2>
                <p className="text-gray-700 mb-6">
                    Check out our brewing guides to learn how to make the perfect cup using your favorite method.
                </p>
                <a 
                    href="/brewing-guides" 
                    className="px-6 py-2 bg-primary text-light-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary w-fit"
                >
                    Brewing Guides
                </a>
                </ScrollReveal>
            </div>
            
            <div className="bg-primary">
                <img 
                src="/images/brewing-guide.jpg" 
                alt="Coffee Brewing Guide" 
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Brewing+Guide';
                }}
                />
            </div>
            </div>
        </div>
        </div>
    </section>
    </main>
);
}