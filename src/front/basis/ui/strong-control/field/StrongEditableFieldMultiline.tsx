import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { isNIs } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import style from './Multiline.module.scss';

const onImageClick: React.MouseEventHandler<HTMLImageElement> = event => {
  event.stopPropagation();
  const src = event.currentTarget.getAttribute('prop-src');
  if (src) window.open(src);
};

const ImgContainer = (props: { src: string; alt: string }) => {
  if (!props.src) return null;
  return (
    <span
      className={style.imgContainer}
      onClick={onImageClick}
      prop-src={props.src}
      style={{
        backgroundImage: `url(${props.src})`,
      }}
    />
  );
};

const options: MarkdownToJSX.Options = {
  overrides: {
    img: ImgContainer,
  },
};

const shortFinishLine = 4;

export function StrongEditableFieldMultiline({ value }: { value: string }) {
  const lines = value.slice(0, 150).trim().split(makeRegExp('/\\n/'), 6);

  let finishLine = shortFinishLine;

  if (lines[0].startsWith('![')) {
    finishLine = 1;
  } else if (lines.at(-1)) {
    if (lines.at(-1)!.includes('|')) {
      finishLine = 5;
    }

    if (lines.at(-1)!.includes('![') || lines.at(-1)!.search(makeRegExp('/https?:\\/\\//')) !== -1) {
      finishLine = finishLine - 1;
    }
  }

  const shortValue = lines.slice(0, finishLine).join('\n').trim();
  const isExpandable = lines.length > 4 || shortValue !== value;
  const [isExpand, setisExpand] = useState(false);
  const content = isExpand ? value : shortValue + (isExpandable ? '\n...' : '');

  return (
    <div
      className={twMerge(
        style.markdownFieldContent,
        'markdownFieldContent white-pre-wrap break-word',
        isExpandable && 'pointer',
      )}
      onClick={isExpandable ? () => setisExpand(isNIs) : undefined}
    >
      <Markdown options={options}>
        {content.includes('![')
          ? content.replace(makeRegExp('/!\\[[^\\]]+] *\\[[^\\]]+\\]/g'), '*[Ссылки не работают]*')
          : content}
      </Markdown>
    </div>
  );
}
