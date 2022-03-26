import { useRouter } from 'next/router'

import { NavigationDrawer } from '@literal-ui/core'

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
    items: ['button', 'navigation-bar', 'navigation-drawer', 'top-app-bar'],
  },
]

const fmt = (name: string) =>
  name.replace(/-/g, ' ').replace(/^(\w)/, (s) => s.toUpperCase())

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Header />
      <NavigationDrawer>
        {blocks.map(({ name, items }) => (
          <NavigationDrawer.Block key={name} headline={fmt(name)}>
            {items.map((item) => (
              <NavigationDrawer.Item
                active={router.asPath.includes(item)}
                key={item}
              >
                <Link href={`/${name}/${item}`}>{fmt(item)}</Link>
              </NavigationDrawer.Item>
            ))}
          </NavigationDrawer.Block>
        ))}
      </NavigationDrawer>
      <main>{children}</main>
      <Footer />
    </>
  )
}
