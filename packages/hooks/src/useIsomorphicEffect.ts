import { useEffect, useLayoutEffect } from 'react'

export const IS_SERVER = typeof window === 'undefined'
export const useIsomorphicEffect = IS_SERVER ? useEffect : useLayoutEffect
