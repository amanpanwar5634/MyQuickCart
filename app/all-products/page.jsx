'use client';

import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />

      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-16">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start mb-10"
        >
          <p className="text-3xl md:text-4xl font-semibold text-gray-800">
            All Products
          </p>
          <motion.div
            initial={{ width: "20%" }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1 }}
            className="h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mt-2"
          />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
