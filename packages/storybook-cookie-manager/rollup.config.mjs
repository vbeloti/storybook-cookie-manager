import esbuild from 'rollup-plugin-esbuild'

export default [
  {
    input: ['src/index.ts', 'src/manager.ts'],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
      {
        dir: 'dist',
        format: 'es',
        entryFileNames: '[name].js',
      },
    ],

    plugins: [
      esbuild({
        minify: true,
        target: 'es6',
      }),
    ],
    external: ['react'],
  },
]
