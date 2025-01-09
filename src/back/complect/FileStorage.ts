import fs from 'fs';

export class FileStore<Value> {
  private value: Value;
  private writeValueTimeout: TimeOut;

  constructor(
    private path: string,
    defaultValue: Value,
  ) {
    this.path = `${__dirname}${this.path}`;
    this.value = this.readValue(defaultValue);
  }

  private readValue(defaultValue: Value) {
    try {
      return JSON.parse('' + fs.readFileSync(this.path));
    } catch (error) {
      return defaultValue;
    }
  }

  private writeValue(value: Value) {
    try {
      clearTimeout(this.writeValueTimeout);
      this.writeValueTimeout = setTimeout(() => {
        fs.writeFile(this.path, JSON.stringify(value), () => {});
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
}
