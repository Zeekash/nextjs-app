import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 py-4 md:py-6 font-sans transition-transform duration-300">
      {/* Main Pill-Shaped Container */}
      {/* Added shadow-md and pointer-events-auto to ensure it acts as a floating island */}
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#f4f7f9] rounded-full px-6 py-3 shadow-md border border-gray-200 pointer-events-auto">
        
        {/* Left: Logo & Branding */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Circular Logo Icon Placeholder */}
          <div className="relative w-10 h-10 rounded-full bg-[#165a7f] flex items-center justify-center overflow-hidden border border-gray-300">
            {/* Replace with your actual logo image asset path if available */}
            <span className="text-white text-xs font-bold">⇄</span>
          </div>
          <div className="flex flex-col text-[#0f172a] leading-none">
            <span className="text-sm font-black tracking-wider uppercase">My Moving</span>
            <span className="text-sm font-black tracking-wider uppercase">Journey</span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>Movers</span>
            <span className="text-[10px] text-gray-500">▼</span>
          </div>
          
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>Resources</span>
            <span className="text-[10px] text-gray-500">▼</span>
          </div>

          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>Moving Cost Calculator</span>
            <span className="text-[10px] text-gray-500">▼</span>
          </div>

          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>Move Wiki</span>
            <span className="text-[10px] text-gray-500">▼</span>
          </div>

          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>Blog</span>
            <span className="text-[10px] text-gray-500">▼</span>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/write-review" 
            className="bg-[#115e85] hover:bg-[#0c4a6a] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
          >
            Write a Review
          </Link>
          
          <button 
            type="button" 
            className="w-10 h-10 rounded-full bg-[#e0effa] hover:bg-[#cbdff2] text-[#115e85] flex items-center justify-center text-xl font-light transition-colors"
            aria-label="Add item"
          >
            +
          </button>
        </div>

      </div>
    </header>
  );
}