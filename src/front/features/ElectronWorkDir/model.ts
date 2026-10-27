import { ComponentType } from 'react';
import { ElectronWorkDirFile } from 'shared/api/tsjrpc.electtron/basic';
import { MyFileId } from 'x/my-files';

export type ElectronWorkDirProps = {
  /** Called with the WorkDir file path after a preview is clicked (apply as broadcast background). */
  onApplyBg?: (filePath: string) => void;
  /** WorkDir file path currently applied as broadcast background — its tile is highlighted. */
  bgFilePath?: string | nil;
  /** Font applied to the current screen config — the dropdown is rendered only when `onApplyFont` is passed. */
  fontFileId?: MyFileId | nil;
  onApplyFont?: (fileId: MyFileId) => void;
  /** Renders a pptx slide-1 thumbnail — the WorkDir feature stays unaware of presentation parsing. */
  PptxPreview?: ComponentType<{ file: ElectronWorkDirFile }>;
  /** Called when a pptx tile is clicked; only pptx tiles become clickable through this handler. */
  onPptxOpen?: (filePath: string) => void;
};
