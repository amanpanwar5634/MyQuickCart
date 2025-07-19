'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);

    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    try {
      const token = await getToken();

      const { data } = await axios.post('/api/product/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
        setOfferPrice('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex ml-6 md:ml-12 items-center justify-center py-10 px-6">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-10 space-y-8 mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Add New Product
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-medium text-lg mb-2">Product Images</p>
          <div className="flex flex-wrap items-center gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.label
                key={index}
                htmlFor={`image${index}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  className="w-48 h-36 object-cover rounded-lg border-2 border-dashed border-gray-300 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt={`Product Image ${index + 1}`}
                  width={144}
                  height={144}
                />
              </motion.label>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              type="text"
              placeholder="Type here"
              className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              className="border rounded-lg px-4 py-3 outline-none"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={5}
            placeholder="Type here"
            className="border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="border rounded-lg px-4 py-3 outline-none"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="border rounded-lg px-4 py-3 outline-none"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Add Product
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddProduct;
