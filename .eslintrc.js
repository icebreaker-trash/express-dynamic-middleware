module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["@nuxtjs"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "rules": {}
};