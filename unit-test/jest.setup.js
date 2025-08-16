// Jest setup file for additional configuration

// Extend Jest matchers if needed
// require('jest-extended');

// Set timezone for consistent date testing
process.env.TZ = 'UTC';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods if needed for cleaner test output
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };
