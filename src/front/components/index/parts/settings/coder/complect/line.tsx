import { CoderResultComponent } from './model';
import { CoderResultValue } from './value';

export const CoderResultLine: CoderResultComponent<unknown[][]> = ({ value }) => {
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
                <CoderResultValue
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
