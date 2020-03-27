const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    postcssPresetEnv({ stage: 0 }),
    cssnano({
      preset: `default`,
    }),
  ],
};
