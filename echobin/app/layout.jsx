import Navbar from './bars/navbar';
import Footer from './bars/footer';
import './globals.css';
import AuthProvider from "@/providers/authproviders";
import NavbarWrapper from "@/components/navbar";

export const metadata = {
  title: 'EcoBin - Revolutionizing Waste Management',
  description: 'Join EcoBin in creating a greener future through sustainable waste management.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavbarWrapper>
            {children}
          </NavbarWrapper>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
