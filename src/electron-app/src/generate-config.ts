import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../builder.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '../builder.config.json');

fs.writeFileSync(outputPath, JSON.stringify(config, null, 2), 'utf-8');
