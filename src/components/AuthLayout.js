// src/components/AuthLayout.js
import React from 'react';
import { motion } from 'framer-motion';

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 text-white p-8 rounded-xl shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;
