import clsx from 'clsx'

export function keys<T>(o: T) {
  return Object.keys(o) as (keyof T)[]
}

export function withClassName<T extends { className?: string }>(
  Component: React.FC<T>,
  className: string,
): React.FC<T> {
  return function WithClassName(props: T) {
    return <Component className={clsx(className, props.className)} {...props} />
  }
}
