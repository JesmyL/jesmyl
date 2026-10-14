export type ElectronWorkDirProps = {
  /** Called with the WorkDir file path after a preview is clicked (apply as broadcast background). */
  onApplyBg?: (filePath: string) => void;
  /** WorkDir file path currently applied as broadcast background — its tile is highlighted. */
  bgFilePath?: string;
};
