'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

const ProductList = () => {
  const { router, user, getToken } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/product/seller-list', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchSellerProduct();
  }, []);

  return (
    <motion.div
      className="flex-1 min-h-screen flex flex-col justify-between bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          className="w-full md:p-10 p-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="pb-6 text-xl font-semibold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            All Products
          </motion.h2>

          <motion.div
            className="flex flex-col items-center max-w-5xl mx-auto w-full overflow-hidden rounded-xl shadow-md bg-white border border-gray-200"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <table className="table-fixed w-full">
              <thead className="text-sm bg-gray-100 text-gray-700">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-semibold text-left">Product</th>
                  <th className="px-4 py-3 font-semibold max-sm:hidden text-left">Category</th>
                  <th className="px-4 py-3 font-semibold text-left">Price</th>
                  <th className="px-4 py-3 font-semibold max-sm:hidden text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {products.map((product, index) => (
                  <motion.tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center gap-3">
                      <div className="bg-gray-200/50 rounded-md p-2">
                        <Image
                          src={product.image[0]}
                          alt="product"
                          className="w-16 h-16 object-cover rounded-md"
                          width={128}
                          height={128}
                        />
                      </div>
                      <span className="font-medium text-gray-800 truncate">{product.name}</span>
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-gray-700">${product.offerPrice}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition"
                      >
                        <span className="hidden md:inline">Visit</span>
                        <Image
                          className="h-4 w-4"
                          src={assets.redirect_icon}
                          alt="redirect icon"
                        />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </motion.div>
  );
};

export default ProductList;
