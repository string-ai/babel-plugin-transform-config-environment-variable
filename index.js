"use strict";

var configValues = null;
function getEnv() {
  if (!configValues) {
    var config = require('config');
    configValues = config();
  }
  return configValues.env;
}

module.exports = function({ types: t }) {
  return {
    name: "transform-config-environment-variable",
    visitor: {
      MemberExpression(path) {
        if (path.get("object").matchesPattern("process.env.PARKING_ENV")) {
          console.log('found -> process.env.PARKING_ENV');
          var key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            var env = getEnv();
            console.log('replacing process.env.PARKING_ENV with ' + env);
            // path.replaceWith(t.valueToNode(process.env[key.value]));
            path.replaceWith(t.valueToNode(env));
          }
        }
      },
    },
  };
};
