import { MyFileType } from 'shared/api';
import { BackgroundNameType } from '../selectors/BackgroundSelector';
import { filesStorage } from './storage';

export const takeInteractiveFileBackground = async (
  background: BackgroundNameType,
  cb: (type: MyFileType, src: string) => void,
  notFoundCb: () => void,
) => {
  const [type, fileName] = background.split('/') as [MyFileType, string];

  const files = await filesStorage.get(type);

  if (files == null || files[fileName] == null) {
    notFoundCb();
    return;
  }

  const file = files[fileName];

  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => cb(type, '' + reader.result);

  return type;
};
