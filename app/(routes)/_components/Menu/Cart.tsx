"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import { DeleteToCart } from "@/actions/cart/deleteToCart";

interface CartProps {
  jwt: string;
  userId: string;
}

const Cart = ({ jwt, userId }: CartProps) => {
  const { items, fetchItems } = useCartStore();
  const [subtotal, setSubTotal] = useState(0);
  const router = useRouter();

  // Cart'taki ürünleri getirme
  const fetchCartItems = useCallback(() => {
    fetchItems(userId, jwt);
  }, [userId, jwt, fetchItems]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    setSubTotal(parseFloat(total.toFixed(2)));
  }, [items]);

  const onDeleteItem = async (id: number) => {
    try {
      console.log(`Deleting item with ID: ${id}`);
      await DeleteToCart(id, jwt);
      fetchCartItems(); // Silme işleminden sonra listeyi güncelle
    } catch (error) {
      console.error("Error deleting item:", error);
      // Hata mesajı göstermek için bir toast eklenebilir
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative cursor-pointer">
          <span
            className="absolute bg-mycolor3 text-mycolor1 text-xs font-semibold -right-2 -top-1 w-5 h-5 rounded-lg items-center justify-center text-center"
          >
            {items.length}
          </span>
          <ShoppingBag />
        </div>
      </SheetTrigger>
      <SheetContent className="bgone">
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
          <SheetDescription>Here are the items currently in your cart.</SheetDescription>
          <div>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} onDeleteItem={onDeleteItem} />
                ))}
              </ul>
            )}
          </div>
          <SheetClose asChild>
            <div className="absolute w-[90%] bottom-6 flex-col">
              <h2 className="text-lg flex justify-between">
                SubTotal <span>${subtotal}</span>
              </h2>
              <div>
                <Button
                  disabled={items.length === 0}
                  onClick={() => router.push(jwt ? "/checkout" : "/login")}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
