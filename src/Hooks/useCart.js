import React, { useContext } from 'react';
import { CartContext } from '../Provider/CartProvider';

const useCart = () => {
   const cartData = useContext(CartContext)
   return cartData
};

export default useCart;