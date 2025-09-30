import { markdown } from '#shared/config/markdown';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { isNIs } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import style from './Multiline.module.scss';

const shortFinishLine = 4;

export function StrongEditableFieldMultiline({ value }: { value: string }) {
  const lines = value.slice(0, 150).trim().split(makeRegExp('/\\n/'), 6);
  const shortValue = lines.slice(0, shortFinishLine).join('\n').trim();
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
      dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
    />
  );
}
