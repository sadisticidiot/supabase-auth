import { useEffect, useRef, useState } from "react"
import BaseInput from "./BaseInput"
import placeholder from "/Group 1.png"
import Dropdown from "./Dropdown"

export default function Header({ first_name, last_name }) {

    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null)


    useEffect(() => {
        if (!isDropdown) return

        const handleOutside = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setIsDropdown(false)
            }
        }

        document.addEventListener("pointerdown", handleOutside)
        return () => document.removeEventListener("pointerdown", handleOutside)
    }, [isDropdown])

    return (
        <header className="header-base">
                <h1>Test</h1>
                <BaseInput
                    placeholder="Search"
                    className="flex-1 p-2 px-3 rounded-2xl"
                />

                <div ref={dropdownRef} className="relative">
                    <img
                        src={placeholder}
                        onClick={() => setIsDropdown(p => !p)}
                        className="size-[55px] hover:bg-neutral-500/50 rounded-[20px] cursor-pointer"
                    />

                    {isDropdown && (
                        <Dropdown first_name={first_name} last_name={last_name} />
                    )}
                </div>
        </header>
    )
}
