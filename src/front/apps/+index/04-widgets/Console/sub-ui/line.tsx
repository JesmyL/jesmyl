import { IndexConsoleCoderResultComponent } from '../model/model';
import { IndexConsoleCoderResultValue } from './value';

export const IndexConsoleCoderResultLine: IndexConsoleCoderResultComponent<unknown[][]> = ({ value }) => {
  return (
    <>
      {value.map((result, resulti) => {
        return (
          <div
            key={resulti}
            className="mb-10"
          >
            {result.map((result, resulti) => (
              <div
                key={resulti}
                className="mt-2"
              >
                <IndexConsoleCoderResultValue
                  value={result}
                  scope=""
                />
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};
