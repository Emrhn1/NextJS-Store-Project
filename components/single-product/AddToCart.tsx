"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/utils/actions";
import { toast } from "sonner";

function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
      setIsLoading(true);
      const res = await addToCart(productId);
      setIsLoading(false);
      if (res.message) {
          toast(res.message);
      }
  };

  return (
    <Button
      className="capitalize mt-8 cursor-pointer"
      size="lg"
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
export default AddToCart;