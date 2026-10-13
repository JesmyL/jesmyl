import { MyFileBoxId } from 'x/my-files';

export type ElectronWorkDirProps = {
  /** Called with the MyFiles box id after a preview is clicked (apply as broadcast background). */
  onApplyBg?: (boxId: MyFileBoxId) => void;
};
