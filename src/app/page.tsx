import { motion } from 'framer-motion'; // Install this: npm install framer-motion

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 md:pt-0 min-h-screen bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 md:min-h-screen flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-soft-white z-10 py-16 md:py-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bridging the gap between modern & traditional coffee!
            </h1>
            <p className="text-lg mb-8 max-w-xl">
              Our green coffee supplier sources coffees from farms around the world to ensure we receive the best coffee. Experience the perfect blend of quality and tradition.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/shop" className="bg-secondary text-dark-text px-8 py-3 rounded-full font-semibold transition-all hover:bg-opacity-80 inline-block">
                Shop Now
              </a>
              <a href="/about-us" className="border-2 border-soft-white text-soft-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-soft-white hover:text-primary inline-block">
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-8 md:mt-0 relative z-10"
          >
            <div className="bg-tertiary rounded-lg overflow-hidden shadow-2xl">
              {/* Replace with actual video */}
              <div className="aspect-w-16 aspect-h-9 bg-tertiary flex items-center justify-center">
                <span className="text-soft-white">Video Player</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-soft-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <span className="text-secondary uppercase tracking-wider font-semibold text-sm block mb-3">Since 2019</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Coffee Roasting Company</h2>
              <p className="text-gray-700 mb-4">
                Originally beginning the business in late 2019 as solely a Roasting company with the help of his Father, the business has now expanded to a Coffee Shop & Roastery. Along with serving high quality coffee, our main objective is to build a coffee business with the intentions of inclusion of all individuals from various walks of life.
              </p>
              <p className="text-gray-700 mb-6">
                We take pride in sourcing the finest beans from around the world and roasting them to perfection, creating unique flavor profiles that highlight each coffee&apos;s natural characteristics.
              </p>
              <a href="/about-us" className="bg-secondary text-dark-text px-8 py-3 rounded-full font-semibold transition-all hover:bg-opacity-80 inline-block">
                About Us
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                {/* Replace with actual video */}
                <div className="aspect-w-16 aspect-h-9 bg-tertiary flex items-center justify-center">
                  <span className="text-soft-white">About Video</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}