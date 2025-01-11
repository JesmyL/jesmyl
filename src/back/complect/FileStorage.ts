import fs from 'fs';

type Modifieds = Record<string, number>;

export class FileStore<Value> {
  private value: Value;
  private writeValueTimeout: Record<string, TimeOut> = {};
  private modifiedTimeStampDict?: Modifieds;
  private filePath = '';

  constructor(
    private path: string,
    defaultValue: Value,
  ) {
    this.filePath = `${__dirname}${this.path}`;
    fs.chmodSync(this.filePath, 0o777);
    this.value = this.readValue(defaultValue);
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
      clearTimeout(this.writeValueTimeout[filePath]);
      this.writeValueTimeout[filePath] = setTimeout(() => {
        fs.writeFileSync(filePath, JSON.stringify(value));
      }, 10);
      return true;
    } catch (error) {
      return false;
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

  setModifiedTimeStamp(key: string | null) {
    this.modifiedTimeStampDict ??= this.readModifiedsDict();
    const mod = (this.modifiedTimeStampDict[key ?? this.path] = Date.now() + Math.random());
    this.saveModifiedsDict();
    return mod;
  }

  getModifiedTimeStamp(key: string | null) {
    this.modifiedTimeStampDict ??= this.readModifiedsDict();
    return this.modifiedTimeStampDict[key ?? this.path];
  }

  getModifiedTimeStampDict() {
    return (this.modifiedTimeStampDict ??= this.readModifiedsDict());
  }
}
