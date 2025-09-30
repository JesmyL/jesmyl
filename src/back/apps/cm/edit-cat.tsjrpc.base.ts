import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { getCmComNameInBrackets } from './edit-com.tsjrpc.base';
import { catsFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditCatServerTsjrpcBase = new (class CmEditCat extends TsjrpcBaseServer<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
      defaultBeforeEachTool: { minLevel: 50 },
      methods: {
        rename: modifyCat((cat, { name }) => (cat.n = name)),
        setKind: modifyCat((cat, { kind }) => (cat.k = kind)),
        clearStack: modifyCat(cat => delete cat.s),

        toggleComExistence: modifyCat((cat, { comw }) => {
          const stackSet = new Set(cat.s);

          if (stackSet.has(comw)) stackSet.delete(comw);
          else stackSet.add(comw);

          cat.s = Array.from(stackSet);
        }),

        removeNativeComNum: modifyCat((cat, { comw }) => {
          if (cat.d == null) return;
          delete cat.d[comw];
        }),

        setNativeComNum: modifyCat((cat, { comw, value }) => (cat.d = { ...cat.d, [comw]: value })),

        remove: modifyCat(cat => (cat.isRemoved = 1)),
        bringBackToLife: modifyCat(cat => delete cat.isRemoved),
      },
      onEachFeedback: {
        rename: (_, cat) => `Категория "${cat.n}" переименована`,
        setKind: ({ kind }, cat) => `Тип категории "${cat.n}" - ${kind}`,
        clearStack: (_, cat) => `Список песен, принадлежащих категории "${cat.n}", очищен`,

        removeNativeComNum: ({ comw }, cat) =>
          `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`,

        setNativeComNum: ({ comw, value }, cat) =>
          `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`,

        toggleComExistence: ({ comw }, cat) =>
          `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(
            comw,
          )}`,

        remove: (_, cat) => `Категория "${cat.n}" удалена`,
        bringBackToLife: (_, cat) => `Удалённая категория "${cat.n}" восстановлена`,
      },
    });
  }
})();

function modifyCat<Props extends { catw: CmCatWid }>(modifier: (cat: IExportableCat, props: Props) => void) {
  return (props: Props) => {
    const cat = catsFileStore.getValue().find(cat => cat.w === props.catw);

    if (cat == null) throw new Error('Cat is not found');

    modifier(cat, props);
    cat.m = Date.now();
    cmShareServerTsjrpcMethods.editedCat({ cat });

    return cat;
  };
}
