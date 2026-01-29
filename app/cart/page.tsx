import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import { fetchCartItems } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const CartPage = async () => {
    const user = await currentUser();
    if (!user) {
         redirect('/');
    }

    const cart = await fetchCartItems();

    if (!cart || cart.numItemsInCart === 0) {
        return (
            <div className="text-center">
                 <h1 className="text-3xl font-bold">Shopping Cart</h1>
                 <div className="mt-8">
                     <p className="text-xl mb-4">Your cart is empty</p>
                     <Button asChild size="lg">
                         <Link href="/products">Browse Products</Link>
                     </Button>
                 </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <CartItemsList cartItems={cart.cartItems} />
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotals cart={cart} />
                </div>
            </div>
        </div>
    )
}
export default CartPage;