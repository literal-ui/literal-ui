module.exports = {
  extends: ['@remix-run/eslint-config', 'prettier'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        'import/order': [
          'error',
          {
            alphabetize: { order: 'asc' },
            'newlines-between': 'always',
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [{ pattern: '@remixin/**', group: 'internal' }],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
      },
    },
  ],
}
