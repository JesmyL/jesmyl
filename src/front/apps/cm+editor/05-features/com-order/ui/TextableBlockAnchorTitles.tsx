import { translateBase } from '#basis/locale';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

interface Props {
  texti?: number;
  chordi?: number;
  com: EditableCom;
}

export const CmEditorComOrderAddTextableBlockAnchorTitles = ({ texti, com, chordi }: Props) => {
  const textPosition = (chordi ?? texti ?? 0) + 1 + '. ';

  const ordersUsedText =
    (texti != null
      ? com.orders?.filter(ord => ord.texti === texti)
      : chordi != null
        ? com.orders?.filter(ord => ord.chordsi === chordi)
        : null) ?? [];

  if (!ordersUsedText.length)
    return (
      <>
        {textPosition}
        <span className="text-xKO">{translateBase(BaseLocaleKey.CmEditorNoBlockReferences)}</span>
      </>
    );

  return (
    <div>
      {textPosition}
      <span
        className="opacity-50"
        dangerouslySetInnerHTML={{
          __html: Array.from(
            new Set(
              ordersUsedText.map(
                o =>
                  (o.me.isAnchor || o.me.isAnchorInherit || o.me.isAnchorInheritPlus ? '&#9875;' : '') +
                  `${o.me.header()}${o.me.kind?.isInherit ? ` ${o.me.kind.alt ?? o.me.kind.key}` : ''}`,
              ),
            ),
          ).join(', '),
        }}
      />
    </div>
  );
};
