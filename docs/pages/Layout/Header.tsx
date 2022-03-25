import { RiGithubFill } from 'react-icons/ri'

import {
  ColorScheme,
  IconButton,
  NavigationDrawerToggler,
  TopAppBar,
} from '@literal-ui/core'

export const Header: React.FC = () => {
  return (
    <TopAppBar>
      <TopAppBar.Leading>
        <NavigationDrawerToggler />
      </TopAppBar.Leading>
      <TopAppBar.Title>Literal UI</TopAppBar.Title>
      <TopAppBar.Trailing>
        <IconButton Icon={RiGithubFill} />
        <ColorScheme />
      </TopAppBar.Trailing>
    </TopAppBar>
  )
}
