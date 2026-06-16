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
    title: 'Картинки',
    single: 'изображение',
    icon: 'Image02',
    ext: new Set(['jpeg', 'jpg', 'png', 'gif', 'svg']),
  },
  [MyFileType.Video]: {
    type: MyFileType.Video,
    title: 'Видео',
    single: 'видео-файл',
    icon: 'ComputerVideo',
    ext: new Set(['mp4']),
  },
  [MyFileType.Font]: {
    type: MyFileType.Font,
    title: 'Шрифты',
    single: 'файл шрифтов',
    icon: 'TextAlignLeft',
    ext: new Set(['ttf', 'otf']),
  },
  [MyFileType.Other]: {
    type: MyFileType.Other,
    title: 'Другие',
    single: 'файл',
    icon: 'MoreVerticalCircle01',
    ext: new Set<string>([]),
  },
};
