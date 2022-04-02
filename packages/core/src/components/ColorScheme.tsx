import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

import { useColorScheme } from '@literal-ui/hooks'

import { IconButton } from './Button'

export const ColorScheme: React.FC = () => {
  const { toggle } = useColorScheme()

  return (
    <>
      <IconButton
        Icon={MdOutlineDarkMode}
        onClick={toggle}
        className="hidden dark:inline-block"
      />
      <IconButton
        Icon={MdOutlineLightMode}
        onClick={toggle}
        className="dark:hidden"
      />
    </>
  )
}

export const PreventFlash: React.FC = () => {
  const setColorScheme = () => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const scheme = localStorage.getItem('literal-color-scheme')
    if (scheme === '"dark"' || (!scheme && mql.matches))
      document.documentElement.classList.toggle('dark', true)
  }
  return (
    <script
      dangerouslySetInnerHTML={{ __html: `(${setColorScheme})()` }}
    ></script>
  )
}
