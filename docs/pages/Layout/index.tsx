import { useRouter } from 'next/router'

import { NavigationDrawer } from '@literal-ui/core'

import { Footer } from './Footer'
import { Header } from './Header'
import { Link } from './Link'

const links = ['button', 'navigation-bar', 'navigation-drawer', 'top-app-bar']

export const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Header />
      <NavigationDrawer>
        {links.map((link) => (
          <NavigationDrawer.Item
            active={router.asPath.includes(link)}
            key={link}
          >
            <Link href={`/components/${link}`}>
              {link.replace(/-/g, ' ').replace(/^(\w)/, (s) => s.toUpperCase())}
            </Link>
          </NavigationDrawer.Item>
        ))}
      </NavigationDrawer>
      <main>{children}</main>
      <Footer />
    </>
  )
}
