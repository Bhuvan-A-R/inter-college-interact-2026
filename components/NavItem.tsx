import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
    href: string;
    text: string;
    isActive: boolean;
    className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
    href,
    text,
    isActive,
    className,
}) => {
    return (
        <Link
            href={{
                pathname: href,
            }}
            className={cn(
                `xl:ml-0 ${
                    isActive
                        ? "font-bold text-foreground"
                        : "font-normal text-muted-foreground"
                } hidden md:inline-block p-1 sm:px-4 sm:py-2  hover:text-primary-foreground hover:bg-primary transition-all`,
                className
            )}
        >
            <span
                className={`${
                    isActive ? "py-1 border-b-2 border-primary" : "capsize"
                }`}
            >
                {text}
            </span>
        </Link>
    );
};

export default NavItem;
