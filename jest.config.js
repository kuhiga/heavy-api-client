module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./tests"],
  testMatch: ["**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ["src/**/*.ts", "!src/types.ts"],
};
