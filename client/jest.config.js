module.exports = {
  displayName: 'client',
  modulePaths: ['<rootDir>/src', '<rootDir>/src/__tests__'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'scss'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/__tests__/setupTests'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$':
      '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    '\\.(s?css|less)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!./jest.config.js',
  ],
};
