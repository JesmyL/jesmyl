import { BibleBroadcastTextMapBlock } from '$bible/shared/model/base';

export const BibleBroadcastTextMapBlocks = ({
  blocks,
  isTextOnly,
  Elem = 'div',
}: {
  blocks: BibleBroadcastTextMapBlock[];
  isTextOnly?: boolean;
  Elem?: 'div' | 'span';
}) => {
  if (isTextOnly)
    return blocks.flatMap(it =>
      it.texts.map((it, iti) => (
        <Elem
          key={iti}
          dangerouslySetInnerHTML={{ __html: it.text }}
        />
      )),
    );

  return (
    <>
      {blocks.map(({ texts, head }, headi) => {
        return (
          <Elem key={headi}>
            {head && <h3 className="text-white/50 my-[0.7em]">{head}</h3>}
            {texts?.map(({ text, address }, texti) => {
              return (
                <Elem key={texti}>
                  {address && <div className="my-[0.5em]">{address}</div>}
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </Elem>
              );
            })}
          </Elem>
        );
      })}
    </>
  );
};
