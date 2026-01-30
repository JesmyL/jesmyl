import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import {
  CmComOrderWid,
  CmComWid,
  IExportableOrder,
  IServerSideCom,
  OrderRepeats,
  SpecialOrderRepeats,
} from 'shared/api';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifyCom } from './edit-com.tsjrpc.base';

export const cmEditComOrderServerTsjrpcBase =
  new (class CmEditComOrder extends TsjrpcBaseServer<CmEditComOrderTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
          clearOwnRepeats: modifyOrd((ord, { orderTitle, inhi }, { auth }, com) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

            const removeAllJoinRepeats = (ordRepeats: OrderRepeats | nil) => {
              if (!smylib.isObj(ordRepeats)) return;

              smylib.keys(ordRepeats).forEach(repeatKey => {
                const letter = repeatKey.match(makeRegExp('/[a-z]/'))?.[0];

                if (!letter) return;

                const deleteKeysWithLetter = (reps: SpecialOrderRepeats | nil) => {
                  if (reps == null || !smylib.isObj(reps)) return;

                  smylib.keys(reps).forEach(key => {
                    if (key.includes(letter)) delete reps[key];
                  });
                };

                com.o?.forEach(ord => {
                  if (smylib.isObj(ord.r)) {
                    deleteKeysWithLetter(ord.r);

                    if (!smylib.keys(ord.r).length) delete ord.r;
                  }

                  if (ord._r) {
                    const inheritRepeats = ord._r;
                    ord._r.forEach((inheritReps, inheritRepsi) => {
                      if (!smylib.isObj(inheritReps)) return;

                      deleteKeysWithLetter(inheritReps);

                      if (!smylib.keys(inheritReps).length) {
                        delete inheritRepeats[inheritRepsi];
                      }
                    });

                    while (ord._r.length && ord._r[ord._r.length - 1] == null) {
                      ord._r.pop();
                    }

                    if (!ord._r.length) delete ord._r;
                  }
                });
              });
            };

            if (inhi == null) {
              removeAllJoinRepeats(ord.r);
              clearNullableOrderInheritValues(ord, '_r');

              delete ord.r;
            } else if (ord._r?.[inhi] != null) {
              removeAllJoinRepeats(ord._r[inhi]);

              if (ord._r) {
                delete ord._r[inhi];

                clearNullableOrderInheritValues(ord, '_r');
              }
            }

            return `сброшено значение повторений для блока ${orderTitle}`;
          }),

          setRepeats: modifyOrd((ord, { value, inhi, orderTitle, textValue }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_REP', 'U')) throw '';

            if (inhi != null) {
              ord._r ??= [];
              ord._r[inhi] = value;

              clearNullableOrderInheritValues(ord, '_r');
            } else ord.r = value;

            return `изменены повторения для блока ${orderTitle}:\n\n${textValue}`;
          }),
          setKind: modifyOrd((ord, { kind, newTypeTitle, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';
            if (kind == null) throw 'Неизвестный тип';

            ord.k = kind;

            return `название блока ${orderTitle} изменено на ${newTypeTitle}`;
          }),
          bindChordBlock: modifyOrd((ord, { chordi, isAnchor, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.c = chordi;

            return `к ${isAnchor ? 'ссылке на блок' : 'блоку'} ${orderTitle} прикреплён ${chordi + 1}-й блок Аккордов`;
          }),

          toggleVisibility: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')) throw '';

            ord.v ??= 1;
            ord.v = ord.v ? 0 : 1;
            if (ord.v) delete ord.v;

            return `порядковый блок ${orderTitle} сделан ${ord.v ? '' : 'не'}видимым`;
          }),

          toggleAnchorInheritVisibility: modifyOrd((ord, { leadOrderTitle, inhi }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord._v ??= [];
            ord._v[inhi] = ord._v[inhi] === undefined ? 0 : undefined;

            clearNullableOrderInheritValues(ord, '_v');

            return `часть ссылки на ${leadOrderTitle} сделана ${ord._v?.[inhi] == null ? '' : 'не'}видимой`;
          }),

          moveOrdAfter: modifyCom((com, { insertAfterOrdwOrFirst, ordw, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            com.o ??= [];

            const movableOrdi = com.o.findIndex(o => o.w === ordw);
            const insertAfterOrdi =
              insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(o => o.w === insertAfterOrdwOrFirst);

            if (movableOrdi < 0) throw new Error('Целевой порядковый блок не найден');

            const [ord] = com.o.splice(movableOrdi, 1);
            com.o.splice(insertAfterOrdi + (movableOrdi < insertAfterOrdi ? 0 : 1), 0, ord);

            return `перемещён порядковый блок ${orderTitle}`;
          }),

          remove: modifyCom((com, { ordw, isAnchor, orderTitle }, { auth }) => {
            try {
              if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'D')) throw '';
            } catch (_) {
              if (com.w > Date.now() - 24 * 60 * 60 * 1000 && throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U'))
                throw '';
            }

            com.o ??= [];
            com.o = com.o.filter(ord => ord.w !== ordw && ord.a !== ordw);

            return `${isAnchor ? 'удалена ссылка на' : 'удалён'} ${orderTitle}`;
          }),

          addAnchorOrder: modifyCom((com, { insertAfterOrdw, targetOrdw, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            com.o ??= [];

            const targetOrdi = com.o.findIndex(o => o.w === targetOrdw);
            const insertAfterOrdi = com.o.findIndex(o => o.w === insertAfterOrdw);

            if (targetOrdi < 0) throw new Error('Целевой порядковый блок не найден');
            if (insertAfterOrdi < 0) throw new Error('Опорный порядковый блок не найден');
            if (insertAfterOrdi < targetOrdi) throw new Error('Целевой порядковый блок должен быть выше опорного');

            com.o.splice(insertAfterOrdi + 1, 0, {
              w: getNextOrdWid(com.o),
              a: targetOrdw,
            });

            return `создана ссылка ${orderTitle}`;
          }),

          setTexti: modifyOrd((ord, { texti, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.t = texti;

            return `к порядковому блоку ${orderTitle} прикреплён ${texti + 1} текст`;
          }),

          toggleVisibilityInMiniMode: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.o = ord.o ? undefined : 1;

            return `ссылка на блок ${orderTitle} сделана ${ord.o ? 'видимой' : 'невидимой'} в мини-режиме`;
          }),

          toggleTitleVisibility: modifyOrd((ord, { orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'U')) throw '';

            ord.e = ord.e ? undefined : 1;

            return `заголовок в порядковом блоке ${orderTitle} сделан ${ord.e ? 'видимым' : 'невидимым'}`;
          }),

          insertNewBlock: modifyCom((com, { insertAfterOrdwOrFirst, kind, chordi, texti, orderTitle }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_ORD', 'C')) throw '';

            com.o ??= [];
            const afterOrdi =
              insertAfterOrdwOrFirst == null ? -1 : com.o.findIndex(ord => ord.w === insertAfterOrdwOrFirst);

            const ord: IExportableOrder = {
              w: getNextOrdWid(com.o),
              k: kind,
              c: chordi,
              t: texti,
            };

            if (afterOrdi < 1) {
              com.o.unshift(ord);
            } else com.o.splice(afterOrdi + 1, 0, ord);

            return `добавлен новый порядковый блок ${orderTitle}`;
          }),

          setPositionsLine: modifyOrd((ord, { linei, line, lineChangesText, orderTitle }, { auth }, com) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            targetOrd.p ??= [];
            targetOrd.p[linei] = line;

            return `в блоке ${orderTitle} изменена аппликатура в ${linei + 1}-й строке: ${lineChangesText}`;
          }),

          trimOverPositions: modifyOrd((ord, { orderTitle }, { auth }, com) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_APPS', 'U')) throw '';

            if (com.t == null) throw 'В песне нет текстов';

            let targetOrd = ord;
            if (ord.a != null) {
              targetOrd = com.o?.find(o => o.w === ord.a) ?? ord;
              delete ord.p;
            }

            if (targetOrd.t == null || !com.t[targetOrd.t]) throw 'Текста нет';
            if (targetOrd.p == null) throw 'Аппликатура не обнаружена';

            const textLinesCount = com.t[targetOrd.t].split(makeRegExp('/\n/')).length;
            if (textLinesCount < targetOrd.p.length) targetOrd.p.length = textLinesCount;

            return `в блоке ${orderTitle} удалены лишние строки аппликатуры`;
          }),

          setModulationValue: modifyOrd((ord, { value, orderTitle }) => {
            ord.f ??= {};
            ord.f.md = value || undefined;

            if (!smylib.keys(ord.f).length) delete ord.f;

            return `установлено значение модулирования блока ${orderTitle} - ${value}`;
          }),

          removeRepeats: modifyOrd((ord, { orderTitle }) => {
            delete ord.r;

            return `убраны повторения в блоке ${orderTitle}`;
          }),
        },
      });
    }
  })();

function modifyOrd<Props extends { ordw: CmComOrderWid; comw: CmComWid }>(
  modifier: (ord: IExportableOrder, props: Props, tool: ServerTSJRPCTool, com: IServerSideCom) => string | null,
) {
  return modifyCom<Props>((com, props, tool) => {
    const ord = com.o?.find(ord => ord.w === props.ordw);

    if (ord == null) throw new Error('Ord not found');

    return modifier(ord, props, tool, com);
  });
}

const getNextOrdWid = (ords: { w: CmComOrderWid }[]) =>
  ords.reduce((max, curr) => (curr.w > max ? curr.w : max), CmComOrderWid.def) + 1;

const clearNullableOrderInheritValues = (ord: IExportableOrder, key: '_r' | '_v') => {
  if (ord[key] == null) return;

  while (ord[key].length && ord[key][ord[key].length - 1] == null) ord[key].pop();

  if (!ord[key].length) delete ord[key];
};
