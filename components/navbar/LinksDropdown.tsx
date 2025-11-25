import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/utils/links';

function LinksDropdown() {
    return (
       <DropdownMenu>
           <DropdownMenuTrigger>
               <Button variant="outline" size="sm" className="max-w-[100px] flex items-center gap-4">
                   <LuAlignLeft className="w-6 h-6" />
               </Button>
               <DropdownMenuContent className="w-38" align="start" sideOffset={10}>
                   {links.map((link) => {
                       return (
                           <DropdownMenuItem key={link.href}>
                               <Link href={link.href} className="capitalize w-full">
                                   {link.label}
                               </Link>
                           </DropdownMenuItem>
                       )
                   })}
               </DropdownMenuContent>
           </DropdownMenuTrigger>
       </DropdownMenu>
    );
}
export default LinksDropdown;