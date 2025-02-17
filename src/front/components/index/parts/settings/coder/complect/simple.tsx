import { mylib } from 'front/utils';
import styled from 'styled-components';
import CopyTextButton from '../../../../../../07-shared/ui/CopyTextButton';
import { CoderResultNameStyled } from './styles';

export const CoderResultSimple = ({ name, value }: { value: unknown; name?: string | number }) => (
  <span className="flex flex-gap">
    {name == null ? null : (
      <span>
        <CoderResultNameStyled>{name}: </CoderResultNameStyled>
      </span>
    )}
    {value instanceof Error ? (
      <pre className="color--ko">{'' + value}</pre>
    ) : (
      <Simple>
        {mylib.isRegExp(value) ? (
          <RegExpResult>{' ' + value}</RegExpResult>
        ) : mylib.isNaN(value) ? (
          'NaN'
        ) : value == null ? (
          ' ' + value
        ) : mylib.isStr(value) || (mylib.isNum(value) && value >= 10) ? (
          <span className="flex flex-gap">
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
