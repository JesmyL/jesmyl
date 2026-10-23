import { MyFileType } from './enums';

export const enum MyFileBoxId {
  roboto = 1,
  exo2 = 2,
  comfortaa = 3,
  play = 4,
  montserrat = 5,
}

/** Bundled fonts use numeric ids, uploaded files keep their md5 string id. */
export type MyFileId = MyFileBoxId | string;

export const bundledFontFamilies = new Map<MyFileBoxId, { src: string; title: string }>([
  [MyFileBoxId.roboto, { src: '/resource/roboto.ttf', title: 'Roboto' }],
  [MyFileBoxId.exo2, { src: '/resource/exo2.ttf', title: 'Exo 2' }],
  [MyFileBoxId.comfortaa, { src: '/resource/comfortaa.ttf', title: 'Comfortaa' }],
  [MyFileBoxId.play, { src: '/resource/play.ttf', title: 'Play' }],
  [MyFileBoxId.montserrat, { src: '/resource/montserrat.ttf', title: 'Montserrat' }],
]);

export type MyFileBox = {
  id: MyFileId;
  type: MyFileType;
  file: File;
};
