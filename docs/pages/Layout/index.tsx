import { useRouter } from 'next/router'

import { NavDrawer } from '@literal-ui/core'

import { Footer } from './Footer'
import { Header } from './Header'
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
      <Header />
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
      <Footer />
    </>
  )
}
