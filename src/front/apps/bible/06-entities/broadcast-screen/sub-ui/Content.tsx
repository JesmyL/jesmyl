import { useBibleBroadcastScreenScreenStyle } from '$bible/entities/broadcast';
import { BibleBroadcastTextMapBlocks } from '$bible/features/BroadcastTextMapBlocks';
import { bibleTagControledContentGlobalCssNode } from '$bible/shared/const/bibleTagControledContentGlobalCssNode';
import { useBibleTextMapBlocksContentContext } from '$bible/shared/contexts/texts';
import { useBibleBroadcastScreenFontSizeScreenAdapter } from '$bible/shared/lib';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

interface Props {
  configi: number | und;
  win: Window;
  isPreview: boolean | und;
  bibleConfig: BibleBroadcastScreenConfig | und;
  isVisible: boolean;
}

export const BibleBroadcastScreenContent = (props: Props) => {
  const screenStyle = useBibleBroadcastScreenScreenStyle(props.isVisible, props.bibleConfig);
  const texts = useBibleTextMapBlocksContentContext();

  const [screenWrapperRef, screenContentRef, isReady] = useBibleBroadcastScreenFontSizeScreenAdapter(
    texts.map(it => `${it.head || ''}${it.texts.map(({ text, address }) => `${address || ''}${text || ''}`)}`).join(''),
    props.bibleConfig,
  );

  return (
    <>
      {bibleTagControledContentGlobalCssNode}
      <div
        className="bible-tag-controled-content absolute flex center"
        style={screenStyle}
        ref={screenWrapperRef}
      >
        <div
          className="opacity-0"
          ref={screenContentRef}
          style={{
            opacity: isReady ? 1 : 0,
            transition: isReady ? 'opacity .3s' : 'none',
          }}
        >
          <BibleBroadcastTextMapBlocks blocks={texts} />
        </div>
      </div>
    </>
  );
};
