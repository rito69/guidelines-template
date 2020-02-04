module.exports = {
  plugins: ["stylelint-scss"],
  extends: ["stylelint-config-standard", "stylelint-config-recess-order", "../node_modules/stylelint-prettier/recommended"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "declaration-empty-line-before": [
      "never",
      {
        ignore: ["after-comment"]
      }
    ],
    "at-rule-empty-line-before": [
      "never",
      {
        ignore: ["after-comment"],
        ignoreAtRules: ["mixin", "function", "keyframes", "media", "font-face"]
      }
    ],
    "max-line-length": null,
    "no-descending-specificity": null,
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "font-family-no-missing-generic-family-keyword": null,
    "at-rule-no-vendor-prefix": true,
    "function-name-case": null,
    "string-quotes": "double",
    "prettier/prettier": [true, { printWidth: 240 }]
  }
};
