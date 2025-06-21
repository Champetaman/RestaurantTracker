import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <motion.div 
            className="flex items-center space-x-2 mb-3 md:mb-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Heart className="w-4 h-4 text-red-400" />
            <p className="text-sm">
              © 2025 Camilo Oviedo. Almost all Rights Reserved.
            </p>
          </motion.div>

          {/* Creator Link */}
          <motion.a
            href="https://www.camilooviedo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-sm">Visit my portfolio</span>
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}