export const PreventFlash: React.FC = () => {
  const setColorScheme = () => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const scheme = localStorage.getItem('literal-color-scheme')
    if (scheme === '"dark"' || (!scheme && mql.matches))
      document.documentElement.classList.toggle('dark', true)
  }
  return (
    <script
      dangerouslySetInnerHTML={{ __html: `(${setColorScheme})()` }}
    ></script>
  )
}
