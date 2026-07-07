"use client";

import { useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaStar, FaRegStar } from "react-icons/fa";
import MovingCalculator from "@/components/frontend/MovingCalculator";


export default function HomePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance] = useState(0);
  const rating = 4.5;
  const totalReviews = 128;
  const cards = [
    {
      title: "Verified Listings Only",
      description:
        "Every mover goes through a verification process; licenses, reviews, and service details are all double-checked before showing up here.",
      bg: "bg-[#1160870f]",
    },
    {
      title: "Updated Information",
      description:
        "Moving data changes fast. We regularly review and update every detail, keeping you connected to reliable moving companies in USA.",
      bg: "bg-[#eb5c2f0d]",
    },
    {
      title: "Real Feedback from Real People",
      description:
        "We listen to users who've already moved. Their experiences help us refine and keep only trusted movers that actually deliver what they promise.",
      bg: "bg-[#00000008]",
    },
  ];
  const states = [
    {
      id: 166,
      name: "Florida",
      image: "/assets/img/home/florida.webp",
    },
    {
      id: 48,
      name: "California",
      image: "/assets/img/home/california.webp",
    },
    {
      id: 35,
      name: "New-jersey",
      image: "/assets/img/home/new-jersey.webp",
    },
    {
      id: 28,
      name: "Texas",
      image: "/assets/img/home/texas.webp",
    },
    {
      id: 24,
      name: "New-york",
      image: "/assets/img/home/new-york.webp",
    },
    {
      id: 19,
      name: "Maryland",
      image: "/assets/img/home/maryland.webp",
    },
    {
      id: 17,
      name: "Illinois",
      image: "/assets/img/home/illinois.webp",
    },
    {
      id: 15,
      name: "Virginia",
      image: "/assets/img/home/virginia.webp",
    },
    {
      id: 13,
      name: "North-carolina",
      image: "/assets/img/home/north-carolina.webp",
    },
    {
      id: 12,
      name: "Washington",
      image: "/assets/img/home/washington.webp",
    },
    {
      id: 9,
      name: "Tennessee",
      image: "/assets/img/home/tennessee.webp",
    },
    {
      id: 7,
      name: "Massachusetts",
      image: "/assets/img/home/massachusetts.webp",
    },
  ];
  const steps = [
    {
      id: 1,
      title: "Go to the movers list page",
    },
    {
      id: 2,
      title: "Search the moving company you used",
    },
    {
      id: 3,
      title: "Share your honest experience",
    },
  ];
  const focusItems = [
    {
      title: "Cost Calculator",
      desc: "We focus on making costs clear. You can use our moving cost calculator to estimate moving or packing costs before you decide.",
      btn: "Get your Quote",
      img: "/assets/img/home/cost-calculator.svg",
    },
    {
      title: "Movers Directory",
      desc: "Explore movers in USA by state, city, or route. We organize everything so you can find the right company faster and with confidence.",
      btn: "Find Your Mover",
      img: "/assets/img/home/movers-directory.svg",
    },
    {
      title: "Moving Resources",
      desc: "From long distance movers in USA to local movers near me, our best recommendations help you get the best movers and avoid common mistakes.",
      btn: "Get the Best Movers",
      img: "/assets/img/home/moving-resources.svg",
    },
    {
      title: "Compare Movers",
      desc: "Easily compare moving companies side by side, prices, services, and reviews, so you can pick the one that fits your move perfectly.",
      btn: "Compare Movers Now",
      img: "/assets/img/home/compare-movers.svg",
    },
  ];
  const features = [
    "Verified Licenses",
    "Local Move Availability",
    "Customer Support",
    "User Reviews",
    "Long Distance Coverage",
    "Moving Resources",
    "Pricing Transparency",
    "24/7 Support",
    "On-Time Performance",
    "Range of Services Offered",
    "Service Areas and Routes",
    "User Satisfaction",
  ];
  

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[500px] md:min-h-[700px] items-center justify-center bg-[url('/assets/img/home/final_banner.jpg')] bg-cover sm:bg-contain bg-center bg-no-repeat md:bg-repeat pb-10 md:pb-0">
        <div className="absolute inset-0 bg-[rgba(112,157,216,0.15)]"></div>

        <div className="relative container mx-auto mt-22 md:mt-10 px-4 flex flex-col items-center pt-8 pb-8 md:pb-0">

          <div className="max-w-5xl text-center mb-6 md:mb-12">
            <h1 className="text-[24px] sm:text-[28px] md:text-[48px] urbanfont font-extrabold leading-tight text-[#231f20]">
              Moving Soon? Let&apos;s Make It Surprisingly Simple
            </h1>

            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-[22px] text-[#2f2f2f] max-w-3xl mx-auto">
              Skip the endless searching. Compare verified movers, get quotes fast,
              and move with total confidence.
            </p>
          </div>

            <MovingCalculator bgColor="#ffffff" />
        </div>

      </section>

      {/* Trusted Movers Section */}
      <div className='mt-12 flex flex-col items-center'>
        <h3 className='urbanfont lg:text-5xl font-bold text-2xl text-center'>Find Trusted Moving Companies Near You</h3>
        <div className="  max-w-7xl mx-auto p-5  flex flex-col lg:flex-row justify-between gap-6 ">

          <div className="flex-1 bg-[#F8FAFB] rounded-[16px] border-[#11608729] p-6">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-semibold text-slate-800 urbanfont">
                Safe Ship Moving Services
              </h2>

              <FaCheckCircle className="w-6 h-6 text-blue-500" />
            </div>

            <p className="text-gray-800 font-medium">
              Andrew Freedman
              <span className="text-gray-500 font-normal ml-1">
                (4 minutes ago)
              </span>
            </p>

            <p className="mt-4 text-gray-700 line-clamp-2">
              "Safe Ship Moving Services provided an excellent moving experience. They were professional, efficient, and took great care of all our belongings. The team was friendly and knowledgeable throughout the entire process. I highly recommend them for any moving needs!"
              <button className="font-semibold ml-2 text-black">
                Read More
              </button>
            </p>


            <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-5 h-5 text-sky-700" />
                <span>Chicago, IL</span>
              </div>

              <span className="text-gray-800">
                USDOT No: 1234567
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-w-[220px]">
            <img
              src="https://mymovingjourney.com/companies/image/alma-moving.webp"
              alt="Hercules Moving Solutions Inc"
              className="h-24 object-contain mb-4"
            />

            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.floor(rating);
                return filled ? (
                  <FaStar key={i} className="w-5 h-5" />
                ) : (
                  <FaRegStar key={i} className="w-5 h-5" />
                );
              })}
            </div>

            <p className="mt-3 text-3xl font-bold text-sky-800">
              {rating}
              <span className="text-lg font-normal ml-2">
                ({totalReviews} reviews)
              </span>
            </p>
          </div>
        </div>
        <hr className="w-[45%] opacity-15 mx-auto my-5 bg-current border-0 h-px mt-0" />

        <button className={`bg-[#116087] text-white text-[14px]  font-light cursor-pointer px-6 py-3 rounded-full border border-transparent hover:bg-[#fff] hover:text-black hover:border-[#116087] transition-all duration-300 `}>   See All Movers
        </button>

      </div>

      {/* Verified Movers Section */}
      <section className="w-full bg-[#f8f8f8] mt-6 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl urbanfont md:text-4xl font-bold text-[#111827] leading-tight">
              How Do You Know These Movers Are Real?
            </h2>

            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Every mover you see here has been{" "}
              <span className="font-semibold">
                checked, verified, and confirmed
              </span>{" "}
              before being added. We make sure you only see{" "}
              <span className="font-semibold">trusted movers in USA</span>, so
              when you compare, you're comparing what's real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${card.bg} rounded-2xl p-4 pb-8  h-auto`}
              >
                <h3 className="text-2xl  text-black urbanfont leading-snug">
                  {card.title}
                </h3>

                <p className="mt-4 text-gray-800 text-lg leading-7">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Top Moving States Section */}
      <section className="bg-[#f8f8f8]   py-16">
        <div className="mx-auto  max-w-6xl flex flex-col items-center gap-6 px-4">

          <h2 className="mb-12 text-center text-3xl font-bold text-[#1a1a1a] md:text-5xl urbanfont">
            Top Moving States In USA
          </h2>

          <div className="grid items-center gap-4 grid-cols-1 md:grid-cols-3 w-full">
            {states.map((state) => (
              <div
                key={state.id}
                className="group flex items-center gap-2 rounded-full  shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-[90px] w-[95px] flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-5 py-4">
                  <h3 className="text-4xl font-bold text-[#0E6BB7] leading-none urbanfont">
                    {state.id}
                    <span className="ml-2 text-2xl font-semibold text-[#184A78]">
                      {state.name}
                    </span>
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-[15px] font-medium text-[#0E6BB7]">
                    <a href="#" className="hover:underline">
                      List
                    </a>
                    <span>|</span>

                    <a href="#" className="hover:underline">
                      Movers
                    </a>
                    <span>|</span>

                    <a href="#" className="hover:underline">
                      Cost
                    </a>
                    <span>|</span>

                    <a href="#" className="hover:underline">
                      Routes
                    </a>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <button className={`bg-[#116087] text-white text-[14px]  font-light cursor-pointer px-6 py-3 rounded-full border border-transparent hover:bg-[#fff] hover:text-black hover:border-[#116087] transition-all duration-300 `}>  Explore more states
          </button>
        </div>


      </section>


      {/* Share Review Section */}
      <section className=" py-20">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="urbanfont text-4xl lg:text-5xl font-bold text-[#1D1D1D]">
              How You Can Share Your Review
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Real stories from real moves help others find{" "}
              <span className="font-semibold text-black">
                trusted movers in USA
              </span>{" "}
              faster and with confidence. It only takes a minute, here's how you
              can do it.
            </p>
          </div>

          <div className="relative mt-20">

            <div
              className="hidden lg:block absolute top-10 left-[16%] right-[16%] h-[2px]"
              style={{
                background:
                  "linear-gradient(to right,#0B6A99 50%,transparent 50%)",
                backgroundSize: "10px 2px",
              }}
            />

            <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-0">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center w-full"
                >
                  {index !== steps.length - 1 && (
                    <div
                      className="lg:hidden absolute top-[82px] left-1/2 -translate-x-1/2 w-[2px] h-24"
                      style={{
                        background:
                          "linear-gradient(to bottom,#0B6A99 50%,transparent 50%)",
                        backgroundSize: "2px 10px",
                      }}
                    />
                  )}

                  <div className="relative  w-20 h-20 rounded-full border-2 border-[#0B6A99]  flex items-center justify-center">
                    <span className="text-4xl font-bold">{step.id}</span>
                  </div>

                  <h3 className="mt-6 text-center max-w-[220px] text-2xl leading-9 urbanfont">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <button className={`bg-[#116087] text-white text-[14px]  font-light cursor-pointer px-6 py-3 rounded-full border border-transparent hover:bg-[#fff] hover:text-black hover:border-[#116087] transition-all duration-300 `}>  Write Your Review
            </button>
          </div>
        </div>
      </section>


      {/* As Featured On Section */}
      <section className=" py-16">
        <div className="max-w-[920px] mx-auto px-4">

          <div className="relative border border-[#0B6EA9] rounded-[18px] px-8 py-8">

            <h3
              className="
              absolute
              -top-[17px]
              left-8
              bg-white
              px-[10px]
              text-[22px]
              font-semibold
              text-[#0B6EA9]
              urbanfont
              leading-none
            "
            >
              As Featured On
            </h3>

            <img
              src="/assets/img/home/brand_logos.webp"
              alt="Brand Logos"
              className="w-full block"
            />

          </div>

        </div>
      </section>

      {/* What We Focus On Section */}
      <section className=" py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl urbanfont font-bold text-[#111827] mb-14">
            What We Focus On
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {focusItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#F8FBFF] rounded-[22px] shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8">
                  <img
                    src={item.img}
                    alt={item.title}
                    className=""
                  />
                </div>

                <h3 className="text-[26px] md:text-[30px] urbanfont leading-[1.15] text-[#111827] mb-4">
                  {item.title.split(" ").map((word, index) => (
                    <span key={index} className="block">
                      {word}
                    </span>
                  ))}
                </h3>

                <p className="text-[18px] leading-9 text-[#374151] flex-grow">
                  {item.desc}
                </p>

                <button className="mt-4 border-2 border-[#0B69A3] text-[#0B69A3] rounded-full py-3 px-6 font-semibold text-[14px] hover:bg-[#0B69A3] hover:text-white transition">
                  {item.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Rank Movers Section */}
      <section className="py-12 px-4">
        <div
          className="max-w-[1280px] mx-auto rounded-[26px] px-6 md:px-12 lg:px-18 py-12"
          style={{
            background: "linear-gradient(12deg, #116087, #030303)",
          }}
        >
          <h2 className="text-center text-white urbanfont text-[34px] md:text-[50px] font-bold leading-tight">
            How We Rank Movers
          </h2>

          <p className="text-center text-white text-[18px] md:text-[20px] max-w-[760px] mx-auto mt-6 leading-relaxed">
            These are our criteria — focus on them, as your ranking will depend on
            these points.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 mb-12 lg:grid-cols-3 gap-y-6 gap-x-8 justify-items-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 w-full max-w-[310px]"
              >
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <span className="text-white text-[22px] leading-none">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Why Choose Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-center urbanfont text-[#0B1C33] text-[30px] md:text-[42px] font-bold leading-tight">
            Why Choose My Moving Journey?
          </h2>

          <p className="max-w-6xl mx-auto mt-6 text-center text-[#1f2937] text-[18px] md:text-[20px] leading-relaxed">
            You don't want another list of random names; you want something real,
            something that actually helps. My Moving Journey was built for that
            moment, when you just want things to feel clear, honest, and under
            control again.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">

            <div className="bg-[#F1F6F8] rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[32px] font-semibold text-[#111827] leading-tight urbanfont">
                Real Movers and Not Random Listings
              </h3>

              <p className="mt-5 text-[#374151] text-[18px] leading-9">
                Every mover here is verified, licensed, and reviewed. You only
                see trusted movers in USA who've earned their spot.
              </p>
            </div>

            <div className="bg-[#F1F6F8] rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[32px] font-semibold text-[#111827] leading-tight urbanfont">
                Built Around Your Needs
              </h3>

              <p className="mt-5 text-[#374151] text-[18px] leading-9">
                Whether you're checking local movers near me or long distance
                movers in USA, everything's organized for how real people search.
              </p>
            </div>

            <div className="bg-[#F1F6F8] rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[32px] font-semibold text-[#111827] leading-tight urbanfont">
                Clear Choices
              </h3>

              <p className="mt-5 text-[#374151] text-[18px] leading-9">
                Compare moving companies side by side, understand costs, and pick
                what fits your needs. There are no hidden fees or wasted time.
              </p>
            </div>

            <div className="bg-[#F1F6F8] rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[32px] font-semibold text-[#111827] leading-tight urbanfont">
                Information You Can Actually Use
              </h3>

              <p className="mt-5 text-[#374151] text-[18px] leading-9">
                From quotes to reviews, every piece of data is there to make your
                decision easier, not harder.
              </p>
            </div>

            <div className="bg-[#F1F6F8] rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[32px] font-semibold text-[#111827] leading-tight urbanfont">
                A Platform That Listens
              </h3>

              <p className="mt-5 text-[#374151] text-[18px] leading-9">
                We keep improving from real user experiences. Your feedback shapes
                what stays, what goes, and what gets better.
              </p>
            </div>

          </div>
        </div>
      </section>
   
   
    </>
  );
}