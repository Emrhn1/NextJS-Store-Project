import IconButton from "@mui/material/IconButton";
import { IoMdHeart } from "react-icons/io";
import { Button } from "../ui/button";

const FavoriteToggleButton = ({productId}: {productId: string}) => {
    return (
        <Button className="cursor-pointer w-9 h-9 bg-gray-500 rounded-xl" aria-label="add to favorites" size="icon">
            <IoMdHeart />
        </Button>
    )
}
export default FavoriteToggleButton