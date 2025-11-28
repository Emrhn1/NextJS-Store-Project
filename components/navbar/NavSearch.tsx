"use client"
import React from "react"
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
const NavSearch = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm,setSearchTerm] = useState(searchParams.get('search')?.toString || '')
   
     const handleSearch = useDebouncedCallback((value: string)=>{
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('search', value);
        }
        else {
            params.delete('search');
        }
        router.push(`/products?${params.toString()}`)
     },300)

     useEffect(()=>{
         if(!searchParams.get('search')) {
            setSearchTerm('');
         }
     },[searchParams.get('search')]);

    return (
        <Input
      type='search'
      placeholder='search product...'
      className='max-w-xs dark:bg-muted '
      onChange={(e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
      }}
      value={searchTerm}
    />

    )
}
export default NavSearch