import React from "react"
import {Button} from "../ui/button"
import Link from "next/link"
import { IoMdCart } from "react-icons/io";
const CartButton = () => {
    const numItemsinCart = 10;
    return (
        <Button asChild variant="outline" size="icon" className="flex justify-center hover:bg-blue-100 items-center relative">
            <Link href="/cart">
                <IoMdCart size={30} />
                <span className="absolute -top-2 -right-3 bg-blue-400 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                    {numItemsinCart}
                </span>
            </Link>
        </Button>
    )
}
export default CartButton