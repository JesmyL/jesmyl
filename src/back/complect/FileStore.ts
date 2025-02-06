import fs, { StatsListener } from 'fs';
import { itIt } from 'shared/utils';

const registeredPaths = new Set<string>();

export class FileStore<Value> {
  private value: Value;
  private filePath = '';

  constructor(
    path: `/${string}`,
    private defaultValue: Value,
  ) {
    this.filePath = `${__dirname}${path}`;
    this.value = this.readValue(defaultValue);
    if (registeredPaths.has(path)) throw new Error(`The path ${path} was registered again`);
    registeredPaths.add(path);
  }

  private readValue(defaultValue: Value, filePath = this.filePath) {
    try {
      return JSON.parse('' + fs.readFileSync(filePath));
    } catch (error) {
      return defaultValue;
    }
  }

  private writeValue(value: Value, filePath = this.filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(value));
      return true;
    } catch (error) {
      try {
        let prev = '/';

        filePath
          .split('/')
          .filter(itIt)
          .slice(0, -1)
          .forEach(pathPart => {
            const path = `${prev}${pathPart}`;
            if (!fs.existsSync(path)) fs.mkdirSync(path);
            prev = `${path}/`;
          });

        fs.writeFileSync(filePath, JSON.stringify(value));

        return true;
      } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      this.saveValue();
      if (this.watchFileTries-- < 0) return;
      this.watchFile(cb);
    }
  }
}
