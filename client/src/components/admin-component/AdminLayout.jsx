import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation hook
import { motion } from 'framer-motion'; // Import motion
import AdminSidebar from './sidebar';
import AdminHeader from './header';

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation(); // Get the current location to trigger transitions

  return (
    <div className='flex min-h-screen w-full'>
      {/* adminsidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* adminheader */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className='flex flex-col flex-1 bg-muted/40 p-4 md:p-6'>
     
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
    </div>
  );
};

export default AdminLayout;
