import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-[#eef2f3] mt-4 rounded-[35px] max-w-7xl mx-auto p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[5fr_3fr_3fr_2fr] gap-10">

        {/* Logo Section */}
        <div>
          <img
            src="/assets/img/navigation/logo.webp"
            alt="My Moving Journey"
            className="w-52 mb-5"
          />

          <p className="text-[#1b1b1b] text-[18px] leading-8 mb-6">
            You can trust My Moving Journey to help you find a reputable and
            reliable moving company, so you can experience a stress-free move.
            We have made it easy for you.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mb-6">
            <a
              href="https://www.facebook.com/mymovingjourney/"
              target="_blank"
              rel="noreferrer"
              className="text-[#0d5c84] text-2xl hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com/mymovingjourney"
              target="_blank"
              rel="noreferrer"
              className="text-[#0d5c84] text-2xl hover:scale-110 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.pinterest.com/mymovingjourneyUS/"
              target="_blank"
              rel="noreferrer"
              className="text-[#0d5c84] text-2xl hover:scale-110 transition"
            >
              <FaPinterestP />
            </a>

            <a
              href="https://www.linkedin.com/company/mymovingjourney/"
              target="_blank"
              rel="noreferrer"
              className="text-[#0d5c84] text-2xl hover:scale-110 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>


   <button
    
      className={`Primary-bg text-white text-[18px] font-semibold cursor-pointer px-6 py-3 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#116087] transition-all duration-300`}
    >
      looking for Movers?
    </button>
  
  </div>

        {/* Movers */}
        <div>
          <h3 className="urbanfont text-[22px]  font-bold mb-5">
            Movers
          </h3>

          <ul className="space-y-3 text-lg">
            <li><a href="#">Movers In USA</a></li>
            <li><a href="#">Long Distance Movers</a></li>
            <li><a href="#">Local Movers</a></li>
            <li><a href="#">Movers By Route</a></li>
          </ul>

          <h3 className="urbanfont text-[22px] font-bold mt-10 mb-5">
            Our Blog
          </h3>

          <ul className="space-y-3 text-lg">
            <li><a href="#">Packing Tips</a></li>
            <li><a href="#">Moving Guide</a></li>
            <li><a href="#">Moving Resources</a></li>
            <li><a href="#">Storage Guide</a></li>
            <li><a href="#">City Guide</a></li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-serif text-[22px] font-bold mb-5">
            Links
          </h3>

          <ul className="space-y-3 text-lg">
           <Link href = "/"><li><a href="#">Home</a></li></Link>
            <Link href = "/about"><li><a href="#">About Us</a></li></Link>
            <li><a href="#">Free Moving Quote</a></li>
            <li><a href="#">Moving Cost Calculator</a></li>
            <li><a href="#">Blogs</a></li>
             <Link href = "/contact"><li><a href="#">Contact Us</a></li></Link>
            <li><a href="#">Write A Review</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>

        {/* Business */}
        <div>
          <h3 className="font-serif text-[22px] font-bold mb-5">
            Business
          </h3>

          <ul className="space-y-3 text-lg">
            <li><a href="#">Mover Login</a></li>
            <li><a href="#">List Your Mover</a></li>
          </ul>

          <h3 className="font-serif text-[22px] font-bold mt-10 mb-4">
            For Inquiry
          </h3>

          <a
            href="mailto:contact@mymovingjourney.com"
            className="underline text-lg"
          >
            Email Us
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          Copyright 2026 MyMovingJourney.com. All Rights Reserved.
        </p>

        <div className="flex items-center gap-3">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms & Services</a>
        </div>
      </div>
    </footer>
  );
}