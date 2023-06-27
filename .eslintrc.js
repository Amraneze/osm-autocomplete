module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:react/recommended",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    //sourceType: "module",
    files: ['*.ts', '*.tsx'],
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  globals: {
    "localStorage": true,
    "window": true,
    "HTMLElement": true
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-prettier",
    "react",
    "jsx-a11y",
    "import",
    "prettier",
    "risxss",
    "no-loops",
  ],
  rules: {
    "prettier/prettier": "error",
    "no-loops/no-loops": 2,
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    "react/no-array-index-key": 2,
    "risxss/catch-potential-xss-react": "error",
    "import/no-extraneous-dependencies": [
      "error",
      { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }
    ],
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/naming-convention": [
        "error",
        {
            "selector": "interface",
            "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        }
    ],
    "consistent-return": "off"
  },
};