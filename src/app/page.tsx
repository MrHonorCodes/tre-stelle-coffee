'use client'
export default function Home() {

  return (
    <main className="min-h-screen bg-soft-white">

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-primary pt-16">
        <div className="container mx-auto px-4 h-[calc(100%-80px)] flex items-center">
          <div className="w-full md:w-1/2 lg:w-2/5 text-light-text relative z-10 md:pl-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Bridging the gap between modern & traditional coffee!
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-lg">
              Our green coffee supplier sources coffees from farms around the world to ensure we receive the best coffee. Experience the perfect blend of quality and tradition.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/shop" className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary">
                Shop Now
              </a>
              <a href="/about" className="px-8 py-3 text-light-text font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-light-text hover:text-primary border-2 border-light-text">
                Learn More
              </a>
            </div>
          </div>
          {/* Video background - replace src with your actual video */}
          <div className="absolute right-0 top-0 w-full md:w-3/5 h-full z-0 hidden md:block">
            <div className="w-full h-full bg-tertiary opacity-50 md:opacity-100"></div>
            {/* Uncomment when you have a video */}
            {/* <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/your-video.mp4" type="video/mp4" />
            </video> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-soft-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="text-sm text-secondary uppercase tracking-wider font-semibold mb-4 block">
                Since 2019
              </span>
              <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
                Coffee Roasting Company
              </h2>
              <p className="text-gray-700 mb-4">
                Originally beginning the business in late 2019 as solely a Roasting company with the help of his Father, the business has now expanded to a Coffee Shop & Roastery. Along with serving high quality coffee, our main objective is to build a coffee business with the intentions of inclusion of all individuals from various walks of life.
              </p>
              <p className="text-gray-700 mb-6">
                We take pride in sourcing the finest beans from around the world and roasting them to perfection, creating unique flavor profiles that highlight each coffee&apos;s natural characteristics.
              </p>
              <a href="/about" className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-secondary">
                About Us
              </a>
            </div>
            <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-xl">
              {/* Replace with your video component */}
              <div className="aspect-video bg-tertiary"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}