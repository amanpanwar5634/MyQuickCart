'use client';

import Navbar from '@/components/seller/Navbar';
import Sidebar from '@/components/seller/Sidebar';
import React from 'react';
import { motion } from 'framer-motion';

const layoutVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <motion.div
          className=""
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <Sidebar />
        </motion.div>

        <motion.div
          className="flex-1"
          variants={layoutVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
