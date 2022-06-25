import { useRouter } from 'next/router'
import { RiGithubFill } from 'react-icons/ri'

import {
  AppShell,
  ColorScheme,
  IconButton,
  NavDrawer,
  TopAppBar,
} from '@literal-ui/core'
import { Link } from '@literal-ui/next'

const blocks = [
  {
    name: 'get-started',
    items: ['install', 'usage'],
  },
  {
    name: 'components',
    items: [
      'button',
      'icon-button',
      'card',
      'input-chip',
      'assist-chip',
      'filter-chip',
      'suggestion-chip',
      'text-field',
      'menu',
      'navigation-bar',
      'navigation-drawer',
      'top-app-bar',
      'app-shell',
    ],
  },
]

const fmt = (name: string) =>
  name.replace(/-/g, ' ').replace(/^(\w)/, (s) => s.toUpperCase())

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <AppShell
      className="mx-auto max-w-3xl p-4"
      header={
        <TopAppBar
          leading={
            <TopAppBar.Leading>
              <NavDrawer.Toggler />
            </TopAppBar.Leading>
          }
          headline={<TopAppBar.Title>Literal UI</TopAppBar.Title>}
          trailing={
            <TopAppBar.Trailing>
              <IconButton
                as={Link}
                href="https://github.com/literal-ui/literal-ui"
                Icon={RiGithubFill}
              />
              <ColorScheme />
            </TopAppBar.Trailing>
          }
        />
      }
      sidebar={
        <NavDrawer>
          {blocks.map(({ name, items }) => (
            <NavDrawer.Section key={name} headline={fmt(name)}>
              {items.map((item) => {
                const path = `/${name}/${item}`
                return (
                  <NavDrawer.Item active={router.pathname === path} key={item}>
                    <Link href={path}>{fmt(item)}</Link>
                  </NavDrawer.Item>
                )
              })}
            </NavDrawer.Section>
          ))}
        </NavDrawer>
      }
    >
      {children}
    </AppShell>
  )
}
