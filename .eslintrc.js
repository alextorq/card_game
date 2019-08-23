module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "quotes": [2, "single", { "avoidEscape": true }],
        "no-multiple-empty-lines": [1, {"max": 2}],
        "semi": [2, "always"]
    }
};