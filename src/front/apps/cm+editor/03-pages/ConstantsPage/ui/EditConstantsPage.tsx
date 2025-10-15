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
                defaultValue={'' + defaultValue}
                placeholder={'' + cmConstantsDefaultConfig[key]}
                icon="RightToLeftListTriangle"
                onChanged={async value =>
                  cmEditorClientTsjrpcMethods.updateConstantsConfig({
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
                label={key}
              />
            );
          })}
        </>
      }
    />
  );
};
