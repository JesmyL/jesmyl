import { CmComOrderWid, CmComWid, IExportableCom, OrderRepeats } from 'shared/api/complect/apps';
import { CmBlockStyleKey } from 'shared/values/cm/block-styles/BlockStyles.model';

export type CmEditComOrderTsjrpcModel = {
  setRepeats: (args: {
    ordw: CmComOrderWid;
    orderTitle: string;
    comw: CmComWid;
    inhIndex?: number;
    value: OrderRepeats;
    textValue: string;
  }) => IExportableCom;

  clearOwnRepeats: (args: { ordw: CmComOrderWid; orderTitle: string; comw: CmComWid }) => IExportableCom;

  setType: (args: {
    ordw: CmComOrderWid;
    orderTitle: string;
    comw: CmComWid;
    type: CmBlockStyleKey;
    newTypeTitle: string;
  }) => IExportableCom;

  bindChordBlock: (args: {
    ordw: CmComOrderWid;
    orderTitle: string;
    comw: CmComWid;
    chordi: number;
    isAnchor: num;
  }) => IExportableCom;

  toggleVisibility: (args: { ordw: CmComOrderWid; orderTitle: string; comw: CmComWid }) => IExportableCom;

  toggleAnchorInheritVisibility: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    anchorInheritIndex: number;
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

  setTexti: (args: { orderTitle: string; comw: CmComWid; ordw: CmComOrderWid; texti: number }) => IExportableCom;
  toggleVisibilityInMiniMode: (args: { orderTitle: string; comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;
  toggleTitleVisibility: (args: { orderTitle: string; comw: CmComWid; ordw: CmComOrderWid }) => IExportableCom;
  remove: (args: { orderTitle: string; comw: CmComWid; ordw: CmComOrderWid; isAnchor: boolean }) => IExportableCom;

  insertNewBlock: (args: {
    comw: CmComWid;
    orderTitle: string;
    insertAfterOrdwOrFirst: CmComOrderWid | nil;
    chordi: number;
    type: CmBlockStyleKey;
    texti: number | und;
  }) => IExportableCom;

  setPositionsLine: (args: {
    comw: CmComWid;
    orderTitle: string;
    ordw: CmComOrderWid;
    linei: number;
    line: number[];
    lineChangesText: string;
  }) => IExportableCom;

  trimOverPositions: (args: { comw: CmComWid; orderTitle: string; ordw: CmComOrderWid }) => IExportableCom;

  setModulationValue: (args: {
    comw: CmComWid;
    orderTitle: string;
    ordw: CmComOrderWid;
    value: number;
  }) => IExportableCom;

  removeRepeats: (args: { comw: CmComWid; orderTitle: string; ordw: CmComOrderWid }) => IExportableCom;
};
