import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { makeSubHost } from './src/shared/utils/makeSubHost';

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
if (!hostContent) throw `${hostConfigFileName} file is empty`;
const { host, ip, subdomain } = JSON.parse(hostContent) as {
  host: string;
  ip: string;
  subdomain?: string | null;
};

export const hostConfig = {
  host,
  ip,
  url: `https://${host}`,
  subHost: makeSubHost(host, subdomain),
};

const text = ` ${host} - ${ip} `;
const fullLen = text.length * 3;
const slashes = '/'.repeat(text.length);

console.info(`${'/'.repeat(fullLen)}\n${slashes}${text}${slashes}\n${'/'.repeat(fullLen)}`);
