import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full p-4 md:p-8 font-sans">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto bg-[#f3f7f9] rounded-3xl border border-gray-200 px-8 py-12 shadow-sm">
        
        {/* Top Section: 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Branding & Intro (Takes up more space) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full bg-[#165a7f] flex items-center justify-center overflow-hidden border border-gray-300 shrink-0">
                <span className="text-white text-sm font-bold">⇄</span>
              </div>
              <div className="flex flex-col text-[#0f172a] leading-none">
                <span className="text-base font-black tracking-wider uppercase">My Moving</span>
                <span className="text-base font-black tracking-wider uppercase">Journey</span>
              </div>
            </Link>

            <p className="text-sm text-gray-700 leading-relaxed pr-4">
              You can trust My Moving Journey to help you find a reputable and reliable moving company, so you can experience a stress-free move. We have made it easy for you.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-[#115e85]">
              <Link href="#" aria-label="Facebook" className="hover:text-[#0c4a6a] transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-[#0c4a6a] transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" aria-label="Pinterest" className="hover:text-[#0c4a6a] transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/>
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-[#0c4a6a] transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.558V9h3.562v11.452zM5.34 7.434a2.064 2.064 0 110-4.125 2.063 2.063 0 010 4.125zm15.112 13.018h-3.558v-5.569c0-1.328-.024-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.354V9h3.413v1.565h.048c.475-.9 1.636-1.85 3.367-1.85 3.605 0 4.27 2.372 4.27 5.455v6.282z"/>
                </svg>
              </Link>
            </div>

            {/* CTA Button */}
            <div>
              <Link 
                href="/looking-for-movers" 
                className="inline-block bg-[#115e85] hover:bg-[#0c4a6a] text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Looking For Movers?
              </Link>
            </div>
          </div>

          {/* Column 2: Movers & Our Blog */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-xl text-gray-900 mb-4 tracking-wide">Movers</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Movers In USA</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Long Distance Movers</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Local Movers</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Movers By Route</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-gray-900 mb-4 tracking-wide">Our Blog</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Packing Tips</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Moving Guide</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Moving Resources</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">Storage Guide</Link></li>
                <li><Link href="#" className="hover:text-gray-900 transition-colors">City Guide</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-xl text-gray-900 mb-4 tracking-wide">Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link href="/quote" className="hover:text-gray-900 transition-colors">Free Moving Quote</Link></li>
              <li><Link href="/calculator" className="hover:text-gray-900 transition-colors">Moving Cost Calculator</Link></li>
              <li><Link href="/blogs" className="hover:text-gray-900 transition-colors">Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link href="/review" className="hover:text-gray-900 transition-colors">Write A Review</Link></li>
              <li><Link href="/sitemap" className="hover:text-gray-900 transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 4: Business & Inquiry */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-xl text-gray-900 mb-4 tracking-wide">Business</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="/login" className="hover:text-gray-900 transition-colors">Mover Login</Link></li>
                <li><Link href="/list-mover" className="hover:text-gray-900 transition-colors">List Your Mover</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-gray-900 mb-4 tracking-wide">For Inquiry</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li>
                  <a href="mailto:email@example.com" className="underline hover:text-gray-900 transition-colors">
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-gray-800/20 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-800 font-medium">
          <p>Copyright 2026 MyMovingJourney.com. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-black transition-colors">Terms & Services</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}