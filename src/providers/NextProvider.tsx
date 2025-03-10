'use client'

import {HeroUIProvider} from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function NextProviders({ children }: { children: React.ReactNode }) {
    const [isMount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    if (!isMount) {
        return null
    }
    return (
        <NextThemesProvider attribute='class'>
            <HeroUIProvider>{children}</HeroUIProvider>
        </NextThemesProvider>
    )
}