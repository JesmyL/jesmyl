import { __productionEnvironment__ } from './environment.prod';
import { __testEnvironment__ } from './environment.tests';

export let environment = __productionEnvironment__;
environment = __productionEnvironment__;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') environment = __testEnvironment__;
