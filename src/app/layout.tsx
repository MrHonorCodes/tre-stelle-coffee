import './globals.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ClientLayout from '../../components/layout/ClientLayout';
// import SmoothScroller from '../../components/ui/SmoothScroller';
import BackToTop from "../../components/ui/BackToTop";

export const metadata = {
  title: 'Tre Stelle Coffee Co. | Premium Coffee Roastery',
  description: 'Premium coffee roastery bridging modern and traditional coffee craftsmanship since 2019.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen bg-soft-white text-dark-text">
        <Navbar />
        {/* <SmoothScroller> */}
        <ClientLayout>
          <div className="flex-grow">
            {children}
          </div>
        </ClientLayout>
        <Footer />
        {/* </SmoothScroller> */}
        <BackToTop />
      </body>
    </html>
  );
}