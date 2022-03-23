import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'

type TColorScheme = 'light' | 'dark'

export function useColorScheme(defaultValue: TColorScheme = 'light') {
  const [scheme, setScheme] = useLocalStorageState('literal-color-scheme', {
    ssr: true,
    defaultValue,
  })
  const dark = scheme === 'dark'

  const toggle = useCallback(() => {
    setScheme((s) => (s === 'dark' ? 'light' : 'dark'))
  }, [setScheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => setScheme(mql.matches ? 'dark' : 'light')
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [setScheme, toggle])

  return { scheme, toggle }
}
