"use client"
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from 'sonner';

function Providers({children} : {children: React.ReactNode}) {
    return (
        <>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            </NextThemesProvider>
        </>
    )
}
export default Providers