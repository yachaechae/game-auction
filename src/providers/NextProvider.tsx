'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, ReactNode } from 'react';

type NextProvidersProps = { children: ReactNode };

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export function NextProviders({ children }: NextProvidersProps) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <NextThemesProvider attribute="class">
      <HeroUIProvider>{children}</HeroUIProvider>
    </NextThemesProvider>
  );
}
