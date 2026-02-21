import { TextInput } from '#shared/ui/TextInput';

export const CmEditorMp3RuleTextLine = ({
  isRedact,
  setText,
  text,
  label,
  error,
}: {
  isRedact: boolean | nil;
  text: string;
  setText: (text: string) => void;
  label: React.ReactNode;
  error?: React.ReactNode;
}) => {
  return (
    <div className="w-full mt-2">
      {label}
      {isRedact ? (
        <TextInput
          value={text}
          onInput={setText}
        />
      ) : (
        <span className="text-x7 ml-2">{text}</span>
      )}
      {error && <div className="text-xKO">{error}</div>}
    </div>
  );
};
