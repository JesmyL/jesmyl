import { backConfig } from 'back/config/backConfig';
import fs, { StatsListener } from 'fs';
import { smylib } from 'shared/utils';

const registeredPaths = new Set<string>();

const initialFileDir = `${__dirname}${backConfig.fileStoreDir}`;

export class FileStore<Value> {
  private value: Value;
  private filePath = '';

  getValue: () => Value;

  constructor(
    path: `/${string}`,
    private defaultValue: Value,
  ) {
    this.filePath = `${initialFileDir}${path}`;
    this.value = defaultValue;
    if (registeredPaths.has(path)) throw new Error(`The path ${path} was registered again`);
    registeredPaths.add(path);

    this.getValue = () => {
      this.getValue = () => this.value;

      return (this.value = this.readValue(defaultValue));
    };
  }

  private readValue = (defaultValue: Value): Value => {
    try {
      return JSON.parse('' + fs.readFileSync(this.filePath));
    } catch (_error) {
      return defaultValue;
    }
  };

  private writeValue = (value: Value) => {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(value));
      return true;
    } catch (_error) {
      try {
        this.makePath();
        fs.writeFileSync(this.filePath, JSON.stringify(value));

        return true;
      } catch (_error) {
        return false;
      }
    }
  };

  makePath = () => {
    const splits = this.filePath.split('/');
    let prev = splits[0] === '' ? '/' : '';

    splits
      .filter(it => it)
      .slice(0, -1)
      .forEach(pathPart => {
        const path = `${prev}${pathPart}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        prev = `${path}/`;
      });
  };

  modifyValueWithAutoSave = <RetVal>(tryModify: (value: Value) => RetVal): { result: RetVal; mod: number } => {
    const result = tryModify(this.getValue());
    this.saveValue();
    return { result, mod: this.fileModifiedAt() };
  };

  setValue = (val: Value | ((value: Value) => Value)) => {
    const value = smylib.isFunc(val) ? val(this.getValue()) : val;

    this.value = value;
    this.writeValue(value);
  };

  updateValue = (updater: (value: Value) => Value) => {
    this.value = updater(this.getValue());
    this.writeValue(this.getValue());
  };

  saveValue = (value?: Value) => {
    this.writeValue(value ?? this.getValue());
  };

  fileModifiedAt = (): number => {
    try {
      return fs.statSync(this.filePath).mtime.getTime();
    } catch (_error) {
      this.saveValue();
      if (this.watchFileTries-- < 0) return 0;
      return this.fileModifiedAt();
    }
  };

  deleteFile = () => fs.rmSync(this.filePath);

  private watchFileTries = 2;

  watchFile = (cb: (value: Value, ...args: Parameters<StatsListener>) => void) => {
    try {
      fs.watchFile(this.filePath, (curr, prev) => {
        this.value = this.readValue(this.defaultValue);
        cb(this.getValue(), curr, prev);
      });
    } catch (_error) {
      this.saveValue();
      if (this.watchFileTries-- < 0) return this;
      this.watchFile(cb);
    }

    return this;
  };
}
