'use client';
import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-20 px-6 md:px-10  min-h-screen">
    <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2 w-full text-left"
>
  Popular Products
</motion.div>

<motion.div
  initial={{ width: "1%" }}
  animate={{ width: "30%" }}
  transition={{ duration: 1, ease: "easeInOut" }}
  className="h-1 bg-orange-500 rounded-full mb-5 mr-auto"
/>


      <motion.div
        className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       {products.slice(0, 3).map((product, index) => (
  <motion.div key={index} variants={itemVariants}>
    <ProductCard product={product} />
  </motion.div>
))}

      </motion.div>

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => router.push('/all-products')}
  className="mt-2 px-10 py-3 rounded-lg text-white font-medium bg-orange-500 hover:from-red-600 hover:to-red-800 transition-all shadow-lg"
>
  See More Products →
</motion.button>

    </div>
  );
};

export default HomeProducts;
