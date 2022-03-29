import { useRouter } from 'next/router'
import { MdCircle } from 'react-icons/md'

import { NavBar } from '@literal-ui/core'

import { Link } from './Link'

const items = [
  { Icon: MdCircle, name: 'button' },
  { Icon: MdCircle, name: 'navigation-bar' },
  { Icon: MdCircle, name: 'navigation-drawer' },
  { Icon: MdCircle, name: 'top-app-bar' },
]

export const Footer: React.FC = () => {
  const router = useRouter()
  return (
    <NavBar>
      {items.map(({ Icon, name }) => (
        <NavBar.Item
          key={name}
          Icon={Icon}
          active={router.asPath.includes(name)}
        >
          <Link href={`/components/${name}`}></Link>
        </NavBar.Item>
      ))}
    </NavBar>
  )
}
