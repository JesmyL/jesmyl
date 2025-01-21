import fs from 'fs';
import { itIt } from 'shared/utils';

type Modifieds = Record<string, number>;
const registeredPaths = new Set<string>();

export class FileStore<Value> {
  private value: Value;
  private modifiedTimeStampDict?: Modifieds;
  private filePath = '';

  constructor(path: `/${string}`, defaultValue: Value) {
    this.filePath = `${__dirname}${path}`;
    this.value = this.readValue(defaultValue);
    if (registeredPaths.has(path)) throw new Error(`The path ${path} was registered again`);
    registeredPaths.add(path);
  }

  private readModifiedsDict(): Modifieds {
    return this.readValue({} as never, `${this.filePath}.modifieds`);
  }

  private saveModifiedsDict() {
    this.writeValue(this.modifiedTimeStampDict as never, `${this.filePath}.modifieds`);
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

  setValue(value: Value) {
    this.value = value;
    this.writeValue(value);
  }

  saveValue() {
    this.writeValue(this.value);
  }

  getFileModifiedAt = () => fs.statSync(this.filePath).mtime.getTime();

  setModifiedTimeStamp(key: string) {
    this.modifiedTimeStampDict ??= this.readModifiedsDict();
    const mod = (this.modifiedTimeStampDict[key] = Date.now() + Math.random());
    this.saveModifiedsDict();
    return mod;
  }

  getModifiedTimeStamp(key: string) {
    this.modifiedTimeStampDict ??= this.readModifiedsDict();
    return this.modifiedTimeStampDict[key];
  }

  getModifiedTimeStampDict() {
    return (this.modifiedTimeStampDict ??= this.readModifiedsDict());
  }
}
