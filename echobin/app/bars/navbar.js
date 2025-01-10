import Link from 'next/link'; 

export default function Navbar() {
  return (
    <nav className="bg-[#023838] text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="EcoBin Logo" 
              className="h-12 w-32 mr-3 cursor-pointer" // Adjusted size and added cursor pointer
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-lg font-medium">
          <li><Link href="/classify">Classify</Link></li>
          <li><Link href="/report">Report</Link></li>
          <li><Link href="/rewards">Reward</Link></li>
          <li><Link href="/leaderboard">Leaderboard</Link></li>
          <li><Link href="https://forms.gle/v6LuJQdsMTzuG8iw6">Collaboration</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/news">News</Link></li>
        </ul>
      </div>
    </nav>
  );
}
