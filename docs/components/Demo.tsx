import React, { ComponentProps } from 'react'

export function Demo({ children }: ComponentProps<'div'>) {
  return (
    <div className="my-4 flex flex-wrap justify-center gap-4">{children}</div>
  )
}
