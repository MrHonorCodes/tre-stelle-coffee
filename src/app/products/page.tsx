/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import productsData from '../../data/products.json';
import { useCart } from '../../context/CartContext';

// Updated Product Type Definition to match JSON structure
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
  // Stock can be a number or an object mapping option value (size) to number
  stock: number | { [optionValue: string]: number }; 
  options?: { [optionName: string]: string[] } | null;
};

export default function Shop() {
  // Add smooth scrolling effect
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Use imported data
  const products: Product[] = productsData;
  const { addToCart } = useCart();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

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

  // --- Direct Add to Cart Handler (for non-option items) ---
  const handleDirectAddToCart = (event: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    event.preventDefault(); // Prevent link navigation
    event.stopPropagation(); // Stop event bubbling to parent links
    
    setAddingProductId(productId); // Show loading state
    addToCart(productId, 1); // Add 1 item
    console.log(`Added product ID ${productId} directly to cart.`);

    // Reset loading state after a short delay
    setTimeout(() => {
        setAddingProductId(null);
        // Optionally add a more visible confirmation here (e.g., toast notification)
    }, 1000); 
  };

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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-secondary">
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
                  ? 'bg-secondary text-dark-text' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid - Responsive gap */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product, index) => {
              // Calculate total stock
              const totalStock = typeof product.stock === 'number' 
                ? product.stock 
                : Object.values(product.stock).reduce((sum, count) => sum + count, 0);
              
              const isOutOfStock = totalStock === 0;
              const hasOptions = !!product.options && Object.keys(product.options).length > 0;
              const isAdding = addingProductId === product.id;

              return (
                <ScrollReveal key={product.id} delay={index * 0.1}>
                  <Link href={`/products/${product.id}`} className="block group h-full">
                    <div className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${isOutOfStock ? 'opacity-60' : ''} relative flex flex-col h-full`}>
                      {isOutOfStock && (
                        <div className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                          Out of Stock
                        </div>
                      )}
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={product.images[0]}
                          alt={product.name} 
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x400?text=${product.name}`;
                          }}
                        />
                      </div>
                      
                      <div className="p-6 text-center flex flex-col items-center flex-grow">
                        <span className="text-sm text-gray-500">{product.category}</span>
                        <h3 className="text-xl font-bold text-primary my-2 group-hover:text-secondary transition-colors">{product.name}</h3>
                        {product.description && (
                          <p className="text-gray-600 mb-4 text-sm flex-grow">{product.description}</p>
                        )}
                        
                        <div className="mt-auto w-full">
                          <span className="text-2xl font-bold text-primary mt-4 block">${product.price.toFixed(2)}</span>
                          <button 
                            onClick={!hasOptions && !isOutOfStock ? (e) => handleDirectAddToCart(e, product.id) : undefined}
                            className={`mt-2 px-4 py-2 border-2 rounded-md font-semibold transition-all duration-300 w-full 
                              ${isOutOfStock || isAdding
                                ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' 
                                : 'bg-secondary text-dark-text border-secondary'}`}
                            disabled={isOutOfStock || isAdding}
                          >
                            {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : hasOptions ? 'View Options' : 'Add To Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brewing Guide CTA  OPTIONAL FOR NOW*/}
      {/*   <section className="py-16 bg-soft-white">
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
                    className="px-6 py-2 bg-primary text-light font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary w-fit"
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
    </section> */}
    </main>
  );
}