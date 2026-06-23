"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Check,
  Info,
  ChevronRight,
  Navigation,
  FileText,
  AlertTriangle,
  BadgePercent,
  Trash2,
  Plus,
  Minus,
  User,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Volume2,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  X,
  Phone,
  Play
} from "lucide-react";

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  recommended?: boolean;
  reason?: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Outlet {
  id: number;
  name: string;
  type: string;
  context: string;
  opportunity: number;
  sequence: number;
  image: string;
  completed: boolean;
  skipped: boolean;
  skippedReason?: string;
  orderValue?: number;
  hydrationActionIncluded?: boolean;
}

// Key App Constants
const INITIAL_OUTLETS: Outlet[] = [
  {
    id: 1,
    name: "Pashan Medico",
    type: "Chemist",
    context: "Hydration demand expected",
    opportunity: 8500,
    sequence: 1,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3b6f?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  },
  {
    id: 2,
    name: "Kothrud Super Store",
    type: "Kirana",
    context: "Scheme ending soon",
    opportunity: 12000,
    sequence: 2,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  },
  {
    id: 3,
    name: "Balaji Provisions",
    type: "Kirana",
    context: "Routine coverage",
    opportunity: 3200,
    sequence: 3,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  },
  {
    id: 4,
    name: "Arihant Medical",
    type: "Chemist",
    context: "Low stock detected",
    opportunity: 6400,
    sequence: 4,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3b6f?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  },
  {
    id: 5,
    name: "Shree Traders",
    type: "General Store",
    context: "Scheme participation pending",
    opportunity: 5800,
    sequence: 5,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  },
  {
    id: 6,
    name: "Mahalaxmi Stores",
    type: "Kirana",
    context: "Seasonal demand increase",
    opportunity: 7100,
    sequence: 6,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300",
    completed: false,
    skipped: false
  }
];

const PRODUCTS: Product[] = [
  // --- HYDRATION ---
  // Recommended (Must NOT repeat in standard catalog below)
  {
    id: "hyd_rec1",
    name: "ORS Advanced Packs (Box of 10)",
    category: "Hydration",
    price: 300,
    recommended: true,
    reason: "Low stock at neighboring pharmacies",
    badge: "High Demand"
  },
  {
    id: "hyd_rec2",
    name: "Electral Orange Sachet (Pack of 5)",
    category: "Hydration",
    price: 110,
    recommended: true,
    reason: "Scheme Available: Buy 10 Get 1",
    badge: "Buy 10 Get 1"
  },
  {
    id: "hyd_rec3",
    name: "Glucon-D Fresh Summer Tub 1kg",
    category: "Hydration",
    price: 350,
    recommended: true,
    reason: "Popular during summer heat waves",
    badge: "Best Seller"
  },
  // Standard Hydration (No repeats)
  {
    id: "hyd_std1",
    name: "Mineral Water Premium 1L",
    category: "Hydration",
    price: 20
  },
  {
    id: "hyd_std2",
    name: "Fritz Pro Energy Booster Drink",
    category: "Hydration",
    price: 115
  },
  {
    id: "hyd_std3",
    name: "Glucose Plus Orange Drink 500g",
    category: "Hydration",
    price: 145
  },
  {
    id: "hyd_std4",
    name: "Hydralyte Lemon Fizz Tab",
    category: "Hydration",
    price: 180
  },
  
  // --- BEVERAGES ---
  {
    id: "bev1",
    name: "Cold Drink Coco Fizz 500ml",
    category: "Beverages",
    price: 40
  },
  {
    id: "bev2",
    name: "Fruit Juice Pure Mango 1L",
    category: "Beverages",
    price: 95
  },
  {
    id: "bev3",
    name: "Iced Tea Herbal Lemon 250ml",
    category: "Beverages",
    price: 60
  },
  {
    id: "bev4",
    name: "Apple Cider Sparkling 750ml",
    category: "Beverages",
    price: 120
  },

  // --- SNACKS ---
  {
    id: "snk1",
    name: "Glucose Energy Biscuits Pack",
    category: "Snacks",
    price: 10
  },
  {
    id: "snk2",
    name: "Spicy Namkeen Mixture 200g",
    category: "Snacks",
    price: 45
  },
  {
    id: "snk3",
    name: "Classic Potato Chips Salted",
    category: "Snacks",
    price: 25
  },
  {
    id: "snk4",
    name: "Premium Milk Cocoa Block 80g",
    category: "Snacks",
    price: 80
  },

  // --- PERSONAL CARE ---
  {
    id: "pc1",
    name: "Antiseptic Tea Tree Soap 100g",
    category: "Personal Care",
    price: 35
  },
  {
    id: "pc2",
    name: "Amla Herbal Shampoo 100ml",
    category: "Personal Care",
    price: 90
  },
  {
    id: "pc3",
    name: "Whitening Fluoride Toothpaste",
    category: "Personal Care",
    price: 65
  },
  {
    id: "pc4",
    name: "Charcoal Deep Face Wash 50g",
    category: "Personal Care",
    price: 110
  },

  // --- HOUSEHOLD ---
  {
    id: "hh1",
    name: "Lemon Scented Dishwash Liquid",
    category: "Household",
    price: 55
  },
  {
    id: "hh2",
    name: "Disinfectant Floor Cleaner 1L",
    category: "Household",
    price: 130
  },
  {
    id: "hh3",
    name: "Active Oxy Detergent Powder 1kg",
    category: "Household",
    price: 120
  },
  {
    id: "hh4",
    name: "Streak-Free Glass Cleaner Spray",
    category: "Household",
    price: 85
  }
];

export default function FieldAssistApp() {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState<
    "SPLASH" | "TODAYS_BEAT" | "NAVIGATING" | "OUTLET_CONTEXT" | "ORDER_BOOKING" | "CART_REVIEW" | "VISIT_COMPLETE" | "UPDATED_BEAT"
  >("SPLASH");

  // State
  const [visitedCount, setVisitedCount] = useState(0);
  const [bookedAmount, setBookedAmount] = useState(0);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [outlets, setOutlets] = useState<Outlet[]>(INITIAL_OUTLETS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Hydration");
  const [schemeOptimized, setSchemeOptimized] = useState(false);

  // Bottom Sheets / Drawer States
  const [infoBottomSheet, setInfoBottomSheet] = useState(false);
  const [talkingPointsBottomSheet, setTalkingPointsBottomSheet] = useState(false);
  const [previousVisitsModal, setPreviousVisitsModal] = useState(false);
  const [skipReasonBottomSheet, setSkipReasonBottomSheet] = useState(false);
  const [quickQuestionBottomSheet, setQuickQuestionBottomSheet] = useState(false);
  const [viewSummaryBottomSheet, setViewSummaryBottomSheet] = useState(false);

  // Intent capture states
  const [selectedSkipReason, setSelectedSkipReason] = useState("");
  const [selectedNoHydrationReason, setSelectedNoHydrationReason] = useState("");

  // Splash Loading message rotation
  const [splashIndex, setSplashIndex] = useState(0);
  const splashMessages = [
    "Checking attendance...",
    "Syncing outlet opportunities...",
    "Building today's priorities..."
  ];

  // Rotation interval for splash messages
  useEffect(() => {
    if (currentScreen === "SPLASH") {
      const msgInterval = setInterval(() => {
        setSplashIndex((prev) => (prev + 1) % splashMessages.length);
      }, 800);

      const navTimer = setTimeout(() => {
        setCurrentScreen("TODAYS_BEAT");
      }, 3500);

      return () => {
        clearInterval(msgInterval);
        clearTimeout(navTimer);
      };
    }
  }, [currentScreen, splashMessages.length]);

  // Navigation Simulation timing
  useEffect(() => {
    if (currentScreen === "NAVIGATING") {
      const waitTimer = setTimeout(() => {
        setCurrentScreen("OUTLET_CONTEXT");
      }, 2000);
      return () => clearTimeout(waitTimer);
    }
  }, [currentScreen]);

  // Handle Cart Computations
  const cartTotals = useMemo(() => {
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const schemeSavings = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0; // 5% dynamic simulation scheme savings
    const finalValue = subtotal - schemeSavings;
    const distinctSkus = cart.length;

    return { totalItemsCount, subtotal, schemeSavings, finalValue, distinctSkus };
  }, [cart]);

  // Evaluate Hydration Focus addition
  const isHydrationAdded = useMemo(() => {
    return cart.some((item) => item.product.category === "Hydration" && item.quantity > 0);
  }, [cart]);

  // Cart actions
  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateQty = (productId: string, val: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;
      const newQty = item.quantity + val;
      if (newQty <= 0) {
        return prev.filter((i) => i.product.id !== productId);
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: newQty } : i
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSchemeOptimized(false);
  };

  // Filter products based on active category & search query
  const filteredProducts = useMemo(() => {
    const matched = PRODUCTS.filter((p) => {
      const matchesCategory = p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // If "Hydration", keep recommended products out of standard list as requested:
    // "Rule: These recommended products must NOT repeat in the standard catalog list below."
    if (activeCategory === "Hydration") {
      return matched.filter((p) => !p.recommended);
    }
    return matched;
  }, [activeCategory, searchQuery]);

  // Filter ONLY recommended hydration items
  const recommendedHydration = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === "Hydration" && p.recommended);
  }, []);

  // UI state action triggers
  const triggerStartVisit = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setCurrentScreen("NAVIGATING");
  };

  // Submit flow
  const handleSubmitOrder = () => {
    if (isHydrationAdded) {
      // Go directly to complete screen
      transitionToComplete(false);
    } else {
      // Open questionnaire first
      setQuickQuestionBottomSheet(true);
    }
  };

  const transitionToComplete = (hasReasonFormBeenFilled: boolean) => {
    setQuickQuestionBottomSheet(false);
    
    // Set Pashan Medico as Visited & Record totals
    setOutlets((prev) =>
      prev.map((o) =>
        o.id === 1
          ? {
              ...o,
              completed: true,
              orderValue: cartTotals.finalValue,
              hydrationActionIncluded: isHydrationAdded,
              skipped: false
            }
          : o
      )
    );

    // Update session indicators
    setVisitedCount(1);
    setBookedAmount(cartTotals.finalValue);
    setCurrentScreen("VISIT_COMPLETE");
  };

  // Skip Order state transition
  const handleSkipOrderConfirm = () => {
    setSkipReasonBottomSheet(false);
    
    setOutlets((prev) =>
      prev.map((o) =>
        o.id === 1
          ? {
              ...o,
              completed: true,
              skipped: true,
              skippedReason: selectedSkipReason || "Already Stocked",
              orderValue: 0,
              hydrationActionIncluded: false
            }
          : o
      )
    );
    setVisitedCount(1);
    // Move to Screen 6 directly
    setCurrentScreen("UPDATED_BEAT");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    // Outer responsive viewport wrapper centering the device simulator with Sleek Interface layout
    <div className="h-screen max-h-screen bg-[#F5F7FA] text-[#0A1126] font-sans selection:bg-[#0296CC] selection:text-white relative overflow-hidden flex flex-col lg:flex-row items-stretch">
      
      {/* Left Sidebar: Analytics Overview & Rep Profile */}
      <aside className="hidden lg:flex w-72 p-6 flex-col border-r border-[#E6EAF0] shrink-0 bg-white justify-between z-10">
        <div className="space-y-6">
          {/* Brand Logo Box */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0296CC] rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#0A1126]">FieldAssist</span>
          </div>
          
          {/* Rep Profile Details */}
          <div>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Rep Profile</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A1126] flex items-center justify-center text-white font-black italic text-sm shadow-inner">
                RM
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A1126]">Rahul Malhotra</p>
                <p className="text-xs text-[#6B7280]">Pune West Division</p>
              </div>
            </div>
          </div>

          {/* Today's Target Achievement widget */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{"Today's Performance"}</p>
            <div className="bg-[#F5F7FA] p-4 rounded-xl border border-[#E6EAF0]">
              <p className="text-xs text-[#6B7280] mb-1">Target Achievement</p>
              <div className="flex items-end gap-1.5">
                <p className="text-xl font-extrabold text-[#0A1126]">{formatCurrency(3330 + bookedAmount)}</p>
                <p className="text-xs text-[#6B7280] pb-0.5">/ {formatCurrency(48000)}</p>
              </div>
              <div className="w-full h-1.5 bg-[#E6EAF0] rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-[#0296CC] rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.round(((3330 + bookedAmount) / 48000) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2.5 text-[10px] font-mono text-[#6B7280]">
                <span>Stop Coverage</span>
                <span className="font-semibold text-[#0A1126]">{visitedCount}/18 Visited</span>
              </div>
            </div>
          </div>

          {/* Prototype Guidance / Dynamic Helper */}
          <div className="space-y-2 mt-8">
            <p className="font-bold text-[10px] tracking-wider text-[#0296CC] uppercase">Prototype Controls</p>
            <div className="bg-[#F5F7FA] p-3.5 rounded-xl border border-[#E6EAF0] text-xs text-[#6B7280] space-y-2 leading-relaxed">
              <p>• Click <b className="text-[#0A1126] font-bold">Start Visit</b> to initiate navigation.</p>
              <p>• Select <b className="text-[#0A1126] font-bold">Hydration</b> focus to satisfy sales recommendations.</p>
              <p>• Complete the visit to inspect the updated beat and collapsed card state.</p>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="border-t border-[#E6EAF0] pt-4 mt-auto">
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
            <span>UTC Shift Verified</span>
            <span className="font-semibold text-emerald-600">● Live Connected</span>
          </div>
        </div>
      </aside>

      {/* Main View: Centered Mobile App Frame */}
      <main className="flex-1 flex justify-center items-center sm:py-4 relative bg-[#F5F7FA] h-full overflow-hidden">
        
        {/* Subtle centerpiece background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0296CC]/5 rounded-full blur-[80px] pointer-events-none" />

        <div 
          id="device-frame"
          className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:max-h-[844px] bg-[#F5F7FA] rounded-none sm:rounded-[48px] shadow-none sm:shadow-[0_25px_60px_-15px_rgba(10,17,38,0.15)] border-0 sm:border-[11px] border-[#0A1126] overflow-hidden relative flex flex-col select-none text-[#0A1126] ring-0 sm:ring-4 ring-white/5"
        >
        {/* Dynamic Island Simulated Bezel Header - Always Fixed on Desktop */}
        <div className="hidden sm:flex flex-none h-11 bg-black z-40 px-6 items-center justify-between pointer-events-none select-none text-[12px] font-semibold text-white relative">
          <span className="font-mono">10:42</span>
          {/* Bezel Notch / Dynamic Island */}
          <div className="w-[110px] h-[28px] bg-black rounded-3xl absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#0D1017] rounded-full absolute right-4 ring-1 ring-white/10" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-white/60 rounded-[3px] p-[1px] flex items-center">
              <div className="h-full w-[85%] bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Main Phone Window Viewport */}
        <div className="flex-1 relative flex flex-col overflow-hidden bg-[#F5F7FA]">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 0: SPLASH SCREEN */}
            {currentScreen === "SPLASH" && (
              <motion.div
                key="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white flex flex-col justify-between items-center p-8 z-55"
              >
                {/* Visual Top Padding */}
                <div />

                {/* Center Core Logo with Scale Animations */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="mb-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://cdn.brandfetch.io/id315U4IA2/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1773701661842"
                      alt="FieldAssist Logo"
                      className="h-12 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  
                  <div className="space-y-1">
                    <h2 className="text-2xl font-display font-semibold text-[#0A1126] tracking-tight">
                      Good Morning, Rahul
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      {"Preparing today's beat planner..."}
                    </p>
                  </div>
                </div>

                {/* Rotating status lines & progress bar */}
                <div className="w-full space-y-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0296CC] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0296CC]"></span>
                      </span>
                      <p className="text-xs text-[#0296CC] font-mono tracking-wide uppercase font-semibold">
                        {splashMessages[splashIndex]}
                      </p>
                    </div>

                    {/* Faux Animated linear progress slider */}
                    <div className="w-48 h-1 bg-[#E6EAF0] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "5%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 3.2 }}
                        className="h-full bg-[#0296CC]"
                      />
                    </div>
                  </div>

                  <button
                    id="skip-splash-btn"
                    onClick={() => setCurrentScreen("TODAYS_BEAT")}
                    className="mx-auto flex items-center gap-1 text-[11px] font-mono text-gray-400 hover:text-[#0296CC] transition-all bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100"
                  >
                    <Play size={10} className="fill-current" /> Fast Forward [Skip splash]
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 1: TODAY'S BEAT */}
            {currentScreen === "TODAYS_BEAT" && (
              <motion.div
                key="todays_beat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                {/* Header Section - Fixed Top Bar */}
                <div id="beat-header" className="flex-none bg-white border-b border-[#E6EAF0] p-4 z-40 flex justify-between items-center shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://cdn.brandfetch.io/id315U4IA2/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1773701661842"
                    alt="FieldAssist Logo"
                    className="h-6 w-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center gap-2 bg-[#F5F7FA] px-2 py-1 rounded-full border border-[#E6EAF0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">REP ACTIVE</span>
                  </div>
                </div>

                {/* Main page content scrollable container */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-20">
                  
                  {/* Non-sticky header element and KPI block indicators */}
                  <div className="space-y-3 pb-1">
                    <div>
                      <h2 className="text-xl font-display font-extrabold text-[#0A1126] tracking-tight">{"Today's Beat"}</h2>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">22 Jun • Pune West Lane-A</p>
                    </div>

                    {/* KPI Blocks */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F5F7FA] border border-[#E6EAF0] rounded-xl p-2.5">
                        <p className="text-[10px] text-[#6B7280] font-mono uppercase tracking-wider font-semibold">Beat Stops</p>
                        <p className="text-base font-display font-bold text-[#0A1126]">18 Stops</p>
                      </div>
                      <div className="bg-[#0296CC]/5 border border-[#0296CC]/15 rounded-xl p-2.5">
                        <p className="text-[10px] text-[#0296CC] font-mono uppercase tracking-wider font-semibold">Total Potential</p>
                        <p className="text-base font-display font-bold text-[#0296CC]">{formatCurrency(48000)}</p>
                      </div>
                    </div>
                  </div>
                  {outlets.map((outlet) => {
                    const isTargetOutlet = outlet.id === 1;

                    return (
                      <div
                        key={outlet.id}
                        id={`outlet-card-${outlet.id}`}
                        className={`bg-white rounded-2xl border-2 transition-all shadow-sm overflow-hidden p-3.5 relative flex flex-col gap-3 ${
                          isTargetOutlet
                            ? "border-[#0296CC] bg-[#0296CC]/[0.02]"
                            : "border-[#E6EAF0] "
                        }`}
                      >
                        {/* Image, title & text header strip */}
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={outlet.image}
                              alt={outlet.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1 left-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                              {outlet.sequence}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-mono text-[#6B7280] font-bold uppercase">
                                {outlet.type}
                              </span>
                              {isTargetOutlet && (
                                <span className="px-1.5 py-0.5 rounded bg-[#0296CC]/10 text-[9px] font-mono text-[#0296CC] font-extrabold uppercase animate-pulse">
                                  PRIORITY
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-display font-bold text-[#0A1126] mt-1 truncate">
                              {outlet.name}
                            </h3>
                            <p className="text-[11px] text-[#6B7280] flex items-center gap-1 mt-0.5 font-sans italic">
                              <Sparkles size={10} className="text-[#0296CC]" />
                              {outlet.context}
                            </p>
                          </div>
                        </div>

                        {/* Card math and CTA strip */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
                          <div>
                            <span className="text-[9px] text-[#6B7280] block font-mono uppercase font-semibold">Value Opportunity</span>
                            <span className="text-sm font-display font-extrabold text-[#0A1126]">
                              {formatCurrency(outlet.opportunity)}
                            </span>
                          </div>

                          {isTargetOutlet ? (
                            <button
                              id="start-visit-btn"
                              onClick={() => triggerStartVisit(outlet)}
                              className="bg-[#0296CC] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#0296CC]/90 transition-all font-sans active:scale-95 shadow-md shadow-[#0296CC]/20 flex items-center gap-1"
                            >
                              <Navigation size={12} className="fill-current" /> Start Visit
                            </button>
                          ) : (
                            <button
                              className="bg-gray-100 hover:bg-gray-200 text-[#6B7280] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all font-sans select-none"
                              disabled
                            >
                              Next Stop
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* SCREEN NAVIGATING OVERLAY DIALOG */}
            {currentScreen === "NAVIGATING" && (
              <motion.div
                key="navigating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-0 top-0 bg-black/80 z-50 flex items-center justify-center p-6"
              >
                <div className="bg-white rounded-3xl w-full p-6 text-center space-y-6 max-w-sm shadow-2xl border border-white/10">
                  <div className="relative mx-auto w-16 h-16 bg-[#0296CC]/10 rounded-full flex items-center justify-center">
                    <Navigation size={28} className="text-[#0296CC] animate-bounce" />
                    <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#0296CC] animate-spin" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">GPS NAVIGATION SIMULATION</p>
                    <h3 className="text-lg font-display font-bold text-[#0A1126]">{selectedOutlet?.name}</h3>
                    <p className="text-xs text-[#0296CC] font-semibold bg-[#0296CC]/5 px-2 py-1 rounded-full inline-block">
                      ETA 4 Minutes • 1.2 km away
                    </p>
                  </div>

                  {/* Faux map tracking marker line */}
                  <div className="w-full bg-[#F5F7FA] rounded-2xl p-4 flex flex-col gap-2 border border-[#E6EAF0] text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0296CC]" />
                      <span className="text-xs font-mono font-medium text-gray-500">Rep Location Verified</span>
                    </div>
                    <div className="h-6 w-0.5 border-l-2 border-dotted border-[#0296CC] ml-1" />
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-emerald-600">Geofence Checked & Confirmed</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] font-sans italic">
                    Entering storefront geofence. Automatically launching outlet context...
                  </p>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: OUTLET CONTEXT */}
            {currentScreen === "OUTLET_CONTEXT" && (
              <motion.div
                key="outlet_context"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col h-full bg-[#F5F7FA] overflow-hidden relative"
              >
                {/* Header - Fixed Top Bar */}
                <div className="flex-none bg-white border-b border-[#E6EAF0] p-4 flex items-center gap-3 z-40 shadow-sm">
                  <button
                    id="back-to-beat-btn"
                    onClick={() => setCurrentScreen("TODAYS_BEAT")}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-all text-[#0A1126]"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-sm font-display font-extrabold text-[#0A1126]">
                    {selectedOutlet?.name || "Pashan Medico"}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28">
                  {/* Scrolling subtext metadata */}
                  <div className="pb-1">
                    <p className="text-[11px] text-[#6B7280] font-mono flex items-center gap-1.5">
                      <span>{selectedOutlet?.type || "Chemist"} • Pune West</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">Visit Started • 10:42 AM</span>
                    </p>
                  </div>
                  
                  {/* PRIMARY CONTEXT CARD */}
                  <div className="bg-[#0296CC] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute right-[-10%] top-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] tracking-wider uppercase font-mono text-white/80 font-bold flex items-center gap-1">
                        <Sparkles size={11} className="fill-current" /> {"TODAY'S OPPORTUNITY"}
                      </p>
                      <button
                        id="info-sheet-trigger-btn"
                        onClick={() => setInfoBottomSheet(true)}
                        className="bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-all"
                        aria-label="Info regarding why recommended"
                      >
                        <Info size={16} />
                      </button>
                    </div>

                    <h2 className="text-xl font-display font-extrabold mt-3 mb-1">
                      {selectedOutlet?.context || "Hydration demand expected"}
                    </h2>
                    
                    <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-[10px] text-white/70 block font-mono">ESTIMATED EXTRAS</span>
                        <span className="text-xl font-display font-black">
                          {formatCurrency(selectedOutlet?.opportunity || 8500)}
                        </span>
                      </div>
                      <div className="bg-white/95 text-[#0296CC] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase shadow-sm">
                        Confidence High
                      </div>
                    </div>
                  </div>

                  {/* RETAILER NOTES CARD */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E6EAF0] space-y-3 shadow-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <h4 className="text-xs font-display font-bold text-[#0A1126] uppercase tracking-wider">Retailer Notes</h4>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                    <ul className="space-y-2 text-xs text-[#6B7280] font-sans">
                      <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Prefers smaller starter orders but open to repeat requests.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Highly concerned about slow inventory & dead stock.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Responds exceptionally well to margin boost / scheme-led pitches.</span>
                      </li>
                    </ul>

                    <button
                      id="view-prev-visits-btn"
                      onClick={() => setPreviousVisitsModal(true)}
                      className="text-xs text-[#0296CC] font-bold font-sans flex items-center gap-1 pt-1.5 hover:underline"
                    >
                      View Previous Visits History <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* DISCUSSION SUPPORT */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E6EAF0] space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#0A1126]">
                      <TrendingUp size={14} className="text-[#0296CC]" />
                      <h4 className="text-xs font-display font-bold uppercase tracking-wider text-left">Need help opening the discussion?</h4>
                    </div>
                    <button
                      id="view-talking-points-btn"
                      onClick={() => setTalkingPointsBottomSheet(true)}
                      className="text-xs text-[#0296CC] hover:text-[#0296CC]/90 font-bold font-sans flex items-center gap-1 hover:underline"
                    >
                      View Actionable Talking Points <ChevronRight size={14} />
                    </button>
                  </div>

                </div>

                {/* STICKY FOOTER ACTION BUTTON */}
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#E6EAF0] p-4 pt-3.5 pb-6 sm:pb-4 z-20">
                  <button
                    id="start-order-booking-btn"
                    onClick={() => {
                      clearCart(); // Clean cart state start
                      setCurrentScreen("ORDER_BOOKING");
                    }}
                    className="w-full bg-[#0296CC] text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-center uppercase active:bg-[#0296CC]/90 active:scale-[0.99] transition-all shadow-md shadow-[#0296CC]/15"
                  >
                    Start Order Booking
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: START ORDER BOOKING */}
            {currentScreen === "ORDER_BOOKING" && (
              <motion.div
                key="order_booking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col h-full bg-[#F5F7FA] overflow-hidden relative"
              >
                {/* STICKY HEADER */}
                <div className="bg-white border-b border-[#E6EAF0] p-3.5 z-10 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        id="back-to-context-btn"
                        onClick={() => setCurrentScreen("OUTLET_CONTEXT")}
                        className="p-1 hover:bg-gray-100 rounded-full transition-all text-[#0A1126]"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <h3 className="text-sm font-display font-extrabold text-[#0A1126]">
                        {selectedOutlet?.name || "Pashan Medico"}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#0296CC]/10 text-[#0296CC] px-2.5 py-0.5 rounded-full">
                      Cart Value: {formatCurrency(cartTotals.subtotal)}
                    </span>
                  </div>

                  {/* Real-time Search input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      id="search-sku-input"
                      type="text"
                      placeholder="Search SKU..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-[#E6EAF0] bg-[#F5F7FA] rounded-xl text-xs text-[#0A1126] focus:outline-none focus:ring-2 focus:ring-[#0296CC]/20 focus:border-[#0296CC] transition-all font-sans"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Horizontal Category Chips */}
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 -mx-1 px-1">
                    {["Hydration", "Beverages", "Snacks", "Personal Care", "Household"].map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          id={`cat-chip-${cat.toLowerCase().replace(" ", "-")}`}
                          onClick={() => setActiveCategory(cat)}
                          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans tracking-tight transition-all active:scale-95 ${
                            isActive
                              ? "bg-[#0296CC] text-white shadow-sm"
                              : "bg-gray-100 hover:bg-gray-200 text-[#6B7280]"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PRODUCT SCOPE SECTION (Scrollable core catalog) */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-4 pb-32">
                  
                  {/* CONTEXTUAL SECTION (Only visible on Hydration Tab) */}
                  {activeCategory === "Hydration" && (
                    <div id="recommended-category-block" className="space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#0296CC]" />
                        <h4 className="text-xs font-display font-extrabold text-[#0296CC] uppercase tracking-wider">
                          Recommended For This Outlet
                        </h4>
                      </div>

                      {/* Render recommended products */}
                      <div className="grid grid-cols-1 gap-2.5">
                        {recommendedHydration
                          .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((p) => {
                            const cartItem = cart.find((i) => i.product.id === p.id);
                            const itemQty = cartItem?.quantity || 0;

                            return (
                              <div
                                key={p.id}
                                id={`rec-prod-card-${p.id}`}
                                className="bg-gradient-to-r from-[#0296CC]/5 to-[#0296CC]/[0.01] border-2 border-dashed border-[#0296CC]/30 rounded-2xl p-3 flex flex-col justify-between gap-2.5 relative hover:border-[#0296CC] transition-all"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div className="space-y-0.5 max-w-[80%]">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="bg-[#0296CC] text-white text-[8px] font-bold font-mono px-1.5 py-0.5 rounded uppercase">
                                        {p.badge}
                                      </span>
                                    </div>
                                    <h4 className="text-xs font-sans font-bold text-[#0A1126] mt-1">{p.name}</h4>
                                    <p className="text-[10px] text-[#6B7280] leading-snug font-mono text-emerald-600 font-medium">
                                      • Why: {p.reason}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-display font-black text-[#0296CC] block">
                                      {formatCurrency(p.price)}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-gray-100/60 mt-1">
                                  <span className="text-[9px] text-[#6B7280] font-sans">Immediate replenishment recommended</span>
                                  
                                  {/* Plus/Minus triggers */}
                                  {itemQty > 0 ? (
                                    <div className="flex items-center gap-1.5 bg-white border border-[#E6EAF0] p-1 rounded-lg">
                                      <button
                                        onClick={() => updateQty(p.id, -1)}
                                        className="p-1 hover:bg-gray-100 rounded text-red-500 font-bold transition-all transition-transform active:scale-90"
                                      >
                                        <Minus size={12} />
                                      </button>
                                      <span className="text-xs font-mono font-bold text-[#0A1126] min-w-4 text-center">
                                        {itemQty}
                                      </span>
                                      <button
                                        onClick={() => addToCart(p, 1)}
                                        className="p-1 hover:bg-gray-100 rounded text-[#0296CC] font-bold transition-all transition-transform active:scale-90"
                                      >
                                        <Plus size={12} />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      id={`add-rec-btn-${p.id}`}
                                      onClick={() => addToCart(p, 1)}
                                      className="bg-white hover:bg-gray-50 border border-[#0296CC]/40 text-[#0296CC] text-[11px] font-bold py-1 px-3.5 rounded-lg active:scale-95 transition-all shadow-xs flex items-center gap-1"
                                    >
                                      <Plus size={10} /> Add to Cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* STANDARD CATALOG LIST */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-[2px] bg-gray-200 flex-1" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Standard Catalog ({activeCategory})
                      </span>
                      <div className="h-[2px] bg-gray-200 flex-1" />
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-6 bg-white rounded-xl border border-dashed border-gray-200">
                        <AlertTriangle className="mx-auto text-gray-400 mb-2" size={20} />
                        <p className="text-xs text-gray-500">No results match your search query.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {filteredProducts.map((p) => {
                          const cartItem = cart.find((i) => i.product.id === p.id);
                          const itemQty = cartItem?.quantity || 0;

                          return (
                            <div
                              key={p.id}
                              id={`std-prod-card-${p.id}`}
                              className="bg-white border border-[#E6EAF0] p-3 rounded-xl flex items-center justify-between gap-2 shadow-xs hover:border-gray-300 transition-all"
                            >
                              <div className="space-y-0.5">
                                <h4 className="text-xs font-sans font-bold text-[#0A1126]">{p.name}</h4>
                                <span className="text-[11px] font-display font-bold text-gray-500 block">
                                  {formatCurrency(p.price)}
                                </span>
                              </div>

                              {/* Plus/Minus triggers */}
                              {itemQty > 0 ? (
                                <div className="flex items-center gap-1.5 bg-[#F5F7FA] border border-[#E6EAF0] p-1 rounded-lg">
                                  <button
                                    onClick={() => updateQty(p.id, -1)}
                                    className="p-1 hover:bg-gray-200 rounded text-red-500 font-bold transition-all active:scale-90"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-[#0A1126] min-w-4 text-center">
                                    {itemQty}
                                  </span>
                                  <button
                                    onClick={() => addToCart(p, 1)}
                                    className="p-1 hover:bg-gray-200 rounded text-[#0296CC] font-bold transition-all active:scale-90"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  id={`add-std-btn-${p.id}`}
                                  onClick={() => addToCart(p, 1)}
                                  className="bg-gray-50 hover:bg-gray-100 border border-[#E6EAF0] text-[#0a1126] text-[11px] font-bold py-1.5 px-3 rounded-lg active:scale-95 transition-all"
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* STICKY CART FOOTER STICK */}
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#E6EAF0] p-3 pb-6 sm:pb-3 z-25 shadow-lg flex flex-col gap-1.5">
                  
                  {/* Cart Status link */}
                  {cartTotals.totalItemsCount > 0 ? (
                    <button
                      id="view-cart-sticky-footer"
                      onClick={() => setCurrentScreen("CART_REVIEW")}
                      className="bg-[#0296CC] text-white py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-between shadow-md active:bg-[#0296CC]/95 active:scale-[0.99] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={15} />
                        <span>{cartTotals.distinctSkus} SKUs Added</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">{formatCurrency(cartTotals.subtotal)}</span>
                        <span>• VIEW CART →</span>
                      </div>
                    </button>
                  ) : (
                    <div className="bg-gray-50 border border-[#E6EAF0] text-center py-2.5 rounded-xl text-xs text-[#6B7280] font-sans font-medium">
                      {"Select items below to build the customer's draft order."}
                    </div>
                  )}

                  {/* Skip Order flow trigger */}
                  <div className="text-center">
                    <button
                      id="skip-order-booking-btn"
                      onClick={() => setSkipReasonBottomSheet(true)}
                      className="text-[11px] text-[#6B7280] hover:text-[#0A1126] font-bold font-sans tracking-wide py-1 border-b border-gray-300 border-dashed"
                    >
                      Skip Order & Return to Beat
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: CART / ORDER REVIEW */}
            {currentScreen === "CART_REVIEW" && (
              <motion.div
                key="cart_review"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col h-full bg-[#F5F7FA] overflow-hidden relative"
              >
                {/* Header */}
                <div className="bg-white border-b border-[#E6EAF0] p-4 flex items-center gap-3 z-10 shadow-xs">
                  <button
                    id="back-to-booking-btn"
                    onClick={() => setCurrentScreen("ORDER_BOOKING")}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-all text-[#0A1126]"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h3 className="text-sm font-display font-extrabold text-[#0A1126]">Order Summary</h3>
                    <p className="text-[11px] text-[#6B7280] font-mono">Outlet: Pashan Medico</p>
                  </div>
                </div>

                {/* SCROLLABLE ITEMS */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-44">
                  
                  {/* CONTEXT CHECK STATE WARNING */}
                  {!isHydrationAdded ? (
                    <div id="no-hydration-warning-card" className="bg-amber-50 border-2 border-dashed border-amber-400 rounded-2xl p-4 space-y-3 shadow-xs">
                      <div className="flex gap-2.5">
                        <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <h4 className="text-xs font-display font-extrabold text-amber-950 uppercase tracking-wider">Before You Submit</h4>
                          <p className="text-xs text-amber-900 mt-0.5 leading-snug">
                            {"Hydration products haven't been added yet. Nearby chemists are actively stocking ORS this week in peak volumes."}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1 border-t border-amber-200/50">
                        <button
                          id="add-rec-ors-from-warning-btn"
                          onClick={() => {
                            // Find and add ORS
                            const orsprd = PRODUCTS.find((p) => p.id === "hyd_rec1");
                            if (orsprd) addToCart(orsprd, 2);
                          }}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-[11px] py-1.5 px-3 rounded-lg text-center transition-all shadow-xs active:scale-95"
                        >
                          + Add Recommended ORS
                        </button>
                        <button
                          id="continue-without-hydration-action"
                          onClick={() => {
                            // Proceed option, stays empty
                          }}
                          className="flex-1 bg-transparent text-amber-800 border border-amber-300 font-sans font-medium text-[11px] py-1.5 px-2 rounded-lg text-center active:bg-amber-100/30"
                        >
                          Continue Without Focus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      id="scheme-optimization-card" 
                      className={`rounded-2xl p-3.5 space-y-1.5 flex flex-col justify-between shadow-xs transition-all duration-300 ${
                        schemeOptimized 
                          ? "bg-emerald-100 border-2 border-emerald-500" 
                          : "bg-emerald-50 border border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <BadgePercent size={16} className={schemeOptimized ? "text-emerald-600 animate-bounce" : ""} />
                        <h4 className="text-xs font-display font-extrabold uppercase tracking-wider">
                          {schemeOptimized ? "Scheme Applied" : "Scheme Optimization"}
                        </h4>
                      </div>
                      {schemeOptimized ? (
                        <p className="text-xs text-emerald-900 font-semibold leading-relaxed text-left">
                          {"✓ Scheme Applied: 1 Free Sachet Unlocked! Retailer margin increased to 18%."}
                        </p>
                      ) : (
                        <>
                          <p className="text-xs text-emerald-700 text-left">
                            Add 3 more Electral Orange sachets to unlock the <b>Buy 10 Get 1 Sachet Free</b> incentive!
                          </p>
                          <button
                            id="add-scheme-items-btn"
                            onClick={() => {
                              setSchemeOptimized(true);
                              const elect = PRODUCTS.find((p) => p.id === "hyd_rec2");
                              if (elect) {
                                addToCart(elect, 3);
                              }
                            }}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-[11px] py-1.5 px-4 rounded-xl text-center self-start mt-1 active:scale-95 transition-all shadow-xs"
                          >
                            + Optimize Items Now
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* ORDER BASKET ITEMS LIST */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Selected Basket</span>
                    
                    {cart.length === 0 ? (
                      <div className="text-center py-8 bg-white border border-gray-200 rounded-2xl">
                        <p className="text-xs text-[#6B7280]">Your cart is currently empty.</p>
                        <button
                          onClick={() => setCurrentScreen("ORDER_BOOKING")}
                          className="text-xs text-[#0296CC] font-bold mt-2 hover:underline"
                        >
                          Return to Catalog
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {cart.map((item) => {
                          const hasDiscountBadge = item.product.recommended && item.product.badge;
                          return (
                            <div
                              key={item.product.id}
                              id={`cart-item-${item.product.id}`}
                              className="bg-white border border-[#E6EAF0] rounded-xl p-3 flex flex-col gap-2 shadow-xs"
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-sans font-bold text-[#0A1126]">{item.product.name}</h4>
                                  <span className="text-[10px] text-[#6B7280] font-mono">{item.product.category}</span>
                                  {hasDiscountBadge && (
                                    <span className="bg-[#0296CC]/10 text-[#0296CC] text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase inline-block ml-2">
                                      {item.product.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-display font-extrabold text-[#0A1126]">
                                  {formatCurrency(item.product.price * item.quantity)}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pt-1.5 border-t border-gray-50/85">
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[11px] text-red-500 hover:text-red-600 font-bold font-sans flex items-center gap-1.5"
                                  title="Delete item from basket"
                                >
                                  <Trash2 size={13} /> Remove
                                </button>

                                <div className="flex items-center gap-1.5 bg-[#F5F7FA] border border-[#E6EAF0] p-1 rounded-lg">
                                  <button
                                    onClick={() => updateQty(item.product.id, -1)}
                                    className="p-1 hover:bg-gray-200 rounded text-red-500 font-bold active:scale-90"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-[#0A1126] min-w-4 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQty(item.product.id, 1)}
                                    className="p-1 hover:bg-gray-200 rounded text-[#0296CC] font-bold active:scale-90"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM STICKY CALCULATIONS BAR */}
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#E6EAF0] p-4 pt-3.5 pb-6 sm:pb-4 z-20 shadow-lg space-y-3.5">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[#6B7280]">
                      <span>Draft Items Subtotal</span>
                      <span className="font-mono">{formatCurrency(cartTotals.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span>Scheme Incentive Discount</span>
                      <span className="font-mono">- {formatCurrency(cartTotals.schemeSavings)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#0A1126] font-display font-black text-sm pt-1.5 border-t border-gray-100">
                      <span>Final Order Value</span>
                      <span className="font-mono text-base">{formatCurrency(cartTotals.finalValue)}</span>
                    </div>
                  </div>

                  <button
                    id="submit-order-button"
                    onClick={handleSubmitOrder}
                    disabled={cart.length === 0}
                    className="w-full bg-[#0296CC] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm uppercase py-3.5 px-4 rounded-xl shadow-md active:bg-[#0296CC]/95 active:scale-[0.99] transition-all tracking-wider"
                  >
                    Submit Order Invoice
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: VISIT COMPLETE */}
            {currentScreen === "VISIT_COMPLETE" && (
              <motion.div
                key="visit_complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col h-full bg-white overflow-hidden relative"
              >
                {/* Scrollable Center Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                  {/* Visual margin padding top */}
                  <div />

                  {/* Main success indicators block */}
                  <div className="text-center space-y-5">
                    <div className="relative mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-100">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                      <motion.span
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.15 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 rounded-full bg-emerald-300 animate-pulse"
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] text-emerald-600 font-mono tracking-widest uppercase font-black">VISIT COMPLETED SUCCESSFULLY</p>
                      <h2 className="text-2xl font-display font-extrabold text-[#0A1126]">Order Submitted</h2>
                      <p className="text-xs text-gray-500 font-sans">
                        Invoice details queued to Pune distribution node.
                      </p>
                    </div>

                    {/* Summary card metrics */}
                    <div className="bg-[#F5F7FA] border border-[#E6EAF0] rounded-2xl p-4 max-w-sm mx-auto text-left space-y-2.5">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Outlet Visited</span>
                        <b className="text-[#0A1126] font-bold">Pashan Medico</b>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Total Booked Value</span>
                        <b className="text-emerald-600 font-mono font-bold text-sm">
                          {formatCurrency(cartTotals.finalValue)}
                        </b>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        {isHydrationAdded ? (
                          <div className="flex gap-2 text-emerald-700 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100 items-start text-[11px]">
                            <Check className="flex-shrink-0 mt-0.5 text-emerald-600" size={14} />
                            <span>{"Today's active category focus (Hydration) was successfully included."}</span>
                          </div>
                        ) : (
                          <div className="space-y-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-100 text-[11px] text-amber-800">
                            <p className="font-semibold block text-[10px] text-amber-900 uppercase">Focus Excluded:</p>
                            <p>
                              Hydration products were excluded. Reason tracked: <b className="font-bold underline">{selectedNoHydrationReason || "Retailer has existing stock"}</b>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Coming soon non-interactive voice notes block */}
                  <div className="space-y-4">
                    <div className="bg-[#0A1126] text-white rounded-xl p-3 text-center border border-white/5 space-y-1 select-none pointer-events-none opacity-85">
                      <div className="flex items-center justify-center gap-1.5 text-sky-400 text-xs">
                        <Volume2 size={13} />
                        <span className="font-semibold">Voice Notes (Coming Soon)</span>
                      </div>
                      <p className="text-[10px] text-gray-400">No active microphone permissions required.</p>
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="bg-white border-t border-[#E6EAF0] p-4 z-20">
                  <button
                    id="return-to-beat-btn"
                    onClick={() => {
                      setCurrentScreen("UPDATED_BEAT");
                    }}
                    className="w-full bg-[#0296CC] text-white py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-black leading-none hover:bg-[#0296CC]/95 active:scale-95 transition-all shadow-md text-center"
                  >
                    {"Return to TODAY's Beat"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 6: UPDATED BEAT STATE */}
            {currentScreen === "UPDATED_BEAT" && (
              <motion.div
                key="updated_beat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                {/* Header Section - Fixed Top Bar */}
                <div id="updated-beat-header" className="flex-none bg-white border-b border-[#E6EAF0] p-4 z-40 flex justify-between items-center shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://cdn.brandfetch.io/id315U4IA2/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1773701661842"
                    alt="FieldAssist Logo"
                    className="h-6 w-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center gap-2 bg-[#F5F7FA] px-2 py-1 rounded-full border border-[#E6EAF0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-[#0296CC] font-bold uppercase">SHIFT COMPLYING</span>
                  </div>
                </div>

                {/* Main page content scrollable container */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-20">
                  
                  {/* Non-sticky header element and KPI block indicators */}
                  <div className="space-y-3 pb-1">
                    <div>
                      <h2 className="text-xl font-display font-extrabold text-[#0A1126] tracking-tight">{"Today's Beat"}</h2>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">22 Jun • Pune West Lane-A</p>
                    </div>

                    {/* Updated metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F5F7FA] border border-[#E6EAF0] rounded-xl p-2.5">
                        <p className="text-[10px] text-[#6B7280] font-mono uppercase tracking-wider font-semibold">Active Stops</p>
                        <p className="text-base font-display font-medium text-[#0A1126]">
                          <span className="font-bold">17</span> Remaining <span className="text-gray-400 text-xs">/ 1 Completed</span>
                        </p>
                      </div>
                      <div className="bg-[#0296CC]/5 border border-[#0296CC]/15 rounded-xl p-2.5">
                        <p className="text-[10px] text-[#0296CC] font-mono uppercase tracking-wider font-semibold">Booked Today</p>
                        <p className="text-base font-display font-extrabold text-[#0296CC]">
                          {formatCurrency(bookedAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* VISITED OUTLET CARD COLLAPSED (Pashan Medico) */}
                  <div
                    key="pashan_visited"
                    id="visited-outlet-pashan"
                    className="bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs transition-all relative overflow-hidden"
                  >
                    {/* Visual 50% less vertical volume constraint block */}
                    <div className="flex items-center gap-3 w-[65%]">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <Check size={18} className="stroke-[3px]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-display font-bold text-gray-500 truncate">Visited • Pashan Medico</h4>
                        <p className="text-[10px] text-gray-400 font-mono">
                          {bookedAmount > 0 ? `Order Booked: ${formatCurrency(bookedAmount)}` : `Skipped (${selectedSkipReason || "Already Stocked"})`}
                        </p>
                      </div>
                    </div>

                    <button
                      id="view-summary-sheet-btn"
                      onClick={() => setViewSummaryBottomSheet(true)}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 text-[10px] font-sans font-bold px-3 py-1.5 rounded-lg transition-all"
                    >
                      View Summary
                    </button>
                  </div>

                  {/* REMAINING OUTLETS */}
                  {outlets.slice(1).map((outlet) => {
                    // Next stop (Kothrud Super Store) gets visually upgraded
                    const isNextUp = outlet.id === 2;

                    return (
                      <div
                        key={outlet.id}
                        id={`outlet-card-updated-${outlet.id}`}
                        className={`bg-white rounded-2xl border-2 transition-all shadow-sm overflow-hidden p-3.5 flex flex-col gap-3 ${
                          isNextUp
                            ? "border-[#0296CC] bg-[#0296CC]/[0.02]"
                            : "border-[#E6EAF0]"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={outlet.image}
                              alt={outlet.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1 left-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                              {outlet.sequence}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[9px] font-mono text-[#6B7280] font-bold uppercase">
                                {outlet.type}
                              </span>
                              {isNextUp && (
                                <span className="px-1.5 py-0.5 rounded bg-[#0296CC]/10 text-[9px] font-mono text-[#0296CC] font-extrabold uppercase animate-pulse">
                                  NEXT TARGET
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-display font-bold text-[#0A1126] mt-1 truncate">
                              {outlet.name}
                            </h3>
                            <p className="text-[11px] text-[#6B7280] flex items-center gap-1 mt-0.5 font-sans italic">
                              <Sparkles size={10} className="text-[#0296CC]" />
                              {outlet.context}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
                          <div>
                            <span className="text-[9px] text-[#6B7280] block font-mono uppercase font-semibold">Value Opportunity</span>
                            <span className="text-sm font-display font-extrabold text-[#0A1126]">
                              {formatCurrency(outlet.opportunity)}
                            </span>
                          </div>

                          {isNextUp ? (
                            <button
                              onClick={() => {
                                // Simulate reset/next visit sequence to demonstrate the platform is generic
                                alert("Loop complete. Thank you for evaluating the FieldAssist Beat & Order MVP!");
                              }}
                              className="bg-[#0296CC] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md font-sans hover:bg-[#0296CC]/90 transition-all flex items-center gap-1"
                            >
                              <Navigation size={12} className="fill-current" /> Start Visit
                            </button>
                          ) : (
                            <button
                              className="bg-gray-100 text-[#6B7280] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all font-sans"
                              disabled
                            >
                              Next Stop
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* =========================================================================
            SIMULATED DRAWERS / BOTHOM SHEETS 
            Strictly relative to the simulated Phone Container to stay perfectly within limits
            ========================================================================= */}

        {/* 1. INFO MODAL (Why was outlet recommended?) */}
        <AnimatePresence>
          {infoBottomSheet && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-center justify-center p-4">
              {/* Dismiss backdrop trigger */}
              <div
                className="absolute inset-0"
                onClick={() => setInfoBottomSheet(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                id="info-bottom-sheet"
                className="bg-white rounded-3xl w-full p-5 max-w-sm relative z-10 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold uppercase text-[#0A1126] tracking-wider">
                    Why Recommended?
                  </h3>
                  <button
                    onClick={() => setInfoBottomSheet(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close bottom sheet"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-[#6B7280]">
                  <p className="leading-relaxed">
                    This stop was ranked #1 on your beat due to a major <b>demand anomaly event</b> matched by the forecast engine:
                  </p>

                  <div className="bg-[#0296CC]/5 p-3 rounded-xl border border-[#0296CC]/10 space-y-2 text-[#0A1126]">
                    <div className="flex items-start gap-2">
                      <span className="text-[#0296CC] font-bold text-sm">•</span>
                      <p><b>Thermal Curve:</b> Temperature across Pune is climbing 3.1°C over seasonal averages this week.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0296CC] font-bold text-sm">•</span>
                      <p><b>Competitor Run Rate:</b> 4 nearby chemist outlets completed restock invoices on ORS sachets within the past 48 hours.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0296CC] font-bold text-sm">•</span>
                      <p><b>Last Ordered Context:</b> {"Pashan Medico hasn't updated hydration stock flags in 18 days, suggesting imminent localized stock-out."}</p>
                    </div>
                  </div>

                  <div className="flex justify-between font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-[10px]">
                    <span className="text-[#6B7280]">RECOMMENDATION CONFIDENCE</span>
                    <strong className="text-emerald-600">HIGH (94%)</strong>
                  </div>
                </div>

                <button
                  id="info-sheet-dismiss-btn"
                  onClick={() => setInfoBottomSheet(false)}
                  className="w-full bg-[#0296CC] hover:bg-[#0296CC]/90 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 2. DISCUSSION / TALKING POINTS MODAL */}
        <AnimatePresence>
          {talkingPointsBottomSheet && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-center justify-center p-4">
              <div
                className="absolute inset-0"
                onClick={() => setTalkingPointsBottomSheet(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                id="talking-points-sheet"
                className="bg-white rounded-3xl w-full p-5 max-w-sm relative z-10 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold uppercase text-[#0A1126] tracking-wider">
                    Retailer Pitch Talking Points
                  </h3>
                  <button
                    onClick={() => setTalkingPointsBottomSheet(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close Talking Points"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Simulated conversations blocks with light grey/blue tint */}
                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#0296CC] font-mono block uppercase font-bold">Suggested opener:</span>
                    <p className="bg-[#F5F7FA] border border-[#E6EAF0] p-3 rounded-xl text-[#0A1126] italic">
                      {"\"Uncle, temperature are spiking this week and nearby chemists are selling out of hydration products instantly. Let's make sure you have ORS stock prepared today.\""}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#0296CC] font-mono block uppercase font-bold">How to resolve dead stock worries:</span>
                    <p className="bg-[#F5F7FA] border border-[#E6EAF0] p-3 rounded-xl text-[#0A1126] italic">
                      {"\"I understand you prefer minimal inventory. Let's start with a smaller, low-risk box. If it sells out in 3 days, I'll expedite a repeat delivery immediately.\""}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#0296CC] font-mono block uppercase font-bold">Special incentive hooks:</span>
                    <p className="bg-[#F5F7FA] border border-[#E6EAF0] p-3 rounded-xl text-[#0A1126] italic">
                      {"\"We have a high-margin scheme active today: Buy 10 sachets of Electral, get 1 completely free. That increases your margin on sales to 18%.\""}
                    </p>
                  </div>
                </div>

                <button
                  id="talking-points-dismiss-btn"
                  onClick={() => setTalkingPointsBottomSheet(false)}
                  className="w-full bg-[#0296CC] hover:bg-[#0296CC]/90 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3. VIEW HISTORY TIMELINE MODAL */}
        <AnimatePresence>
          {previousVisitsModal && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-center justify-center p-4">
              <div
                className="absolute inset-0"
                onClick={() => setPreviousVisitsModal(false)}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                id="previous-visits-timeline"
                className="bg-white rounded-3xl w-full p-5 max-w-sm relative z-10 shadow-2xl text-left space-y-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold uppercase text-[#0A1126] tracking-wider">
                    Past Invoices & Visits
                  </h3>
                  <button
                    onClick={() => setPreviousVisitsModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close visits timeline modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Timeline flow */}
                <div className="space-y-3 pt-1">
                  
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-600 text-[10px] font-bold">
                        1
                      </div>
                      <div className="w-0.5 h-10 bg-gray-200" />
                    </div>
                    <div>
                      <h4 className="text-xs font-sans font-bold text-[#0A1126]">22 May Visit</h4>
                      <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Partially Accepted • ₹4,220 Booked</p>
                      <p className="text-[10px] text-gray-400">Stocked out of Glucon-D; accepted small mineral packs.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-red-100 border border-red-400 flex items-center justify-center text-red-600 text-[10px] font-bold">
                        2
                      </div>
                      <div className="w-0.5 h-10 bg-gray-200" />
                    </div>
                    <div>
                      <h4 className="text-xs font-sans font-bold text-[#0A1126]">11 April Visit</h4>
                      <p className="text-[11px] text-red-500 font-medium mt-0.5">Rejected • Stock Intact</p>
                      <p className="text-[10px] text-gray-400">Retailer complained about bulk dead stock carryovers.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-400 flex items-center justify-center text-gray-600 text-[10px] font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-sans font-bold text-[#0A1126]">03 March Visit</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">Cancelled • Retailer Busy</p>
                      <p className="text-[10px] text-gray-400">Rep logged revisit priority state token.</p>
                    </div>
                  </div>

                </div>

                <button
                  id="visits-modal-dismiss-btn"
                  onClick={() => setPreviousVisitsModal(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl text-xs font-bold font-sans"
                >
                  Close History
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 4. SKIP ORDER REASON BOTTOM DRAWER */}
        <AnimatePresence>
          {skipReasonBottomSheet && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-end">
              <div
                className="absolute inset-0"
                onClick={() => setSkipReasonBottomSheet(false)}
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 24 }}
                id="skip-reason-sheet"
                className="bg-white rounded-t-3xl w-full p-5 max-h-[80%] overflow-y-auto relative z-10 shadow-3xl text-left space-y-4 text-[#0a1126]"
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold uppercase text-[#0A1126] tracking-wider">
                    Skip Order Verification
                  </h3>
                  <button
                    onClick={() => setSkipReasonBottomSheet(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close skip reason selection"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-xs text-[#6B7280] leading-snug">
                  Please identify the mandatory operational reason why Pashan Medico is skipping order booking today:
                </p>

                {/* Option checkboxes */}
                <div className="space-y-2">
                  {[
                    "Already stocked / Intact inventory",
                    "Retailer not interested in active categories",
                    "Pricing dispute / Pending scheme clearance",
                    "Owner unavailable for invoice authorization",
                    "Outlet temporarily closed"
                  ].map((reason) => {
                    const isSelected = selectedSkipReason === reason;
                    return (
                      <button
                        key={reason}
                        onClick={() => setSelectedSkipReason(reason)}
                        className={`w-full p-3 rounded-xl border-2 text-xs font-sans font-semibold text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-[#0296CC] bg-[#0296CC]/5 text-[#0296CC]"
                            : "border-[#E6EAF0] text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span>{reason}</span>
                        {isSelected && <Check size={14} className="stroke-[3px]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => setSkipReasonBottomSheet(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 py-3 rounded-xl text-xs font-bold font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-skip-order-btn"
                    onClick={handleSkipOrderConfirm}
                    disabled={!selectedSkipReason}
                    className="flex-1 bg-red-500 disabled:bg-gray-100 disabled:text-gray-400 text-white py-3 rounded-xl text-xs font-bold font-sans hover:bg-red-600 transition-all text-center"
                  >
                    Save & Skip Stop
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 5. QUICK SURVEY BOTTOM SHEET (NO-HYDRATION WHY?) */}
        <AnimatePresence>
          {quickQuestionBottomSheet && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-end">
              <div
                className="absolute inset-0"
                onClick={() => setQuickQuestionBottomSheet(false)}
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                id="quick-question-sheet"
                className="bg-white rounded-t-3xl w-full p-5 max-h-[85%] overflow-y-auto relative z-10 shadow-3xl text-left space-y-4 text-[#0a1126]"
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold text-[#0A1126] uppercase">
                    Mandatory Compliance Check
                  </h3>
                  <button
                    onClick={() => setQuickQuestionBottomSheet(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close question sheet"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 leading-snug">
                  Hydration products are identified as key opportunity. Why was the focus active catalog excluded during this stop?
                </div>

                {/* Question option stack */}
                <div className="space-y-2">
                  {[
                    "Owner has old stock left",
                    "Disliked margins on ORS sachets",
                    "Expressed low customer demand locally",
                    "Prefers competing brand alternative",
                    "Postponed decision till next visit"
                  ].map((reason) => {
                    const isSelected = selectedNoHydrationReason === reason;
                    return (
                      <button
                        key={reason}
                        onClick={() => setSelectedNoHydrationReason(reason)}
                        className={`w-full p-3 rounded-xl border-2 text-xs font-sans font-semibold text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-[#0296CC] bg-[#0296CC]/5 text-[#0296CC]"
                            : "border-[#E6EAF0] text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span>{reason}</span>
                        {isSelected && <Check size={14} className="stroke-[3px]" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  id="confirm-question-sheet-btn"
                  onClick={() => transitionToComplete(true)}
                  disabled={!selectedNoHydrationReason}
                  className="w-full bg-[#0296CC] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-xs uppercase py-3 rounded-xl text-center shadow-sm"
                >
                  Submit & Log Reason
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 6. OUTLET COMPLETED VIEW SUMMARY DETAIL BOTTOM SHEET */}
        <AnimatePresence>
          {viewSummaryBottomSheet && (
            <div className="absolute inset-0 z-50 overflow-hidden bg-black/60 flex items-end">
              <div
                className="absolute inset-0"
                onClick={() => setViewSummaryBottomSheet(false)}
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                id="visit-summary-sheet"
                className="bg-white rounded-t-3xl w-full p-5 max-h-[80%] overflow-y-auto relative z-10 shadow-3xl text-left space-y-4"
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-display font-extrabold text-[#0A1126] uppercase">
                    Visit Summary: Pashan Medico
                  </h3>
                  <button
                    onClick={() => setViewSummaryBottomSheet(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Close summary sheet"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Visited parameters details */}
                <div className="space-y-3.5 text-xs text-[#6B7280]">
                  <div className="flex justify-between py-1.5 border-b border-gray-55/80">
                    <span>Visit Timestamp</span>
                    <span className="font-mono text-[#0A1126] font-semibold">Today, 10:42 AM Started</span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-gray-55/80">
                    <span>Invoice Value Booking</span>
                    <span className="font-mono text-[#0A1126] font-bold">
                      {bookedAmount > 0 ? formatCurrency(bookedAmount) : "N/A (Skipped)"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-gray-55/80">
                    <span>Compliance Focus (Hydration)</span>
                    {isHydrationAdded ? (
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase text-[9px]">
                        Included
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded uppercase text-[9px]">
                        Excluded
                      </span>
                    )}
                  </div>

                  {/* Render cart items if any */}
                  {cart.length > 0 ? (
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider block">Submitted Items Basket</span>
                      <div className="bg-gray-50 border border-[#E6EAF0] p-3 rounded-xl space-y-1.5 max-h-32 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex justify-between font-mono text-[11px] text-[#0A1126]">
                            <span>{item.product.name} (x{item.quantity})</span>
                            <span>{formatCurrency(item.product.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 space-y-1 text-amber-900">
                      <span className="font-extrabold uppercase text-[10px] tracking-wide block">Skip Log Action:</span>
                      <p>Stop skipped. Tracked reason reason: <b>{selectedSkipReason || "Already Stocked"}</b></p>
                    </div>
                  )}
                </div>

                <button
                  id="view-summary-dismiss-btn"
                  onClick={() => setViewSummaryBottomSheet(false)}
                  className="w-full bg-[#0296CC] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center"
                >
                  Close Summary
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>

    {/* Right Sidebar: Opportunity Focus & Live Logs */}
    <aside className="hidden lg:flex w-72 p-6 flex-col border-l border-[#E6EAF0] shrink-0 bg-white justify-between z-10 text-[#0A1126]">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">Opportunity Focus</p>
          <div className="bg-[#0296CC]/5 border border-[#0296CC]/15 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💧</span>
              <p className="text-sm font-extrabold text-[#0296CC] uppercase tracking-wide">Hydration Push</p>
            </div>
            <p className="text-xs text-[#0A1126] leading-relaxed">
              Temperatures in Pune West expected to rise to 42°C. Increase stocks of <strong>ORS Advanced</strong> and <strong>Electral</strong>.
            </p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">Live Log</p>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className={`w-2.5 h-2.5 rounded-full bg-green-500 mt-1 shrink-0 ${visitedCount > 0 ? "animate-pulse" : ""}`} />
              <div>
                <p className="text-xs font-bold text-[#0A1126]">Sync Complete</p>
                <p className="text-[10px] text-[#6B7280]">
                  {visitedCount > 0 ? "Outlet opportunities sync'd just now" : "Outlet opportunities updated 2m ago"}
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0296CC] mt-1 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#0A1126]">Location Verified</p>
                <p className="text-[10px] text-[#6B7280]">GPS lock: Pune West 12.0123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
         <div className="bg-[#0A1126] p-4 rounded-xl text-white">
           <p className="text-xs font-bold mb-1 italic">Support Hub</p>
           <p className="text-[10px] opacity-70 mb-3">Need help with a retailer?</p>
           <button 
             id="right-sidebar-help-btn"
             onClick={() => {
               if (currentScreen === "OUTLET_CONTEXT" || currentScreen === "ORDER_BOOKING" || currentScreen === "CART_REVIEW") {
                 setTalkingPointsBottomSheet(true);
               } else {
                 setInfoBottomSheet(true);
               }
             }}
             className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2 rounded-lg text-[10px] font-bold transition-all text-center"
           >
             View Talking Points
           </button>
         </div>
      </div>
    </aside>

  </div>
  );
}
