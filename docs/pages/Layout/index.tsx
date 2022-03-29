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
      'card',
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
              {items.map((item) => (
                <NavDrawer.Item
                  active={router.asPath.includes(item)}
                  key={item}
                >
                  <Link href={`/${name}/${item}`}>{fmt(item)}</Link>
                </NavDrawer.Item>
              ))}
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
