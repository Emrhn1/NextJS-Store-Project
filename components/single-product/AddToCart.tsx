import {Button} from "@/components/ui/button"
function AddToCart({productId}: {productId: string}) {
    return (
        <Button className="capitalize mt-8 cursor-pointer" size="lg">Add to Cart</Button>
    )
}
export default AddToCart;