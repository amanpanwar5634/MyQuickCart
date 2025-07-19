"use client";

import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { motion } from "framer-motion";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-4 md:px-16 pt-14 space-y-10"
      >
        {/* Product Section */}
  {/* Product Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col justify-center"
  >
 <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 shadow-md w-full h-[400px]">
  <Image
    src={mainImage || productData.image[0]}
    alt="alt"
    className="w-full h-full object-cover mix-blend-multiply"
    width={1280}
    height={720}
  />
</div>


    <div className="grid grid-cols-4 gap-4">
      {productData.image.map((image, index) => (
        <div
          key={index}
          onClick={() => setMainImage(image)}
          className="cursor-pointer rounded-lg overflow-hidden bg-gray-100 hover:scale-105 transition-transform shadow-sm h-[100px]"
        >
          <Image
            src={image}
            alt="alt"
            className="w-full h-auto object-cover mix-blend-multiply"
            width={1280}
            height={720}
          />
        </div>
      ))}
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col justify-center mb-auto"
  >
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
      {productData.name}
    </h1>

    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        <Image className="h-4 w-4" src={assets.star_icon} alt="star" />
        <Image className="h-4 w-4" src={assets.star_icon} alt="star" />
        <Image className="h-4 w-4" src={assets.star_icon} alt="star" />
        <Image className="h-4 w-4" src={assets.star_icon} alt="star" />
        <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star" />
      </div>
      <p className="text-gray-600 text-sm">(4.5)</p>
    </div>

    <p className="text-gray-600 mt-3">{productData.description}</p>

    <p className="text-3xl font-medium mt-6 text-orange-600">
      ${productData.offerPrice}
      <span className="text-base font-normal text-gray-800/60 line-through ml-2">
        ${productData.price}
      </span>
    </p>

    <hr className="bg-gray-600 my-6" />

    <div className="overflow-x-auto text-sm">
      <table className="table-auto border-collapse w-full max-w-72">
        <tbody>
          <tr>
            <td className="text-gray-600 font-medium pr-2">Brand</td>
            <td className="text-gray-800/50">Generic</td>
          </tr>
          <tr>
            <td className="text-gray-600 font-medium pr-2">Color</td>
            <td className="text-gray-800/50">Multi</td>
          </tr>
          <tr>
            <td className="text-gray-600 font-medium pr-2">Category</td>
            <td className="text-gray-800/50">{productData.category}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="flex items-center mt-10 gap-4">
      <button
        onClick={() => addToCart(productData._id)}
        className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition rounded"
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          addToCart(productData._id);
          router.push("/cart");
        }}
        className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition rounded"
      >
        Buy now
      </button>
    </div>
  </motion.div>
</div>


        {/* Featured Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-semibold">
              Featured{" "}
              <span className="text-orange-600 font-semibold">Products</span>
            </p>
            <motion.div
              layoutId="underline"
              className="w-28 h-0.5 bg-orange-600 mt-2"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>


<motion.button
  whileHover={{ scale: 1.05, backgroundColor: "#fff7ed", color: "#ea580c", borderColor: "#f97316" }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="px-8 py-2 mb-16 border rounded text-orange-500 border-orange-300 shadow-sm"
  onClick={() => router.push('/all-products')}
>
  See more
</motion.button>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
