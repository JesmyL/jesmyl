export interface IExportableStyleProp {
  key: string;
  title: string[];
  isInherit?: boolean;
  group?: number;
  tags?: string[];
  isModulation?: boolean;
  forChordedBlock?: number;
  isHeaderNoneForce?: boolean;
  isBlockForTextableOnly?: boolean;
  isBlockForChordedOnly?: boolean;
}

export interface IExportableSetts {
  styles: IExportableStyleProp[];
}
