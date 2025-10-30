"use client";
import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  step: string;
  data: any;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (step: string, data: any) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = React.useCallback((item: CartItem) => {
    setItems((prev) => [...prev.filter((i) => i.step !== item.step), item]);
  }, []);

  const updateItem = React.useCallback((step: string, data: any) => {
    setItems((prev) => prev.map((i) => (i.step === step ? { ...i, data } : i)));
  }, []);

  const clearCart = React.useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
