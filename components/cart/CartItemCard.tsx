"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem, Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { removeCartItem, updateCartItemAmount } from "@/utils/actions";
import { useState } from "react";
import { toast } from "sonner";

type CartItemWithProduct = CartItem & {
  product: Product;
};

function CartItemCard({ cartItem }: { cartItem: CartItemWithProduct }) {
  const { product, amount } = cartItem;
  const { name, image, company, price } = product;
  const [isLoading, setIsLoading] = useState(false);

  const removeCartItemAction = async () => {
      setIsLoading(true);
      const res = await removeCartItem(cartItem.id);
      setIsLoading(false);
      if (res.message) toast(res.message);
  };

  const increaseAmount = async () => {
      setIsLoading(true);
      const res = await updateCartItemAmount(cartItem.id, amount + 1);
      setIsLoading(false);
       if (res.message) toast(res.message);
  };

   const decreaseAmount = async () => {
      setIsLoading(true);
      const res = await updateCartItemAmount(cartItem.id, amount - 1);
      setIsLoading(false);
       if (res.message) toast(res.message);
  };

  return (
    <article className="flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      {/* IMAGE */}
      <div className="relative h-24 w-24 sm:h-32 sm:w-32">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="h-full w-full rounded-lg object-cover"
          priority
        />
      </div>
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{name}</h3>
        <h4 className="mt-2 text-sm text-neutral-content capitalize">
          {company}
        </h4>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={decreaseAmount} disabled={isLoading}>
                -
            </Button>
            <span className="font-medium">{amount}</span>
            <Button variant="outline" size="icon" onClick={increaseAmount} disabled={isLoading}>
                +
            </Button>
        </div>
        {/* REMOVE */}
        <Button variant="link" className="mt-2 -ml-4 text-red-500" onClick={removeCartItemAction} disabled={isLoading}>
            Remove
        </Button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatCurrency(price)}</p>
    </article>
  );
}
export default CartItemCard;