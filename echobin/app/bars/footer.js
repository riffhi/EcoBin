export default function Footer() {
    return (
      <footer className="bg-[#023838] text-white py-8">
        <div className="container mx-auto text-center">
          {/* Logo and Navigation Links */}
          <div className="flex flex-col items-center md:flex-row md:justify-between pl-6">
            <div className="pr-6 flex items-center space-x-4">
            <a href="/">
      <img
        src="/logo.png"
        alt="EcoBin Logo"
        className="h-12 w-32 cursor-pointer" 
      />
    </a>
  </div>
          
            <nav className="mt-6 md:mt-0">
              <ul className="flex space-x-10 text-lg pr-6">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                
                <li>
                  <a href="/leaderboard" className="hover:underline">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/news" className="hover:underline">
                    News
                  </a>
                </li>
              </ul>
            </nav>
          </div>
  
          {/* Social Media Icons */}
          
          <div className="mt-6 flex justify-end  space-x-6 pr-6">
            <a
              href="https://www.instagram.com/we.ecobin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/instagram-icon.png"
                alt="Instagram"
                className="h-8 w-8"
              />
            </a>
            <a
              href="https://github.com/CodeCatalyst04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img src="/github-icon.png" alt="GitHub" className="h-8 w-8" />
            </a>
          </div>
  
          {/* Footer Text */}
          <div className="mt-6 border-t border-gray-600 pt-4">
            <p className="text-sm">© 2025, All Rights Reserved</p>
          </div>
        </div>
      </footer>
    );
  }