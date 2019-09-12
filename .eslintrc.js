module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
    "prettier"
  ],
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',{
        "singleQuote": true,
        "semi": false,
      }
    ],
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off',
    "vue/html-self-closing": [
      "error", {
        "html": {
          "void": "always"
        }
      }
    ],
  }
}
