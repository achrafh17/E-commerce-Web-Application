"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Zap,
  TrendingUp,
  Gift,
  Headphones,
  Smartphone,
  Laptop,
  Monitor,
  Gamepad2,
  Tv,
  Camera,
  Home,
  Shirt,
  Baby,
  Footprints,
  Briefcase,
  Watch,
  Gem,
  Sparkles,
  Droplet,
  Scissors,
  Flower2,
  HeartPulse,
  Sofa,
  Utensils,
  Lamp,
  BedDouble,
  Bath,
  Package,
  ShoppingBasket,
  CupSoda,
  Cookie,
  Dog,
  Dumbbell,
  TreePine,
  Tent,
  Bike,
  Car,
  Book,
  PenTool,
  Music,
  Film,
  ToyBrick,
  Factory,
} from "lucide-react";
import Link from "next/link";

export default function MegamartNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryOpen, setisCategoryOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const categories = [
    // Electronics
    { name: "Electronics", icon: Zap, subCategory: false },
    { name: "Phones", icon: Smartphone, subCategory: true },
    { name: "Smartphones", icon: Smartphone, subCategory: true },
    { name: "Phone Accessories", icon: Headphones, subCategory: true },
    { name: "Computers", icon: Laptop, subCategory: true },
    { name: "Laptops", icon: Laptop, subCategory: true },
    { name: "Desktops", icon: Monitor, subCategory: true },
    { name: "Computer Accessories", icon: Monitor, subCategory: true },
    { name: "Gaming", icon: Gamepad2, subCategory: true },
    { name: "TV", icon: Tv, subCategory: true },
    { name: "Audio", icon: Headphones, subCategory: true },
    { name: "Camera", icon: Camera, subCategory: true },
    { name: "Smart Home", icon: Home, subCategory: true },

    // Fashion
    { name: "Fashion", icon: Shirt, subCategory: false },
    { name: "Men Clothing", icon: Shirt, subCategory: true },
    { name: "Women Clothing", icon: Shirt, subCategory: true },
    { name: "Kids Clothing", icon: Baby, subCategory: true },
    { name: "Shoes", icon: Footprints, subCategory: true },
    { name: "Men Shoes", icon: Footprints, subCategory: true },
    { name: "Women Shoes", icon: Footprints, subCategory: true },
    { name: "Accessories", icon: Briefcase, subCategory: true },
    { name: "Watches", icon: Watch, subCategory: true },
    { name: "Jewelry", icon: Gem, subCategory: true },
    { name: "Bags", icon: Briefcase, subCategory: true },

    // Beauty & Health
    { name: "Beauty", icon: Sparkles, subCategory: false },
    { name: "Skincare", icon: Droplet, subCategory: true },
    { name: "Haircare", icon: Scissors, subCategory: true },
    { name: "Perfumes", icon: Flower2, subCategory: true },
    { name: "Makeup", icon: Sparkles, subCategory: true },
    { name: "Personal Care", icon: Droplet, subCategory: true },
    { name: "Health Care", icon: HeartPulse, subCategory: true },

    // Home & Kitchen
    { name: "Home", icon: Home, subCategory: false },
    { name: "Furniture", icon: Sofa, subCategory: true },
    { name: "Kitchen", icon: Utensils, subCategory: true },
    { name: "Decor", icon: Lamp, subCategory: true },
    { name: "Bedroom", icon: BedDouble, subCategory: true },
    { name: "Bathroom", icon: Bath, subCategory: true },
    { name: "Lighting", icon: Lamp, subCategory: true },
    { name: "Cleaning Supplies", icon: Package, subCategory: true },

    // Supermarket
    { name: "Supermarket", icon: ShoppingBasket, subCategory: false },
    { name: "Food", icon: ShoppingBasket, subCategory: true },
    { name: "Fresh Produce", icon: ShoppingBasket, subCategory: true },
    { name: "Beverages", icon: CupSoda, subCategory: true },
    { name: "Snacks", icon: Cookie, subCategory: true },
    { name: "Baby Food", icon: Baby, subCategory: true },
    { name: "Pet Food", icon: Dog, subCategory: true },

    // Appliances
    { name: "Appliances", icon: Package, subCategory: false },
    { name: "Large Appliances", icon: Package, subCategory: true },
    { name: "Small Appliances", icon: Package, subCategory: true },

    // Sports & Outdoors
    { name: "Sports", icon: Dumbbell, subCategory: false },
    { name: "Fitness", icon: Dumbbell, subCategory: true },
    { name: "Outdoor", icon: TreePine, subCategory: true },
    { name: "Camping", icon: Tent, subCategory: true },
    { name: "Cycling", icon: Bike, subCategory: true },

    // Automotive
    { name: "Automotive", icon: Car, subCategory: false },
    { name: "Car Accessories", icon: Car, subCategory: true },
    { name: "Motorbike Accessories", icon: Bike, subCategory: true },

    // Books & Media
    { name: "Books", icon: Book, subCategory: false },
    { name: "Stationery", icon: PenTool, subCategory: true },
    { name: "Music", icon: Music, subCategory: true },
    { name: "Movies", icon: Film, subCategory: true },

    // Toys & Kids
    { name: "Toys", icon: ToyBrick, subCategory: false },
    { name: "Baby Products", icon: Baby, subCategory: true },
    { name: "Kids", icon: Baby, subCategory: true },
    { name: "School Supplies", icon: PenTool, subCategory: true },

    // Office & Industry
    { name: "Office Equipment", icon: Briefcase, subCategory: false },
    { name: "Industrial Supplies", icon: Factory, subCategory: true },
  ];
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        isCategoryOpen
      )
        setisCategoryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism Navbar */}
      <div className="relative bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 shadow-xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setisCategoryOpen(!isCategoryOpen)}
              className="absolute top-6 left-[-100]  flex justify-center align-center text-gray-600 hover:text-fuchsia-600   rounded-xl transition-all duration-500 ease-in-out transform  group border border-transparent "
            >
              {isCategoryOpen ? (
                <X className="w-8 h-8 text-center" />
              ) : (
                <Menu className="w-8 h-8 text-center" />
              )}
            </button>{" "}
            {/* Logo Section */}
            <div className="flex items-center cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-3 rounded-2xl transform group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                      MegaMart
                    </h1>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search Bar - Desktop */}
            <div className="hidden lg:block ">
              <div className="relative w-xl mx-auto">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-lg transition-opacity duration-300 ${
                    isSearchFocused ? "opacity-30" : "opacity-0"
                  }`}
                ></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What are you looking for today?"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full bg-white text-gray-800 placeholder-gray-400 px-14 py-3 rounded-3xl border-2 border-gray-200 focus:border-fuchsia-400 focus:outline-none shadow-lg transition-all duration-300"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold px-6 py-2 rounded-2xl hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button className="flex items-center space-x-2 px-5 py-2.5 text-gray-700 hover:text-fuchsia-600 bg-gray-50/50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20  group border border-transparent hover:border-fuchsia-200">
                <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Support</span>
              </button>
            </div>
            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden p-3 text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded-xl transition-all duration-300">
                <Search className="w-5 h-5" />
              </button>

              {/* User Button */}
              <Link
                href="/login"
                className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl hover:shadow-xl hover:shadow-fuchsia-500/40 hover:shadow-l transition-all duration-300  group"
              >
                <User className="w-4 h-4  transition-transform" />
                <span className="font-semibold text-sm">Account</span>
              </Link>

              {/* Cart */}
              <button className="relative p-3 text-gray-600 hover:text-fuchsia-600 bg-gray-50/50 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group border border-transparent hover:border-fuchsia-200">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-0 -right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-pink-500/50 ">
                  0
                </div>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded-xl transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mo
      bile Menu */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-2xl overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 px-12 py-4 rounded-2xl border border-gray-200 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 transition-all"
            />
          </div>

          {/* Mobile Categories */}
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 text-gray-700 hover:text-fuchsia-600 rounded-2xl transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-fuchsia-300"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile User Actions */}
          <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all duration-300">
            <User className="w-5 h-5" />
            <span className="font-bold">Sign In / Register</span>
          </button>
        </div>
      </div>
      {/* categotries desktop version */}
      <div
        ref={ref}
        className={`w-60 bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-2xl  transition-all duration-500  overflow-y-auto ${
          isCategoryOpen ? "max-h-[500px] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className=" grid grid-cols-1 ">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className={`${
                  category.subCategory
                    ? "hover:text-fuchsia-600 hover:shadow-lg"
                    : "bg-pink-100"
                }  transition-all duration-300 `}
              >
                {" "}
                <button
                  className={` flex items-center justify-center space-x-2 ${
                    category.subCategory ? "px-6" : "px-3"
                  }  py-3   `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{category.name}</span>
                </button>
                <div className="bg-gray-300 h-[1px] "></div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Decorative Bottom Line */}
      <div
        className={`${
          isCategoryOpen ? "w-0 opcacity-0" : ""
        } h-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600`}
      ></div>
    </div>
  );
}
