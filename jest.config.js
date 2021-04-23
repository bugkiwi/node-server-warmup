module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  roots: ["<rootDir>/tests/"],
  testEnvironment: "node",
  collectCoverage: true
};
