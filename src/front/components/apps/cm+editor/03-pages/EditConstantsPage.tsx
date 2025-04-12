import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib, MyLib } from '#shared/lib/my-lib';
import { cmEditorClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const CmEditConstantsPage = () => {
  const constants = cmIDB.useValue.constantsConfig();

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
                onChange={async value =>
                  cmEditorClientInvocatorMethods.updateConstantsConfig({
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
