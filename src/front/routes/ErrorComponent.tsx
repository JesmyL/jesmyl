import { translateBase } from '#basis/locale';
import { currentAppNameAtom } from '#basis/state/currentAppNameAtom';
import { Button } from '#shared/components';
import { IndexAppVersionLabel } from '$index/entities/AppVersionLabel/ui/Label';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

const takeErrorText = (error: unknown) => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.stack || error.message;
  return String(error);
};

export const ErrorComponent = ({ error }: { error: unknown }) => {
  const appName = useAtomValue(currentAppNameAtom);
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <div className="flex justify-center flex-col ites-center w-full h-full gap-3 text-center">
      <div>
        <b className="flex items-center gap-3 w-full justify-center">
          {translateBase(BaseLocaleKey.Oops)}
          <Link to={`/!other/${appName && appName !== 'index' ? appName : 'cm'}` as never}>
            <Button icon="Home03" />
          </Link>
          <Button
            icon="MessageQuestion"
            onClick={() => setIsDetailed(!isDetailed)}
          />
        </b>
        <div>{translateBase(BaseLocaleKey.UpdateHint)}</div>
      </div>
      {!isDetailed || (
        <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap break-all rounded-md border border-rose-500 p-2 text-left text-xs text-rose-400">
          {takeErrorText(error)}
        </pre>
      )}
      <div className="flex gap-3 h-10">
        <IndexAppVersionLabel />
      </div>
    </div>
  );
};
