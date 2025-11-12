"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { cn } from '../../utils/helpers';

export function NavBar({ items, className, onNavItemClick, activePage }) {
  const [activeTab, setActiveTab] = useState(items.find(item => item.id === activePage)?.name || items[0].name);

  useEffect(() => {
    const currentActiveItem = items.find(item => item.id === activePage);
    if (currentActiveItem) {
      setActiveTab(currentActiveItem.name);
    }
  }, [activePage, items]);

  const handleClick = (item) => {
    setActiveTab(item.name);
    if (onNavItemClick) {
      onNavItemClick(item.id);
    }
  };

  return (
    <div className={cn("fixed bottom-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none", className)}>
      <div className="flex items-center gap-2 bg-black/5 border border-white/10 backdrop-blur-lg p-1 rounded-full shadow-lg pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <Link 
              key={item.name} 
              to={item.url} 
              onClick={() => handleClick(item)} 
              className={cn("relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors", "text-white/80 hover:text-white", isActive && "text-white")}
            >
              <div className="relative z-20 flex items-center gap-2">
                <Icon size={18} strokeWidth={2} />
                <span className="hidden md:inline">{item.name}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="lamp" 
                  className="absolute inset-0 w-full bg-white/10 rounded-full" 
                  initial={false} 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-400">
                    <div className="absolute w-10 h-4 bg-orange-400/40 rounded-full blur-md -top-1.5 -left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}