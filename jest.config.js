/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'test/tsconfig.json',
      },
    ],
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts)$',
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/parse/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
