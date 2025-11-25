"use client"
import {ThemeProvider as NextThemesProvider} from "next-themes";
function Providers({children} : {children: React.ReactNode}) {
    return (
        <>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            </NextThemesProvider>
        </>
    )
}
export default Providers