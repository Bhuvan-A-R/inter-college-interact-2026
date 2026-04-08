"use client"
import type React from "react"
import Link from "next/link"
import { X, ChevronDown } from "lucide-react"
import { ThemeToggler } from "@/contexts/theme-provider"
import { useAuthContext } from "@/contexts/auth-context"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MobileSidebarProps {
    isOpen: boolean
    onClose: () => void
}

const navItems = [
   
    {
        text: "About Us",
        href: "/about",
        subitems: [
            { href:"/about" , text:"About Global Academy Of Technology"},
            { href: "/about/vtu", text: "About VTU" },
            { href: "/about/youthfest", text: "About Youth Fest" },
            { href: "/Dignitaries", text: "Organising Committee" },
        ],
    },
    {
        text: "Events",
        href: "/events",
        subitems: [
            { href: "/schedule", text: "Schedule" },
            { href: "/summary", text: "Summary" },
            { href: "/generalinstructions", text: "General Instructions" },
            { href: "/rulesandregulations", text: "Rules and Regulations" },
        ],
    },
]

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
    const { isLoggedIn } = useAuthContext()

    return (
        <div
            className={`absolute top-0 min-h-screen right-0  z-50 w-64 max-w-full bg-background shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-foreground hover:text-primary transition-colors">
                    <X className="h-6 w-6" />
                </button>
            </div>
            <nav className="px-4 py-2">
                <ul className="space-y-4">
                    <li>
                    <Link
                                    href="/"
                                    className="block py-1 text-foreground hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>

                    </li>
                    {/* {navItems.map((item) => (
                        <li key={item.href}>
                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors">
                                    {item.text}
                                    {item.subitems.length > 0 && <ChevronDown className="h-4 w-4" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {item.subitems.length > 0 ? (
                                        <ul className="pl-4 mt-2 space-y-2">
                                            {item.subitems.map((subitem) => (
                                                <li key={subitem.href}>
                                                    <Link
                                                        href={subitem.href}
                                                        className="block py-1 text-foreground hover:text-primary transition-colors"
                                                    >
                                                        {subitem.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Link href={item.href} className="block py-1 text-foreground hover:text-primary transition-colors">
                                            {item.text}
                                        </Link>
                                    )}
                                </CollapsibleContent>
                            </Collapsible>
                        </li>
                       
                    ))} */}
                     {/* <li>
                             <Link
                                    href="/contactus"
                                    className="block py-1 text-foreground hover:text-primary transition-colors"
                                >
                                    contact Us
                                </Link>
                    </li>
                    <li>
                             <Link
                                    href="/schedule"
                                    className="block py-1 text-foreground hover:text-primary transition-colors"
                                >
                                    Schedule
                                </Link>
                    </li> */}
                    {isLoggedIn ? (
                        <>
                            <li>

                                <Link
                                    href="/register/getallregister"
                                    className="block py-1 text-foreground hover:text-primary transition-colors"
                                >
                                    Register
                                </Link>

                            </li>
                            <li>

                                <Link
                                    href="/auth/logout"
                                    className="block py-1 text-foreground hover:text-primary transition-colors"
                                >
                                    Logout
                                </Link>

                            </li>
                        </>
                    ) : (
                        <li>

                            <Link href="/auth/signin" className="block py-1 text-foreground hover:text-primary transition-colors">
                                Login
                            </Link>

                        </li>
                    )}
                </ul>
            </nav>
            <div className="px-4 py-2">
                <ThemeToggler />
            </div>
        </div>
    )
}

export default MobileSidebar

