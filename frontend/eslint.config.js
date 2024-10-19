module.exports = {
  env: {
      node: true,   // Allows Node.js global variables and modules
      es6: true     // Supports ES6 features
  },
  extends: "eslint:recommended",
  parserOptions: {
      ecmaVersion: 2021  // Specifies ECMAScript version to 2021
  },
  rules: {
      // Add any custom ESLint rules here
  }
};
