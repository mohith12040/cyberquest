// src/components/AuthLayout.js
import React from 'react';
import { motion } from 'framer-motion';
import './authBackground.css'; // We'll create this file next

function AuthLayout({ children }) {
  return (
    <div className="auth-background min-h-screen flex items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 animated-bg" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md bg-gray-800/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-purple-700"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;
