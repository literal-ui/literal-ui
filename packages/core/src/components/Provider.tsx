import { createContext, useContext } from 'react'
import { PartialDeep } from 'type-fest'

import { useBoolean } from '@literal-ui/hooks'

type LiteralContext = PartialDeep<{
  ripple: boolean
  nav: {
    open: boolean
    toggle: (v?: any) => void
  }
}>
const Context = createContext<LiteralContext>({})

interface ProviderProps {
  options?: LiteralContext
}
export const LiteralProvider: React.FC<ProviderProps> = ({
  children,
  options,
}) => {
  const [open, toggle] = useBoolean()

  return (
    <Context.Provider value={{ nav: { open, toggle }, ...options }}>
      {children}
    </Context.Provider>
  )
}

export function useLiteralContext() {
  return useContext(Context)
}
