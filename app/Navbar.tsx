"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex border-b mb-4 px-5 h-14 items-center">
      <Flex justify="between" className="w-full">
        <Flex gap="3">
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
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Log out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default Navbar;
