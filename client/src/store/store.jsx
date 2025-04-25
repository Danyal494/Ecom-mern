// it will  hold all user state by reduser and we will switch by state 


import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import adminProductsSlice from './admin-slice/admin-product-slice/index'
import ShoppingProductSlice from './shop-slice/product-slice/index'
import shoppingCartSlice from './shop-slice/cart-slice/index'

import shoppingAddressSlice from './shop-slice/address-slice/index'
import shoppingSearchSlice from './shop-slice/search-slice/index'

import shoppingOrderSlice from './shop-slice/order-slice/index'
import shoppingReviewSlice from './shop-slice/review-slice/index'
import adminOrderSlice from './admin-slice/admin-order-slice/index'
import commonFeatureSlice from './common-slice/admin-feature-slice/index'
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts:adminProductsSlice,
        shopProducts:ShoppingProductSlice,
        shopCart: shoppingCartSlice,
        shopAddress  :shoppingAddressSlice,
        shopOrder:shoppingOrderSlice ,
        shopSearch:shoppingSearchSlice ,
shopReview:shoppingReviewSlice,
        adminOrder:adminOrderSlice,
        commonFeature: commonFeatureSlice,
    }
})

export default store