import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { InputHTMLAttributes, RefObject, useRef } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

// max — предел объёма в МБ для подписи кнопки; при 0 или отсутствии лимит не показывается.
// v берётся из multiple: подпись меняется на «файлы», когда разрешён выбор нескольких файлов.
export const FileInput = ({
  renderTrigger,
  onFilesSelect,
  max,
  ...attrs
}: {
  renderTrigger?: (props: { fileInputRef: RefObject<HTMLInputElement | null> }) => React.ReactNode;
  multiple?: boolean;
  max?: number;
  onFilesSelect?: (files: File[]) => void;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        {...attrs}
        type="file"
        hidden
        ref={inputRef}
        onChange={event => {
          if (event.currentTarget.files == null) return;
          onFilesSelect?.(Array.from(event.currentTarget.files));
        }}
      />
      {renderTrigger ? (
        renderTrigger({ fileInputRef: inputRef })
      ) : (
        <Button onClick={() => inputRef.current?.click()}>
          {/* v отражает разрешён ли выбор нескольких файлов (multiple), max — лимит объёма: фрагмент лимита виден только при ненулевом max. */}
          {translateBase(BaseLocaleKey.ConfigPickFile, { v: attrs.multiple === true, max })}
        </Button>
      )}
    </>
  );
};
