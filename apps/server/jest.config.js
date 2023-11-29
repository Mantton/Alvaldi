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
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  globalSetup: "./src/__tests__/processors/setup.ts",
  globalTeardown: "./src/__tests__/processors/teardown.ts",
  transform: {
    "^.+\\.ts": [
      "ts-jest",
      {
        babel: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
