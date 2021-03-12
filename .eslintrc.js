module.exports = {
  'extends': [
    'react-app',
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended'
  ],
  'rules': {
    '@typescript-eslint/no-explicit-any': [
      'off'
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error'
    ],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.tsx'
        ]
      }
    ],
  },
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.ts',
          '.tsx'
        ]
      }
    }
  }
};
