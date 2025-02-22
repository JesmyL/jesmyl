import { mylib } from '#shared/lib/my-lib';
import { itIt } from 'shared/utils';
import { EditableCom } from '../../com/EditableCom';

interface Props {
  texti?: number;
  chordi?: number;
  com: EditableCom;
}

export function CmTextableBlockAnchorTitles({ texti, com, chordi }: Props) {
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
        <span className="color--ko">Нет упоминаний этого блока</span>
      </>
    );

  return (
    <div>
      {textPosition}
      <span
        className="fade-05"
        dangerouslySetInnerHTML={{
          __html: mylib
            .unique(
              ordersUsedText.map(
                o =>
                  (o.me.isAnchor || o.me.isAnchorInherit || o.me.isAnchorInheritPlus ? '&#9875;' : '') +
                  `${o.me.header()}${o.me.style?.isInherit ? ` ${o.me.style.key}` : ''}`,
              ),
              itIt,
            )
            .join(', '),
        }}
      />
    </div>
  );
}
