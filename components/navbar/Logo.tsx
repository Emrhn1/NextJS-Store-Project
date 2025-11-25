import React from "react"
import IconButton from "@mui/material/IconButton"
import { FaEtsy } from "react-icons/fa6";
import Link from "next/link"
const Logo = () => {
    return (
        <IconButton size="medium" aria-label="logo" color="primary">
            <Link href="/">
          <FaEtsy size={30} />
            </Link>
        </IconButton>
    )
}
export default Logo;