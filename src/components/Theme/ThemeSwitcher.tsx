'use client'

import {useTheme} from "next-themes";
import { useSwitch, VisuallyHidden } from '@heroui/react'
import { SunIcon, MoonIcon } from '@heroui/shared-icons'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'dark'

    const { Component, getBaseProps, getInputProps, getWrapperProps, slots } =
        useSwitch({
            isSelected: !isDark,
            onChange: () => setTheme(isDark ? 'light' : 'dark'),
        })

    return (
        <div className='flex flex-col gap-2'>
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            'w-8 h-8',
                            'flex items-center justify-center',
                            'rounded-lg bg-default-100 hover:bg-default-200',
                        ],
                    })}
                >
                    {!isDark ? <SunIcon /> : <MoonIcon />}
                </div>
            </Component>
        </div>
    )
}
