import { createContext, useContext } from 'react'

import { useBoolean } from '@literal-ui/hooks'

type LiteralContext = {
  nav: {
    open?: boolean
    toggle: (v?: any) => void
  }
}
const Context = createContext<Partial<LiteralContext>>({})

interface ProviderProps {}
export const LiteralProvider: React.FC<ProviderProps> = ({ children }) => {
  const [open, toggle] = useBoolean()

  return (
    <Context.Provider value={{ nav: { open, toggle } }}>
      {children}
    </Context.Provider>
  )
}

export function useLiteralConfig() {
  return useContext(Context)
}
