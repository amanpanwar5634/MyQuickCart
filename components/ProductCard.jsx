'use client'
import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { motion } from 'framer-motion'

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext()

  // Calculate discount %
  const discount =
    product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={() => {
        router.push('/product/' + product._id)
        scrollTo(0, 0)
      }}
      className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden w-full max-w-sm mx-auto"
    >
      <div className="relative w-full h-80 overflow-hidden group">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
          >
            {discount}% OFF
          </motion.div>
        )}

        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow">
          <Image
            className="h-4 w-4"
            src={assets.heart_icon}
            alt="heart_icon"
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold truncate">{product.name}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{4.5}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-4 w-4"
                src={index < Math.floor(4)
                  ? assets.star_icon
                  : assets.star_dull_icon}
                alt="star_icon"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-base font-semibold text-gray-800">
            {currency}{product.offerPrice}
            {product.price && (
              <span className="ml-2 text-sm line-through text-gray-400">
                {currency}{product.price}
              </span>
            )}
          </p>
          <button className="text-xs bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
