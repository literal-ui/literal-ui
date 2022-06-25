import clsx from 'clsx'
import { PropsWithChildren, ReactNode } from 'react'

interface AppShellProps extends PropsWithChildren {
  className?: string
  header?: ReactNode
  sidebar?: ReactNode
  navbar?: ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  sidebar,
  navbar,
  className,
  children,
}) => {
  return (
    <>
      {header}
      <div className="flex" style={{ minHeight: `calc(100vh - 64px)` }}>
        {sidebar}
        <div className={clsx('flex flex-1 flex-col')}>
          <main className={clsx('w-screen flex-1', className)}>{children}</main>
          {navbar}
        </div>
      </div>
    </>
  )
}
