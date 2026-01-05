import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const navItems = [
    { name: "home", path: "/dashboard", Icon: HomeIcon, label: "Home" },
    { name: "post", path: "/dashboard/posts", Icon: BookOpenIcon, label: "Posts" },
    { name: "data", path: "/dashboard/data", Icon: ChartBarIcon, label: "Data" },
    { name: "themes", path: "/dashboard/themes", Icon: PaintBrushIcon, label: "Themes" },
  ];

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

  const NavButtons = () => (
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
  );

  return (
    <>
      {/* HEADER */}
      <header className="header-base px-4 py-8 md:py-1 gap-2 flex">
        {/* LEFT */}
        <div className="flex items-center justify-start gap-6 flex-1">
          <h1 className="hidden md:block">Test</h1>
          <MagnifyingGlassIcon className="w-6 h-6 text-white/80 hover:text-white cursor-pointer" />
        </div>

        {/* CENTER (desktop only) */}
        <div className="hidden md:flex flex-1 size-full">
          <NavButtons />
        </div>

        {/* RIGHT */}
        <div
          className="relative flex-1 flex justify-end items-center gap-5"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsDropdown((p) => !p)}
            aria-label="User profile"
          >
            <UserCircleIcon className="w-8 h-8 cursor-pointer text-neutral-400 hover:text-neutral-200" />
          </button>

          <AnimatePresence>
            {isDropdown && <Dropdown setIsDropdown={setIsDropdown} />}
          </AnimatePresence>
        </div>
      </header>

      {/* FOOTER (mobile only) */}
      <footer className="footer-base px-4 py-1 gap-2 md:hidden">
        <NavButtons />
      </footer>
    </>
  );
}
