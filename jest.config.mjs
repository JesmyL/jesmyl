import fs from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json'));

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',

    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
