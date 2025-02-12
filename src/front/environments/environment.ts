import { __productionEnvironment__ } from './environment.prod';
import { __testEnvironment__ } from './environment.tests';

const isDevelopmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const environment = isDevelopmentMode ? __testEnvironment__ : __productionEnvironment__;
