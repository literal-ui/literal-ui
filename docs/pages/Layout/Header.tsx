import { RiGithubFill } from 'react-icons/ri'

import {
  ColorScheme,
  IconButton,
  NavigationDrawer,
  TopAppBar,
} from '@literal-ui/core'

export const Header: React.FC = () => {
  return (
    <TopAppBar
      leading={
        <TopAppBar.Leading>
          <NavigationDrawer.Toggler />
        </TopAppBar.Leading>
      }
      headline={<TopAppBar.Title>Literal UI</TopAppBar.Title>}
      trailing={
        <TopAppBar.Trailing>
          <IconButton Icon={RiGithubFill} />
          <ColorScheme />
        </TopAppBar.Trailing>
      }
    />
  )
}
