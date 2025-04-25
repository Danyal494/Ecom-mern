import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import ShoppingHeader from './ShoppingHeader';
import { motion } from 'framer-motion'; 

const ShoppingLayout = () => {
  const location = useLocation();

  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      {/* commonheader */}
      <ShoppingHeader />
      <main className='flex flex-col w-full'>

        <motion.div
          key={location.pathname} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}     
          transition={{ duration: 0.8 }} 
        >
          <Outlet /> 
        </motion.div>
      </main>
    </div>
  );
};

export default ShoppingLayout;
