import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib, MyLib } from '#shared/lib/my-lib';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { cmConstantsConfigAtom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const CmEditorConstantsPage = () => {
  const constants = useAtomValue(cmConstantsConfigAtom);

  return (
    <PageCmEditorContainer
      className="constants-editor"
      headTitle="Константы"
      content={
        <>
          {MyLib.entries({ ...cmConstantsDefaultConfig, ...constants }).map(([key, defaultValue]) => {
            return (
              <InputWithLoadingIcon
                key={key}
                label={key}
                icon="RightToLeftListTriangle"
                placeholder={'' + cmConstantsDefaultConfig[key]}
                defaultValue={'' + defaultValue}
                onChanged={async value =>
                  cmEditorClientTsjrpcMethods.updateConstConfig({
                    config: {
                      [key]: (mylib.isNum(defaultValue)
                        ? value === ''
                          ? cmConstantsDefaultConfig[key]
                          : mylib.isNaN(+value)
                            ? defaultValue
                            : +value
                        : value) as never,
                    },
                  })
                }
              />
            );
          })}
        </>
      }
    />
  );
};
