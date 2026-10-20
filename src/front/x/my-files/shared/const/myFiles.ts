import { translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { MyFileType } from '../model/enums';

export const myFilesConfig: {
  [Type in MyFileType]: {
    type: Type;
    title: string;
    single: string;
    icon: KnownStameskaIconName;
    ext: Set<string>;
  };
} = {
  [MyFileType.Image]: {
    type: MyFileType.Image,
    get title() {
      return translateBase(BaseLocaleKey.MyFilesTypesImages);
    },
    get single() {
      return translateBase(BaseLocaleKey.MyFilesTypesImage);
    },
    icon: 'Image02',
    ext: new Set(['jpeg', 'jpg', 'png', 'gif', 'svg']),
  },
  [MyFileType.Video]: {
    type: MyFileType.Video,
    get title() {
      return translateBase(BaseLocaleKey.MyFilesTypesVideo);
    },
    get single() {
      return translateBase(BaseLocaleKey.MyFilesTypesVideoFile);
    },
    icon: 'ComputerVideo',
    ext: new Set(['mp4']),
  },
  [MyFileType.Font]: {
    type: MyFileType.Font,
    get title() {
      return translateBase(BaseLocaleKey.MyFilesTypesFonts);
    },
    get single() {
      return translateBase(BaseLocaleKey.MyFilesTypesFontFile);
    },
    icon: 'TextAlignLeft',
    ext: new Set(['ttf', 'otf']),
  },
  [MyFileType.Other]: {
    type: MyFileType.Other,
    get title() {
      return translateBase(BaseLocaleKey.MyFilesTypesOther);
    },
    get single() {
      return translateBase(BaseLocaleKey.MyFilesTypesFile);
    },
    icon: 'MoreVerticalCircle01',
    ext: new Set<string>([]),
  },
};
