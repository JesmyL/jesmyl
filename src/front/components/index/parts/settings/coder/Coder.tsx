import { useEffect, useRef, useState } from 'react';
import { makeRegExp } from 'regexpert';
import styled from 'styled-components';

interface Props {
  onError: (error: Error) => void;
  onLog: (log: unknown) => void;
}

const saveCode = (code: string) => (localStorage.execCode = code);

export const CodeExecutionScreen = ({ onError, onLog }: Props) => {
  const [code, setCode] = useState<string>(localStorage.execCode || '');
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onLogRef = useRef(onLog);
  onLogRef.current = onLog;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const data = { data: '' };
      const now = Date.now();
      const consoler = { log: onLogRef.current, error: (error: unknown) => onErrorRef.current(new Error('' + error)) };

      try {
        if (!code) {
          saveCode(code);
          return;
        }
        const execTextLines = code
          .replace(makeRegExp('/[ ;\\n,]+$/'), '')
          .split(makeRegExp('/\\n+/'))
          .map(line => line.trim())
          .filter(line => !line.startsWith('//'));

        if (!execTextLines.join('')) {
          saveCode(code);
          return;
        }

        execTextLines[execTextLines.length - 1] = `;data${now}.data = ${execTextLines[execTextLines.length - 1]};`;

        new Function(`data${now}, console`, execTextLines.join('\n')).bind(null)(data, consoler);
        saveCode(code);
        onLogRef.current(data.data);
      } catch (error) {
        onErrorRef.current(new Error('' + error));
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <Textarea
      className="full-width half-height bgcolor--2 margin-big-gap-t"
      onChange={event => setCode(event.target.value)}
      value={code}
    />
  );
};

const Textarea = styled.textarea`
  height: 30vh;
  resize: none;
`;
