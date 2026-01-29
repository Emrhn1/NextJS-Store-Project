import CartItemCard from "./CartItemCard";
import { CartItem, Product } from "@prisma/client";

type CartItemWithProduct = CartItem & {
    product: Product;
};

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}
export default CartItemsList;