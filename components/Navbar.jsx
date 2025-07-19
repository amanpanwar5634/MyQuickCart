'use client';

import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSeller, router, user } = useAppContext();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 py-3 border-b border-gray-300 text-gray-700 bg-white z-50"
    >
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Nav Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center gap-4 lg:gap-8 max-md:hidden"
      >
        <Link href="/" className="hover:text-red-600 transition">Home</Link>
        <Link href="/all-products" className="hover:text-red-600 transition">Shop</Link>
        <Link href="/" className="hover:text-red-600 transition">About Us</Link>
        <Link href="/" className="hover:text-red-600 transition">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full hover:border-red-500 transition"
          >
            Seller Dashboard
          </button>
        )}
      </motion.div>

      {/* Right Icons */}
      <ul className="hidden md:flex items-center gap-4">
      
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 hover:text-red-600 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile Actions */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="All Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 hover:text-red-600 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
