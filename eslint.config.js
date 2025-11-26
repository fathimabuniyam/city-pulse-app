const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,

  {
    ignores: ['node_modules/', 'android/', 'ios/', 'dist/'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      globals: {
        node: true,
        es2021: true,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },

    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-native': require('eslint-plugin-react-native'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
      import: require('eslint-plugin-import'),
      json: require('eslint-plugin-json'),
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },

    rules: {
      'linebreak-style': 0,
      'react/react-in-jsx-scope': 'off',
      'no-restricted-exports': 'off',
      'import/prefer-default-export': 'off',
      'max-lines': ['warn', { max: 250 }],
      'react/no-array-index-key': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'no-param-reassign': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'block', next: 'block-like' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-constant-condition': 'error',
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
      'import/no-unused-modules': ['warn', { unusedExports: true }],
      'import/newline-after-import': ['error', { count: 1 }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-typos': 'error',
      'react/style-prop-object': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'no-return-await': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-props-no-multi-spaces': 'warn',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react-native/no-inline-styles': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'no-nested-ternary': 'off',
      'no-use-before-define': ['error', { functions: false, variables: false }],
    },
  },

  {
    files: ['*.json'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]);
