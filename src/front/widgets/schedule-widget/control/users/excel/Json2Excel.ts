import xlsx, { ISettings } from 'json-as-xlsx';

export interface J2XSheetColumn<Content> {
  label: string;
  value: keyof Content | ((value: Content) => string | number | boolean | Date | Content | null);
  format?: string;
}

export interface J2XSheet<Content> {
  sheet: string;
  columns: J2XSheetColumn<Content>[];
  content: Content[];
}

export class Json2Excel {
  static convert = <Content>(sheets: J2XSheet<Content>[], settings: ISettings) => xlsx(sheets as never, settings);
}
