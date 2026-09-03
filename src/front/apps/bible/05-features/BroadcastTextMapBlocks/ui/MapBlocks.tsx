import { BibleBroadcastTextMapBlock } from '$bible/shared/model/base';
import styled from '@emotion/styled';

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
            {head && <StyledHead>{head}</StyledHead>}
            {texts?.map(({ text, address }, texti) => {
              return (
                <Elem key={texti}>
                  {address && <StyledAddress>{address}</StyledAddress>}
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

const StyledAddress = styled.div`
  margin-block: 0.5em;
`;

const StyledHead = styled.h3`
  color: rgba(255, 255, 255, 0.5);
  margin-block: 0.7em;
`;
