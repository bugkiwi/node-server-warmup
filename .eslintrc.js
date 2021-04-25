module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    env: {
        node: true,
        'jest/globals': true
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        'prettier/prettier': 'error'
    }
};
