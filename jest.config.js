/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverage: false,
  // TODO coverage is not currently working, not sure if it's a windows bug
  // collectCoverageFrom: ['**.*.ts'],
  // coverageDirectory: '../coverage',
  // coverageReporters: ['text-summary', 'json-summary', 'lcov'],
  // coverageThreshold: {
  //   global: {
  //     statements: 0,
  //     branches: 0,
  //     functions: 0,
  //     lines: 0,
  //   }
  // },
  testEnvironment: 'node',
};