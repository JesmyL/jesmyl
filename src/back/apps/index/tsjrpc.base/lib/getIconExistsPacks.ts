import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { makeRegExp } from 'regexpert';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { itIt } from 'shared/utils';
import { objectKeys, objectValues } from 'shared/utils/object.utils';
import { textToCapitalizeCase } from 'shared/utils/string.utils';
import { StameskaIconName } from 'stameska-icon/pack';
import { StameskaIconKind, StameskaIconPack } from 'stameska-icon/utils';
import { indexStameskaIconsFileStore } from '../../file-stores';

export const indexTSJRPCBaseGetIconExistsPacks = {
  getIconExistsPacks: async ({ pageSize, page, searchTerm }) => {
    let iconPacks: StameskaIconPack[] | null = null;

    if (searchTerm) {
      const nameBeats = searchTerm
        .trim()
        .replace(makeRegExp('/.*?([^/]+$)/'), '$1')
        .split(makeRegExp('/(\\d+)|\\W|([A-Z][a-z]+)/'))
        .filter(itIt)
        .map(textToCapitalizeCase);

      const exactIconName = nameBeats.join('').replace(postfixReplaceRegExp, '') as StameskaIconName;

      const stameskaIcons = indexStameskaIconsFileStore.getValue();
      if (stameskaIcons[exactIconName] !== undefined) return { value: { packs: [stameskaIcons[exactIconName]] } };

      iconPacks = iconSearchCache[nameBeats.sort().join('')] ??= (() => {
        const foundIconPacks: StameskaIconPack[] = [];

        objectKeys(stameskaIcons).forEach(iconName => {
          if (!nameBeats.some(beat => iconName.includes(beat))) return;
          foundIconPacks.push(stameskaIcons[iconName]);
        });

        return foundIconPacks;
      })();
    }

    return {
      value: {
        packs: (iconPacks ?? objectValues(indexStameskaIconsFileStore.getValue())).slice(
          page * pageSize,
          page * pageSize + pageSize,
        ),
      },
    };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;

const postfixReplaceRegExp = makeRegExp(
  `/(${objectKeys({
    BulkRounded: 0,
    DuotoneRounded: 0,
    SolidRounded: 0,
    SolidSharp: 0,
    StrokeRounded: 0,
    StrokeSharp: 0,
    TwotoneRounded: 0,
  } satisfies Record<StameskaIconKind, 0>).join('|')}|Icon)$/`,
);

const iconSearchCache: Record<string, StameskaIconPack[]> = {};
