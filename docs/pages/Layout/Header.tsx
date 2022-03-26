import { RiGithubFill } from 'react-icons/ri'

import {
  ColorScheme,
  IconButton,
  NavigationDrawer,
  TopAppBar,
} from '@literal-ui/core'

import { Link } from './Link'

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
          <IconButton
            renderAs={Link}
            href="https://github.com/literal-ui/literal-ui"
            Icon={RiGithubFill}
          />
          <ColorScheme />
        </TopAppBar.Trailing>
      }
    />
  )
}
