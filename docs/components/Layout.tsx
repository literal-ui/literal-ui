import { useRouter } from 'next/router'
import { RiGithubFill } from 'react-icons/ri'

import { ColorScheme, IconButton, NavDrawer, TopAppBar } from '@literal-ui/core'

import { Link } from './Link'

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
    ],
  },
]

const fmt = (name: string) =>
  name.replace(/-/g, ' ').replace(/^(\w)/, (s) => s.toUpperCase())

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <>
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
              renderAs={Link}
              href="https://github.com/literal-ui/literal-ui"
              Icon={RiGithubFill}
            />
            <ColorScheme />
          </TopAppBar.Trailing>
        }
      />
      <div className="flex">
        <NavDrawer>
          {blocks.map(({ name, items }) => (
            <NavDrawer.Block key={name} headline={fmt(name)}>
              {items.map((item) => {
                const path = `/${name}/${item}`
                return (
                  <NavDrawer.Item active={router.pathname === path} key={item}>
                    <Link href={path}>{fmt(item)}</Link>
                  </NavDrawer.Item>
                )
              })}
            </NavDrawer.Block>
          ))}
        </NavDrawer>
        <main className="mx-auto w-screen max-w-3xl flex-1 p-4">
          {children}
        </main>
      </div>
    </>
  )
}
