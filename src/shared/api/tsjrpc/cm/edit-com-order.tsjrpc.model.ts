import { CmComOrderWid, CmComWid, OrderRepeats } from 'shared/api/complect/apps';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export type CmEditComOrderTsjrpcModel = {
  setRepeats: (args: { comw: CmComWid; ordw: CmComOrderWid; value: OrderRepeats }) => CmComWid;

  clearOwnRepeats: (args: { ordw: CmComOrderWid; comw: CmComWid }) => CmComWid;

  setKind: (args: { ordw: CmComOrderWid; comw: CmComWid; kind: CmComBlockKindKey; newTypeTitle: string }) => CmComWid;

  bindChordBlock: (args: { ordw: CmComOrderWid; comw: CmComWid; chordi: number }) => CmComWid;

  toggleVisibility: (args: { ordw: CmComOrderWid; comw: CmComWid }) => CmComWid;

  toggleAnchorInhVis: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;

  moveOrdAfter: (args: {
    ordw: CmComOrderWid;
    orderTitle: string;
    comw: CmComWid;
    insertAfterOrdwOrFirst: CmComOrderWid | nil;
  }) => CmComWid;

  addAnchorOrder: (args: {
    orderTitle: string;
    comw: CmComWid;
    targetOrdw: CmComOrderWid;
    insertAfterOrdw: CmComOrderWid;
  }) => CmComWid;

  setTexti: (args: { comw: CmComWid; ordw: CmComOrderWid; texti: number }) => CmComWid;
  toggleVisibilityInMiniMode: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;
  toggleTitleVisibility: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;
  remove: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;

  insertNewBlock: (args: {
    comw: CmComWid;
    orderTitle: string;
    insertAfterOrdwOrFirst: CmComOrderWid | nil;
    chordi: number;
    kind: CmComBlockKindKey;
    texti: number | und;
  }) => CmComWid;

  setPositionsLine: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    linei: number;
    line: number[];
    lineChangesText: string;
  }) => CmComWid;

  trimOverPositions: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;

  setModulationValue: (args: { comw: CmComWid; ordw: CmComOrderWid; value: number }) => CmComWid;

  removeRepeats: (args: { comw: CmComWid; ordw: CmComOrderWid }) => CmComWid;
};
