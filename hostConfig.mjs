import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envHost = process.env.HOST;
export const hostConfigFileName = 'host-config.json';
const hostConfigFilePath = join(__dirname, hostConfigFileName);

if (envHost) {
  const hostConfigsDir = join(__dirname, `host-configs`);

  if (fs.existsSync(hostConfigsDir)) {
    const projectConfigFilePath = join(hostConfigsDir, `${envHost}.json`);
    const content = '' + fs.readFileSync(projectConfigFilePath);

    if (!content) throw 'incorrect HOST env variable value';

    fs.writeFileSync(hostConfigFilePath, JSON.stringify({ ...JSON.parse(content), host: envHost }, null, 2));
  }
}

const hostContent = '' + fs.readFileSync(hostConfigFilePath);
if (!hostContent) throw 'host-config.json file is empty';
const { host, ip, isUpdateAllStarts } = JSON.parse(hostContent);

export const hostConfig = {
  isUpdateAllStarts,
  host,
  ip,
  url: `https://${host}`,
};

const text = ` ${host} - ${ip} `;
const fullLen = text.length * 3;
const slashes = '/'.repeat(text.length);

console.info(`${'/'.repeat(fullLen)}\n${slashes}${text}${slashes}\n${'/'.repeat(fullLen)}`);
