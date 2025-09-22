import { makeRegExp } from 'regexpert';
import { itIt, smylib } from 'shared/utils';
import { StameskaIconName, stameskaIconPack } from 'stameska-icon/pack';
import { StameskaIconKind, StameskaIconPack } from 'stameska-icon/utils';
import { indexServerTsjrpcBase } from '..';

export const indexTSJRPCBaseGetIconExistsPacks: typeof indexServerTsjrpcBase.getIconExistsPacks = async ({
  pageSize,
  page,
  searchTerm,
}) => {
  let iconPacks: StameskaIconPack[] | null = null;

  if (searchTerm) {
    const nameBeats = searchTerm
      .trim()
      .replace(/.*?([^/]+$)/, '$1')
      .split(/(\d+)|\W|([A-Z][a-z]+)/)
      .filter(itIt)
      .map(name => `${name[0].toUpperCase()}${name.slice(1)}`);

    const exactIconName = nameBeats.join('').replace(postfixReplaceRegExp, '') as StameskaIconName;

    if (stameskaIconPack[exactIconName] !== undefined) return { packs: [stameskaIconPack[exactIconName]] };

    iconPacks = iconSearchCache[nameBeats.sort().join('')] ??= (() => {
      const foundIconPacks: StameskaIconPack[] = [];

      smylib.keys(stameskaIconPack).forEach(iconName => {
        if (!nameBeats.some(beat => iconName.includes(beat))) return;
        foundIconPacks.push(stameskaIconPack[iconName]);
      });

      return foundIconPacks;
    })();
  }

  return {
    packs: (iconPacks ?? smylib.values(stameskaIconPack)).slice(page * pageSize, page * pageSize + pageSize),
  };
};

const postfixReplaceRegExp = makeRegExp(
  `/(${smylib
    .keys({
      BulkRounded: 0,
      DuotoneRounded: 0,
      SolidRounded: 0,
      SolidSharp: 0,
      StrokeRounded: 0,
      StrokeSharp: 0,
      TwotoneRounded: 0,
    } satisfies Record<StameskaIconKind, 0>)
    .join('|')}|Icon)$/`,
);

const iconSearchCache: Record<string, StameskaIconPack[]> = {};
