import { backConfig } from 'back/config/backConfig';
import fs, { StatsListener } from 'fs';
import { itIt } from 'shared/utils';

const registeredPaths = new Set<string>();

const initialFileDir = `${__dirname}${backConfig.fileStoreDir}`;

export class FileStore<Value> {
  private value: Value;
  private filePath = '';

  constructor(
    path: `/${string}`,
    private defaultValue: Value,
  ) {
    this.filePath = `${initialFileDir}${path}`;
    this.value = this.readValue(defaultValue);
    if (registeredPaths.has(path)) throw new Error(`The path ${path} was registered again`);
    registeredPaths.add(path);
  }

  private readValue(defaultValue: Value) {
    try {
      return JSON.parse('' + fs.readFileSync(this.filePath));
    } catch (_error) {
      return defaultValue;
    }
  }

  private writeValue(value: Value) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(value));
      return true;
    } catch (_error) {
      try {
        const splits = this.filePath.split('/');
        let prev = splits[0] === '' ? '/' : '';

        splits
          .filter(itIt)
          .slice(0, -1)
          .forEach(pathPart => {
            const path = `${prev}${pathPart}`;
            if (!fs.existsSync(path)) fs.mkdirSync(path);
            prev = `${path}/`;
          });

        fs.writeFileSync(this.filePath, JSON.stringify(value));

        return true;
      } catch (_error) {
        return false;
      }
    }
  }

  getValue(): Value {
    return this.value;
  }

  getValueWithAutoSave(): Value {
    Promise.resolve().then(() => this.saveValue());
    return this.value;
  }

  setValue(value: Value) {
    this.value = value;
    this.writeValue(value);
  }

  saveValue() {
    this.writeValue(this.value);
  }

  fileModifiedAt = (): number => {
    try {
      return fs.statSync(this.filePath).mtime.getTime();
    } catch (_error) {
      this.saveValue();
      if (this.watchFileTries-- < 0) return 0;
      return this.fileModifiedAt();
    }
  };

  private watchFileTries = 2;

  watchFile(cb: (value: Value, ...args: Parameters<StatsListener>) => void) {
    try {
      fs.watchFile(this.filePath, (curr, prev) => {
        this.value = this.readValue(this.defaultValue);
        cb(this.value, curr, prev);
      });
    } catch (_error) {
      this.saveValue();
      if (this.watchFileTries-- < 0) return;
      this.watchFile(cb);
    }
  }
}
