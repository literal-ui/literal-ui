import { ElementType, ComponentProps } from 'react'
import { Simplify } from 'type-fest'

type PropsWithAs<P, T extends ElementType> = P & { as?: T }

// https://github.com/kripod/react-polymorphic-types
export type PolymorphicProps<P, T extends ElementType> = PropsWithAs<P, T> &
  // use `Simplify` to ensure `T` is inferred correctly
  // https://github.com/tailwindlabs/headlessui/blob/a63ca93aae80326b4a97a4506d9ce7331a68ff60/packages/%40headlessui-react/src/types.ts#L19
  Simplify<ComponentProps<T>>
