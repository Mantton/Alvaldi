/* eslint-disable no-undef */
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  forceExit: true,
  verbose: true,
  detectOpenHandles: true,
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1", // Reference : https://stackoverflow.com/a/51606090
  },
};
