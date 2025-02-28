"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const currentPath = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-4 px-5 h-14 items-center">
      <Link href="/">
        <IoBug />
      </Link>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <Link
            className={classNames({
              "text-zinc-900": link.href == currentPath,
              "text-zinc-500": link.href != currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
