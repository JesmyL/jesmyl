import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { checkIsNaN, checkIsNumber, checkIsRegExp, checkIsString } from 'shared/utils/checkIs';
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
        {checkIsRegExp(value) ? (
          <span className="text-[#efd799]">{' ' + value}</span>
        ) : checkIsNaN(value) ? (
          'NaN'
        ) : value == null ? (
          ' ' + value
        ) : checkIsString(value) || (checkIsNumber(value) && value >= 10) ? (
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
