import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { CheckAuthAction } from "./store/auth-slice";
import Loader from "./components/ui/Loader";
import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common-component/CheckAuth";
import AuthLayout from "./components/auth-component/layout";
import AdminLayout from "./components/admin-component/AdminLayout";
import AuthLogin from "./Pages/auth/login";
import AuthRegister from "./Pages/auth/register";
import AdminDashboard from "./Pages/admin-view/AdminDashboard";
import AdminFeatures from "./Pages/admin-view/AdminFeatures";
import AdminProduct from "./Pages/admin-view/AdminProduct";
import AdminOrder from "./Pages/admin-view/AdminOrder";
import ShoppingLayout from "./components/shopping-component/ShoppingLayout";
import ShoppingHome from "./Pages/shopping-view/ShoppingHome";
import ShoppingCheckout from "./Pages/shopping-view/ShoppingCheckout";
import ShoppingListing from "./Pages/shopping-view/ShoppingListing";
import ShoppingAccount from "./Pages/shopping-view/ShoppingAccount";
import Unauth from "./Pages/unauth-page/Unauth";
import NotFound from "./components/not-found/NotFound";
import ShoppingOrderSuccessfull from "./Pages/shopping-view/ShoppingOrderSuccessfull";

import ShoppingSearch from "./Pages/shopping-view/ShoppingSearch";


function App() {
  // console.warn = () => {}; // Suppresses all warnings (use cautiously)
  // console.error = (msg) => {
  //   if (!msg.includes("Missing `Description` or `aria-describedby`")) {
  //     console.error(msg);
  //   }
  // };
  // const isAuthenticated  = false;
  // const user = {
  //   name:"ali",
  //   role:"user",
  // }

  const  {isAuthenticated , user ,isLoading  } = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(CheckAuthAction())
  },[dispatch])
  if(isLoading) return <Loader className="w-screen h-screen"/>



  return (
    <div className="flex flex-col overflow-hidden bg-white">
    
    <Routes>
  {/* Root route showing home page regardless of login */}
  <Route path="/" element={<ShoppingLayout />}>
    <Route index element={<ShoppingHome />} />
  </Route>

  <Route path="/auth" element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AuthLayout />
    </CheckAuth>
  }>
    <Route path="login" element={<AuthLogin />} />
    <Route path="register" element={<AuthRegister />} />
  </Route>

  <Route path="/admin" element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AdminLayout />
    </CheckAuth>
  }>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="features" element={<AdminFeatures />} />
    <Route path="products" element={<AdminProduct />} />
    <Route path="order" element={<AdminOrder />} />
  </Route>

  <Route path="/shop" element={<ShoppingLayout />}>
    <Route path="home" element={<ShoppingHome />} />
    <Route path="listing" element={<ShoppingListing />} />
    <Route path="search" element={<ShoppingSearch />} />
    <Route path="account" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingAccount />
      </CheckAuth>
    }/>
    <Route path="order-success" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingOrderSuccessfull />
      </CheckAuth>
    }/>
    <Route path="checkout" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingCheckout />
      </CheckAuth>
    }/>
  </Route>

  <Route path="/unauth" element={<Unauth />} />
  <Route path="*" element={<NotFound />} />
</Routes>

    </div>
  );
}

export default App;
