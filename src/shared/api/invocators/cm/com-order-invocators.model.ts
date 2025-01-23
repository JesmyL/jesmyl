import { CmComOrderWid, CmComWid, IExportableCom, OrderRepeats } from 'shared/api/complect/apps';

export type CmComOrderSokiInvocatorModel = {
  setRepeats: (
    ordw: CmComOrderWid,
    orderTitle: string,
    comw: CmComWid,
    value: OrderRepeats,
    textValue: string,
  ) => IExportableCom;

  clearOwnRepeats: (ordw: CmComOrderWid, orderTitle: string, comw: CmComWid, value: und) => IExportableCom;

  setType: (
    ordw: CmComOrderWid,
    orderTitle: string,
    comw: CmComWid,
    type: string,
    newTypeTitle: string,
  ) => IExportableCom;

  bindChordBlock: (
    ordw: CmComOrderWid,
    orderTitle: string,
    comw: CmComWid,
    chordi: number,
    isAnchor: num,
  ) => IExportableCom;

  toggleVisibility: (ordw: CmComOrderWid, orderTitle: string, comw: CmComWid) => IExportableCom;

  toggleAnchorInheritVisibility: (
    comw: CmComWid,
    leadOrderWid: CmComOrderWid,
    anchorInheritIndex: number,
    leadOrderTitle: string,
  ) => IExportableCom;

  moveOrdAfter: (
    ordw: CmComOrderWid,
    orderTitle: string,
    comw: CmComWid,
    insertAfterOrdwOrFirst: CmComOrderWid | nil,
  ) => IExportableCom;

  addAnchorOrder: (
    orderTitle: string,
    comw: CmComWid,
    targetOrdw: CmComOrderWid,
    insertAfterOrdw: CmComOrderWid,
  ) => IExportableCom;

  setTexti: (orderTitle: string, comw: CmComWid, ordw: CmComOrderWid, texti: number) => IExportableCom;
  toggleVisibilityInMiniMode: (orderTitle: string, comw: CmComWid, ordw: CmComOrderWid) => IExportableCom;
  toggleTitleVisibility: (orderTitle: string, comw: CmComWid, ordw: CmComOrderWid) => IExportableCom;
  remove: (orderTitle: string, comw: CmComWid, ordw: CmComOrderWid, isAnchor: boolean) => IExportableCom;

  insertNewBlock: (
    comw: CmComWid,
    orderTitle: string,
    insertAfterOrdwOrFirst: CmComOrderWid | nil,
    chordi: number,
    type: string,
    texti: number | und,
  ) => IExportableCom;

  setPositionsLine: (
    comw: CmComWid,
    orderTitle: string,
    ordw: CmComOrderWid,
    linei: number,
    line: number[],
    lineChangesText: string,
  ) => IExportableCom;

  setModulationValue: (comw: CmComWid, orderTitle: string, ordw: CmComOrderWid, value: number) => IExportableCom;
  removeRepeats: (comw: CmComWid, orderTitle: string, ordw: CmComOrderWid) => IExportableCom;
};
