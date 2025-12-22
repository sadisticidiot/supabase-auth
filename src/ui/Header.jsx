import { useEffect, useRef, useState } from "react";
import BaseInput from "./BaseInput";
import Dropdown from "./Dropdown";
import { AnimatePresence, motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  UserCircleIcon,
  ArrowTrendingUpIcon,
  Cog8ToothIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Navigation items
  const navItems = [
    { name: "home", path: "/dashboard", Icon: HomeIcon, label: "Home" },
    { name: "post", path: "/dashboard/posts", Icon: BookOpenIcon, label: "Posts" },
    { name: "data", path: "/dashboard/data", Icon: ArrowTrendingUpIcon, label: "Data" },
    { name: "settings", path: "/dashboard/settings", Icon: Cog8ToothIcon, label: "Settings" },
  ];

  // Determine active view (longest path wins)
  const currentView =
    navItems
      .slice()
      .sort((a, b) => b.path.length - a.path.length)
      .find((item) => location.pathname.startsWith(item.path))
      ?.name ?? "home";

  const handleNav = (item) => {
    if (currentView !== item.name) {
      navigate(item.path);
    }
  };

  return (
    <header className="header-base overflow-visible flex px-4 py-1 gap-2">
      {/* LEFT: App name / search */}
      <div className="flex items-center gap-2 flex-1">
        <h1 className="font-bold text-2xl text-white">Test App</h1>
        <BaseInput placeholder="Search" className="h-10 px-4 rounded-full" />
      </div>

      {/* CENTER: Navigation */}
      <div className="flex flex-1 justify-center items-stretch size-full gap-2">
        {navItems.map((item) => (
          <div key={item.name} className="flex-1 flex flex-col items-stretch">
            <button
              onClick={() => handleNav(item)}
              aria-label={item.label}
              className={clsx(
                "relative flex-1 flex justify-center items-center rounded transition-colors",
                currentView === item.name
                  ? "text-neutral-100"
                  : "text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100 cursor-pointer"
              )}
            >
              <item.Icon className="w-6 h-6" />
            </button>

            <AnimatePresence>
              {currentView === item.name && (
                <motion.div
                  className="w-full h-0.5 bg-neutral-100"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* RIGHT: Notifications / Profile */}
      <div className="relative flex-1 flex justify-end items-center gap-5">
        <button
          className="relative flex justify-center items-center transition"
          aria-label="Notifications"
        >
          <BellIcon className="w-10 h-10 text-neutral-400 hover:text-neutral-200" />
        </button>

        <button
          ref={dropdownRef}
          onClick={() => setIsDropdown((p) => !p)}
          className="relative flex justify-center items-center transition"
          aria-label="User profile"
        >
          <UserCircleIcon className="w-10 h-10 text-neutral-400 hover:text-neutral-200" />
        </button>

        <AnimatePresence>
          {isDropdown && <Dropdown setIsDropdown={setIsDropdown} />}
        </AnimatePresence>
      </div>
    </header>
  );
}
