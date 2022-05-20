import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { useMediaQuery } from './useMediaQuery'

type TColorScheme = 'light' | 'dark'

export function useColorScheme() {
  const [scheme, setScheme] = useLocalStorageState<TColorScheme>(
    'literal-color-scheme',
    { ssr: true },
  )

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const dark = scheme === 'dark' || (!scheme && prefersDark)

  const toggle = useCallback(() => {
    setScheme(dark ? 'light' : 'dark')
  }, [dark, setScheme])

  useEffect(() => {
    if (dark !== undefined)
      document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return { scheme, toggle }
}
