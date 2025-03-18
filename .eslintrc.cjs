module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['import', 'simple-import-sort'],
  rules: {
    'vue/return-in-computed-property': 'off',
    'vue/no-v-html': 'off',
    // Enforce a specific order for imports
    'import/order': 'off', // Disable this in favor of simple-import-sort
    'simple-import-sort/imports': 'warn', // Sort imports in a logical order
    'simple-import-sort/exports': 'warn', // Sort exports if multiple
  }
}
