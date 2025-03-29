import './globals.css';
import { Montserrat } from 'next/font/google';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Tre Stelle Coffee Co. | Premium Coffee Roastery',
  description: 'Premium coffee roastery bridging modern and traditional coffee',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}