import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { InputHTMLAttributes, RefObject, useRef } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const FileInput = ({
  renderTrigger,
  onFilesSelect,
  ...attrs
}: {
  renderTrigger?: (props: { fileInputRef: RefObject<HTMLInputElement | null> }) => React.ReactNode;
  multiple?: boolean;
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
          {attrs.multiple ? translateBase(BaseLocaleKey.ConfigPickFiles) : translateBase(BaseLocaleKey.ConfigPickFile)}
        </Button>
      )}
    </>
  );
};
