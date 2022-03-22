import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: 'app/components/index.ts',
    output: [
      { file: 'dist/esm/index.js', format: 'esm' },
      { file: 'dist/cjs/index.js', format: 'cjs' },
    ],
    plugins: [typescript()],
  },
  {
    input: 'app/components/index.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
])
