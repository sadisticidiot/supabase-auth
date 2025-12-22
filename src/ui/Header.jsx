import { useEffect, useRef, useState } from "react";
import BaseInput from "./BaseInput";
import Dropdown from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import { HomeIcon, BookOpenIcon, UserCircleIcon, ArrowTrendingUpIcon, Cog8ToothIcon, BellIcon } from '@heroicons/react/24/solid';
import clsx from "clsx";
import { motion } from "framer-motion";

export default function Header() {
  const [currentView, setCurrentView] = useState("home");
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdown) return;

    const handleOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [isDropdown]);

  // Center navigation items
  const navItems = [
    { name: "home", Icon: HomeIcon, label: "Home" },
    { name: "post", Icon: BookOpenIcon, label: "Posts" },
    { name: "data", Icon: ArrowTrendingUpIcon, label: "Data" },
    { name: "settings", Icon: Cog8ToothIcon, label: "Settings" },
  ];

  return (
    <header className="header-base overflow-visible flex px-4 py-1 gap-2">
      {/* LEFT: App name / search */}
      <div className="flex items-center gap-2 flex-1">
        <h1 className="font-bold text-2xl text-white">Test App</h1>
        <BaseInput placeholder="Search" className="h-10 px-4 rounded-full" />
      </div>

      {/* CENTER: Navigation icons */}
      <div className="flex flex-1 justify-center items-stretch size-full gap-2">
        {navItems.map(item => (
          <div key={item.name} className="flex-1 flex flex-col items-stretch">
            <button
              onClick={() => setCurrentView(item.name)}
              className={clsx(
                "relative flex-1 flex justify-center items-center rounded transition-all cursor-default",
                {"hover:bg-neutral-700 cursor-pointer": currentView !== item.name}
              )}
              aria-label={item.label}
            >
              <item.Icon
                className={clsx(
                  "w-6 h-6 transition-colors",
                  currentView === item.name ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-100"
                )}
                
              />
            </button>
            {currentView === item.name &&
                <AnimatePresence mode="wait"> 
                    <motion.p 
                        className="w-full border-1 border-neutral-100"
                        initial={{ opacity: 0, y: 2}}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease:"easeIn" }}
                    ></motion.p>
                </AnimatePresence>
            }
          </div>
        ))}
      </div>

      {/* RIGHT: Profile */}
      <div className="relative flex-1 flex justify-end items-center size-full gap-5">
        <button
            className="relative flex justify-center items-center transition"
            aria-label="User profile"
        >
          <BellIcon className="w-10 h-10 text-neutral-400 hover:text-neutral-200" />
        </button>

        <button
            ref={dropdownRef} 
            onClick={() => setIsDropdown(p => !p)}
            className="relative flex justify-center items-center transition"
            aria-label="User profile"
        >
          <UserCircleIcon className="w-10 h-10 text-neutral-400 hover:text-neutral-200" />
        </button>

        <AnimatePresence>
          {isDropdown && (
            <Dropdown
                isDropdown={isDropdown}
                setIsDropdown={setIsDropdown}
            />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
