"use client";

import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
const resourceLinks = [
  { title: "Best Moving Container Companies" },
  { title: "Best Packers & Movers" },
  { title: "Best Commercial Moving Companies" },
  { title: "Best Self-Storage Companies in USA" },
  { title: "Best Moving Truck Rental Companies" },
  { title: "Best International Moving Companies" },
  { title: "Best Specialty Movers in USA" },
];

const movingLinks = {
  interstate: [
    {
      title: "Best Long Distance Movers",
      icon: "https://mymovingjourney.com/assets/img/best-long-distance-hd.png",
      link: "#",
    },
    {
      title: "Moving Companies in USA",
      icon: "https://mymovingjourney.com/assets/img/moving-companies-in-usa-hd.png",
      link: "#",
    },
    {
      title: "Popular Moving Routes",
      icon: "https://mymovingjourney.com/assets/img/popular-moving-routes-hd.png",
      link: "#",
    },
  ],
  local: [
    {
      title: "Movers List A-Z",
      icon: "https://mymovingjourney.com/assets/img/mover-list-hd.png",
      link: "#",
    },
    {
      title: "Best Local Moving Companies",
      icon: "https://mymovingjourney.com/assets/img/best-local-moving-hd.png",
      link: "#",
    },
  ],
};
export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) =>
      prev === name ? null : name
    );
  };

  const megaDropdownClasses =
    "absolute  top-[65%] mt-4 w-[750px] max-w-[95vw] bg-[#f8f8f8] rounded-3xl shadow-xl p-8 z-50";

  const simpleDropdownClasses =
    "absolute top-[65%] mt-4 min-w-[260px] bg-white rounded-2xl shadow-lg p-3 z-50";

  return (
    <header className="fixed top-0 lg:top-5 w-full z-[5]">
      <div className={`
    bg-[#f1f6f8]
    px-5
    max-w-[520px] sm:max-w-[840px] lg:max-w-[980px] xl:max-w-[1300px]
    mx-auto
    ${menuOpen ? "border-2 border-b-0 border-[#11608729]" : "border-2 border-[#11608729] border-b-2"}
    lg:border-2 lg:border-[#11608729] lg:rounded-[40px]
  `}>

        {/* Top Row */}
        <div className="flex items-center justify-between m-auto  h-20">

          {/* Logo */}
          <a href="/">
            <img
              src="https://mymovingjourney.com/assets/img/logo.png"
              alt="logo"
              className="h-18 object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex flex-1 justify-center items-center gap-8">

            {/* Movers */}
            <div className="relative p-[20px] pr-0 pl-0 "
              onMouseEnter={() => setActiveDropdown("movers")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown("movers")}
                className="flex items-center gap-2 font-medium"
              >
                Movers
                <FaChevronDown
                  className={`transition ${activeDropdown === "movers"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "movers" && (
                <div className={megaDropdownClasses}>
                  <div className="grid grid-cols-2 gap-12">

                    {/* Interstate */}
                    <div>
                      <h3 className="font-bold text-xl mb-6">Interstate</h3>

                      <div className="space-y-5">
                        {movingLinks.interstate.map((item, index) => (
                          <a
                            key={index}
                            href={item.link}
                            className="flex items-center gap-4 group"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                              <img
                                src={item.icon}
                                alt={item.title}
                                className="w-8 h-8 object-contain"
                              />
                            </div>

                            <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                              {item.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Local */}
                    <div>
                      <h3 className="font-bold text-xl mb-6">Local</h3>

                      <div className="space-y-5">
                        {movingLinks.local.map((item, index) => (
                          <a
                            key={index}
                            href={item.link}
                            className="flex items-center gap-4 group"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                              <img
                                src={item.icon}
                                alt={item.title}
                                className="w-8 h-8 object-contain"
                              />
                            </div>

                            <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                              {item.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div
              className="relative p-[20px] pr-0 pl-0"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown("resources")}
                className="flex items-center gap-2 font-medium"
              >
                Resources
                <FaChevronDown
                  className={`transition ${activeDropdown === "resources" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {activeDropdown === "resources" && (
                <div className={megaDropdownClasses}>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                    {resourceLinks.map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                          <HiOutlineBars3BottomLeft className="text-white text-xl" />
                        </div>

                        <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                          {item.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculator */}
            <div className="relative p-[20px] pr-0 pl-0"
              onMouseEnter={() => setActiveDropdown("calculator")}
              onMouseLeave={() => setActiveDropdown(null)}

            >
              <button
                onClick={() => toggleDropdown("calculator")}
                className="flex items-center gap-2"
              >
                Moving Cost Calculator
                <FaChevronDown
                  className={`transition ${activeDropdown === "calculator"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "calculator" && (
                <div className={simpleDropdownClasses}>
                  <a href="#" className="block px-3 py-2">
                    Moving Cost Calculator
                  </a>

                  <a href="#" className="block px-3 py-2">
                    Box Calculator
                  </a>

                  <a href="#" className="block px-3 py-2">
                    State Cost Guide
                  </a>
                </div>
              )}
            </div>

            {/* Wiki */}
            <div className="relative p-[20px] pr-0 pl-0"
              onMouseEnter={() => setActiveDropdown("wiki")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown("wiki")}
                className="flex  items-center gap-2"
              >
                Move Wiki
                <FaChevronDown
                  className={`transition ${activeDropdown === "wiki"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "wiki" && (
                <div className={simpleDropdownClasses}>
                  <a href="#" className="block px-3 py-2">
                    Moving Guide
                  </a>

                  <a href="#" className="block px-3 py-2">
                    Resources
                  </a>

                  <a href="#" className="block px-3 py-2">
                    Glossary
                  </a>
                </div>
              )}
            </div>

            {/* Blog */}
            <div className="relative p-[20px] pr-0 pl-0"
              onMouseEnter={() => setActiveDropdown("blog")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown("blog")}
                className="flex items-center gap-2"
              >
                Blog
                <FaChevronDown
                  className={`transition ${activeDropdown === "blog"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "blog" && (
                <div className={simpleDropdownClasses}>
                  <a href="#" className="block px-3 py-2">
                    Packing Tips
                  </a>

                  <a href="#" className="block px-3 py-2">
                    Storage Guide
                  </a>

                  <a href="#" className="block px-3 py-2">
                    City Guide
                  </a>
                </div>
              )}
            </div>

          </nav>

          {/* Right Side */}
          <div className="hidden xl:flex items-center gap-4">
            <button className={`bg-[#116087] text-white text-[14px]  font-light cursor-pointer px-6 py-3 rounded-full border border-transparent hover:bg-[#fff] hover:text-black hover:border-[#116087] transition-all duration-300 `}>
              Write A Review
            </button>
            <button className="w-11 h-11 border rounded-full  border-transparent bg-[#E2EEFD] flex items-center justify-center">
              <FaPlus className="text-[#116087]" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden text-2xl"
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setMenuOpen(!menuOpen);
            }}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {mobileMenu && (
        <div className="xl:hidden h-auto border-b-1 border-[#e2eefd] rounded-b-[10px] bg-white ">
          <div className="p-4">

            {/* Movers */}
            <div className="">
              <button
                onClick={() => toggleDropdown("movers")}
                className="w-full flex justify-between items-center py-4"
              >
                <span>Movers</span>
                <FaChevronDown
                  className={`transition ${activeDropdown === "movers" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {activeDropdown === "movers" && (
                <div className="pb-4 pl-4">

                  <h4 className="font-semibold mb-3">
                    Interstate
                  </h4>

                  <div className="space-y-3 mb-5">
                    {movingLinks.interstate.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-8 h-8 object-contain"
                          />
                        </div>

                        <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                          {item.title}
                        </span>
                      </a>
                    ))}
                  </div>

                  <h4 className="font-semibold mb-3">
                    Local
                  </h4>

                  <div className="space-y-3">
                    {movingLinks.local.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-8 h-8 object-contain"
                          />
                        </div>

                        <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                          {item.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div className="">
              <button
                onClick={() => toggleDropdown("resources")}
                className="w-full flex justify-between items-center py-4"
              >
                <span>Resources</span>
                <FaChevronDown
                  className={`transition ${activeDropdown === "resources"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "resources" && (
                <div className="pb-4 pl-4 space-y-3">
                  {resourceLinks.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#0B6B8E] flex items-center justify-center flex-shrink-0">
                        <HiOutlineBars3BottomLeft className="text-white text-xl" />
                      </div>

                      <span className="text-gray-800 group-hover:text-[#0B6B8E] transition">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Calculator */}
            <div className="">
              <button
                onClick={() => toggleDropdown("calculator")}
                className="w-full flex justify-between items-center py-4"
              >
                <span>Moving Cost Calculator</span>
                <FaChevronDown
                  className={`transition ${activeDropdown === "calculator"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "calculator" && (
                <div className="pb-4 pl-4 space-y-3">
                  <a href="#" className="block">
                    Moving Cost Calculator
                  </a>

                  <a href="#" className="block">
                    Box Calculator
                  </a>

                  <a href="#" className="block">
                    State Cost Guide
                  </a>
                </div>
              )}
            </div>

            {/* Wiki */}
            <div className="">
              <button
                onClick={() => toggleDropdown("wiki")}
                className="w-full flex justify-between items-center py-4"
              >
                <span>Move Wiki</span>
                <FaChevronDown
                  className={`transition ${activeDropdown === "wiki"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "wiki" && (
                <div className="pb-4 pl-4 space-y-3">
                  <a href="#" className="block">
                    Moving Guide
                  </a>

                  <a href="#" className="block">
                    Moving Resources
                  </a>

                  <a href="#" className="block">
                    Moving Glossary
                  </a>
                </div>
              )}
            </div>

            {/* Blog */}
            <div className="">
              <button
                onClick={() => toggleDropdown("blog")}
                className="w-full flex justify-between items-center py-4"
              >
                <span>Blog</span>
                <FaChevronDown
                  className={`transition ${activeDropdown === "blog"
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {activeDropdown === "blog" && (
                <div className="pb-4 pl-4 space-y-3">
                  <a href="#" className="block">
                    Packing Tips
                  </a>

                  <a href="#" className="block">
                    Storage Guide
                  </a>

                  <a href="#" className="block">
                    City Guide
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 flex gap-4 items-center space-y-3">
              <button
                className={`bg-white text-[#116087] w-max text-[12px] font-semibold cursor-pointer px-6 py-3 rounded-full border border-[#116087] hover:bg-[#116087] hover:text-white transition-all duration-300`}
              >
                Write A Review
              </button>
              <button className="w-11 h-11 border rounded-full  border-transparent bg-[#E2EEFD] flex items-center justify-center">
                <FaPlus className="text-[#116087]" />
              </button>
            </div>

          </div>
        </div>
      )}




    </header>
  );
}