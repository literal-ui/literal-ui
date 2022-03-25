import { useEffect, useState } from 'react'

import { useEventListener } from './useEventListener'

export function useMediaQuery(query: string) {
  const [mql, setMQL] = useState<MediaQueryList>()
  const [matches, setMatches] = useState<boolean>()

  useEffect(() => {
    setMQL(window.matchMedia(query))
  }, [query])

  useEffect(() => {
    if (mql) setMatches(mql.matches)
  }, [mql])

  useEventListener<MediaQueryListEventMap>(mql, 'change', (e) =>
    setMatches(e.matches),
  )

  return matches
}
