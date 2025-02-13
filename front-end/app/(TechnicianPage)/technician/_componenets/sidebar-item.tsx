"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)
    );

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-black font-[500] text-sm pl-6 transition-all hover:text-sky-700 hover:bg-slate-300/20 hover:shadow-2xl  duration-300 relative", // Add 'relative' to the button
                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4 w-full">
                <Icon
                    size={22}
                    className={cn("text-black font-bold", isActive && "text-sky-700")}
                />
                {label}
            </div>
            {isActive && (
                <div
                    className="absolute right-0 top-0 bottom-0 w-1 bg-sky-700"
                />
            )}
        </button>
    )
}
