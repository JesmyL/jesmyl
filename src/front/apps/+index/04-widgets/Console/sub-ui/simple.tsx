import { mylib } from '#shared/lib/my-lib';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import styled from 'styled-components';
import { StyledIndexConsoleCoderResultName } from '../style/styles';

export const IndexConsoleCoderResultSimple = ({ name, value }: { value: unknown; name?: string | number }) => (
  <span className="flex gap-2">
    {name == null ? null : (
      <span>
        <StyledIndexConsoleCoderResultName>{name}: </StyledIndexConsoleCoderResultName>
      </span>
    )}
    {value instanceof Error ? (
      <pre className="text-xKO">{'' + value}</pre>
    ) : (
      <Simple>
        {mylib.isRegExp(value) ? (
          <RegExpResult>{' ' + value}</RegExpResult>
        ) : mylib.isNaN(value) ? (
          'NaN'
        ) : value == null ? (
          ' ' + value
        ) : mylib.isStr(value) || (mylib.isNum(value) && value >= 10) ? (
          <span className="flex gap-2">
            {JSON.stringify(value)} {!!value && <CopyTextButton text={'' + value} />}
          </span>
        ) : (
          JSON.stringify(value)
        )}
      </Simple>
    )}
  </span>
);

const Simple = styled.span`
  display: flex;
  color: #7aa7ef;
`;

const RegExpResult = styled.span`
  color: #efd799;
`;
