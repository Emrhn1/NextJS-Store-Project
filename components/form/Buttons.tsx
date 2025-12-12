"use client"
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuSquare } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';

type btnSize = "default" | "lg" | "sm";

type ButtonProps = {
    size?: btnSize;
    className?: string;
    text?: string;
}

const Buttons = ({text="submit",className="", size="lg"}: ButtonProps) => {
    const {pending} = useFormStatus()
    return (
        <Button
         disabled={pending}
         className={cn('capitalize', className)}
         size={size}
         type="submit"
         name="name"
        >
            {pending ? (
                <>
                <ReloadIcon fontSize="lg" className='mr-2 h-4 w-4 animate-spin' />
                Please wait...
                </>
            ): (
                text
                )}

        </Button>
    )
}
export default Buttons