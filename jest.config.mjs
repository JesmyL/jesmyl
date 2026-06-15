import fs from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json'));

// const namesDict = {};
// Object.entries(tsConfig.compilerOptions.paths).forEach(([key, value]) => {
//   namesDict[`^${key.slice(0, -1)}(.*)$`] = `<rootDir>${value.slice(1, -1)}$1`;
// });

// console.log(namesDict);

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
