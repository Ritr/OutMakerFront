import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchCartData } from "../Hooks/api/useFetchCartData";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const userId = localStorage.getItem("usercode") || null;
  const queryClient = useQueryClient();
  const { data, error } = useFetchCartData(userId);
  const [cartData, setCartData] = useState(null);
  const [objectOnlyData, setObjectOnlyData] = useState([]);
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    if (data) {
      setCartData(data);
      setObjectOnlyData(data.filter((item) => typeof item === "object"));
      setCostData(data.find((item) => typeof item === "number"));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    }
  }, [error]);

  const fetchCartData = () => {
    if (userId) {
      queryClient.invalidateQueries(["cartData", userId]);
    }
  };

  const updateObjectOnlyData = (data) => {
    setObjectOnlyData(data);
  };

  const cartInfo = {
    cartData,
    objectOnlyData,
    costData,
    updateObjectOnlyData,
    fetchCartData,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
