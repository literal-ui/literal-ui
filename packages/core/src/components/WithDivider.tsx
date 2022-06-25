import React, { PropsWithChildren } from 'react'

interface WithDividerProps extends PropsWithChildren {
  divider: React.ReactNode
}

export const WithDivider: React.FC<WithDividerProps> = ({
  children,
  divider,
}) => {
  const childrenArray = React.Children.toArray(children)
  if (childrenArray.length === 0) return null

  return (
    <>
      {childrenArray.reduce((acc, cur) => (
        <>
          {acc} {divider} {cur}
        </>
      ))}
    </>
  )
}
