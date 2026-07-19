const config = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,mjs,css}": ["prettier --write"],
};

export default config;
