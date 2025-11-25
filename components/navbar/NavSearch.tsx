import React from "react"
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CiSearch } from "react-icons/ci";
const NavSearch = () => {
    return (
        <TextField
            type="search"
            variant="standard"
            placeholder="Search Products..."
            className="max-w-md w-full dark:bg-gray-800 dark:text-white"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment position="start">
                      <CiSearch size={20}/>
                    </InputAdornment>
                ),
            }}
            sx={{
                background: "#f0f0f0",
                padding: "4px 12px",
                borderRadius: "8px",
            }}
        />

    )
}
export default NavSearch