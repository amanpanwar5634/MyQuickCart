'use client'

import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:flex-row gap-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-16 pb-24"
      >
        {/* Left Section */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8 border-b border-gray-300 pb-6"
          >
            <p className="text-3xl font-semibold text-gray-700">
              Your <span className="text-orange-600">Cart</span>
            </p>
            <p className="text-lg text-gray-500">{getCartCount()} Items</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr className="text-gray-500 text-sm border-b border-gray-200">
                  <th className="pb-4 pr-4">Product Details</th>
                  <th className="pb-4 pr-4">Price</th>
                  <th className="pb-4 pr-4">Quantity</th>
                  <th className="pb-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <motion.tr
                      key={itemId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="border-b border-gray-100"
                    >
                      {/* Product Info */}
                      <td className="flex items-center gap-4 py-4 pr-4">
                        <div className="rounded-md overflow-hidden bg-gray-100 p-2 w-20 h-20 flex items-center justify-center">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="object-cover h-full w-full mix-blend-multiply"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-800 font-medium line-clamp-1">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1 hover:underline"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 pr-4 text-gray-700 font-medium">
                        ${product.offerPrice}
                      </td>

                      {/* Quantity */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                          <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}>
                            <Image src={assets.decrease_arrow} alt="-" className="w-4 h-4" />
                          </button>
                          <input
                            onChange={(e) => updateCartQuantity(product._id, Number(e.target.value))}
                            type="number"
                            value={cartItems[itemId]}
                            className="w-10 text-center border-none bg-transparent text-sm"
                          />
                          <button onClick={() => addToCart(product._id)}>
                            <Image src={assets.increase_arrow} alt="+" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="py-4 text-gray-700 font-semibold">
                        ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Continue Shopping */}
          <motion.button
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => router.push('/all-products')}
            className="group flex items-center mt-8 gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
          >
            <Image
              src={assets.arrow_right_icon_colored}
              alt="arrow"
              className="transition-transform group-hover:-translate-x-1 w-4 h-4"
            />
            Continue Shopping
          </motion.button>
        </div>

        {/* Right Section - Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <OrderSummary />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cart;
