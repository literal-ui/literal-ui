import React from 'react'

interface WithDividerProps {
  divider: React.ReactNode
}

export const WithDivider: React.FC<WithDividerProps> = ({
  children,
  divider,
}) => {
  return (
    <>
      {React.Children.toArray(children).reduce((acc, cur) => (
        <>
          {acc} {divider} {cur}
        </>
      ))}
    </>
  )
}
