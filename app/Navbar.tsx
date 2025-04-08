"use client";

import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBug } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
  const currentPath = usePathname();

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
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
