import Navbar from './bars/navbar';
import Footer from './bars/footer';
import './globals.css';

export const metadata = {
  title: 'EcoBin - Revolutionizing Waste Management',
  description: 'Join EcoBin in creating a greener future through sustainable waste management.',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <script async defer
        src="https://maps.gomaps.pro/maps/api/js?key=AlzaSyH3Kb2Q6xXY05X1F-PeIoXOlmiU1dPI-Ha&libraries=geometry,places&callback=initMap">
    </script>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
   </html>
 );
}