import { mylib } from '#shared/lib/my-lib';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
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
      <span className="flex text-[#7aa7ef]">
        {mylib.isRegExp(value) ? (
          <span className="text-[#efd799]">{' ' + value}</span>
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
      </span>
    )}
  </span>
);
