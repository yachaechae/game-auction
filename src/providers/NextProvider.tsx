'use client'

import { NextUIProvider } from '@nextui-org/react'
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
            <NextUIProvider>{children}</NextUIProvider>
        </NextThemesProvider>
    )
}