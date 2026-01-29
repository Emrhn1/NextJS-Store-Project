import { Cart } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;

  return (
    <div>
      <div className="card bg-muted p-8 rounded-lg">
          <p className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">{formatCurrency(cartTotal)}</span>
          </p>
          <Separator className="my-2" />
          <p className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="font-medium">{formatCurrency(shipping)}</span>
          </p>
           <Separator className="my-2" />
          <p className="flex justify-between text-sm">
            <span>Tax</span>
            <span className="font-medium">{formatCurrency(tax)}</span>
          </p>
          <Separator className="my-2" />
          <p className="flex justify-between text-lg font-bold mt-4">
            <span>Order Total</span>
            <span className="font-medium">{formatCurrency(orderTotal)}</span>
          </p>
      </div>
      <Button className="w-full mt-8 capitalize" size="lg">
          Proceed to Checkout
      </Button>
    </div>
  );
}
export default CartTotals;