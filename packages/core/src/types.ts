import { ElementType, ComponentProps } from 'react'
import { Simplify } from 'type-fest'

export type RendererProps<R> = R extends ElementType ? ComponentProps<R> : never

// use `Simplify` to ensure `T` is inferred correctly
// Inspired by https://github.com/tailwindlabs/headlessui/blob/a63ca93aae80326b4a97a4506d9ce7331a68ff60/packages/%40headlessui-react/src/types.ts#L19
export type WithRenderAs<R> = Simplify<RendererProps<R>> & {
  renderAs?: R
}
