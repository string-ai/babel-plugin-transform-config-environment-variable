"use strict";

var loadEnv = require('config').loadEnv;
var configValues = null;

function getEnv() {
  var env = loadEnv();
  console.log('babel plugin getEnv() -> env: ', env);
  return env;
}

module.exports = function({ types: t }) {
  return {
    name: "transform-config-environment-variable",
    visitor: {
      MemberExpression(path) {
        if (path.get("object").matchesPattern("process.env")) {
          var key = path.toComputedKey();
          if (t.isStringLiteral(key) && key.value === 'PARKING_ENV') {
            try{
              var env = getEnv();
              console.log('[babel-plugin- transform-config-environment-variable] - replacing process.env.PARKING_ENV with -> ' + env);
              path.replaceWith(t.valueToNode(env));
            } catch(e) {
              console.log('error invoking getEnv() - error: ', e);
            }
          }
        }
      },
    },
  };
};
