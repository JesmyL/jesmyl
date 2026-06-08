import { CmComOrderWid, CmComWid, IExportableCom, OrderRepeats } from 'shared/api/complect/apps';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export type CmEditComOrderTsjrpcModel = {
  setRepeats: (args: { comw: CmComWid; ordw: CmComOrderWid; value: OrderRepeats }) => IExportableCom;

  clearOwnRepeats: (args: { ordw: CmComOrderWid; comw: CmComWid }) => IExportableCom;

  setKind: (args: {
    ordw: CmComOrderWid;
    comw: CmComWid;
    kind: CmComBlockKindKey;
    newTypeTitle: string;
  }) => IExportableCom;

  bindChordBlock: (args: { ordw: CmComOrderWid; comw: CmComWid; chordi: number }) => IExportableCom;

  toggleVisibility: (args: { ordw: CmComOrderWid; comw: CmComWid }) => IExportableCom;

  toggleAnchorInheritVisibility: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    inhi: number;
    leadOrderTitle: string;
  }) => IExportableCom;

  moveOrdAfter: (args: {
    ordw: CmComOrderWid;
    orderTitle: string;
    comw: CmComWid;
    insertAfterOrdwOrFirst: CmComOrderWid | nil;
  }) => IExportableCom;

  addAnchorOrder: (args: {
    orderTitle: string;
    comw: CmComWid;
    targetOrdw: CmComOrderWid;
    insertAfterOrdw: CmComOrderWid;
  }) => IExportableCom;

  setTexti: (args: { comw: CmComWid; ordw: CmComOrderWid; texti: number }) => IExportableCom;
  toggleVisibilityInMiniMode: (args: { comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;
  toggleTitleVisibility: (args: { comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;
  remove: (args: { comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;

  insertNewBlock: (args: {
    comw: CmComWid;
    orderTitle: string;
    insertAfterOrdwOrFirst: CmComOrderWid | nil;
    chordi: number;
    kind: CmComBlockKindKey;
    texti: number | und;
  }) => IExportableCom;

  setPositionsLine: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    linei: number;
    line: number[];
    lineChangesText: string;
  }) => IExportableCom;

  trimOverPositions: (args: { comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;

  setModulationValue: (args: { comw: CmComWid; ordw: CmComOrderWid; value: number }) => IExportableCom;

  removeRepeats: (args: { comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;
};
