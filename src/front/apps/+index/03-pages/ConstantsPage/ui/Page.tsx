import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { constantsConfigurator, constantsDefaultConfig } from 'shared/const/cm/constants.def';
import { checkIsNumber, checkIsStartsWith } from 'shared/utils/checkIs';
import { mapObjectEntries } from 'shared/utils/object.utils';

export const IndexConstantsPage = () => {
  const constants = useAtomValue(constantsConfigAtom);

  return (
    <PageContainerConfigurer
      className="constants-editor"
      headTitle="Константы"
      content={
        <>
          {mapObjectEntries(constantsConfigurator, (key, configItem) => {
            if (checkIsStartsWith(key, '>') || checkIsNumber(configItem))
              return (
                <div
                  key={key}
                  className="bold underline mt-15"
                >
                  {key.slice(1)}
                </div>
              );

            return (
              <InputWithLoadingIcon
                key={key}
                label={configItem.title}
                icon="RightToLeftListTriangle"
                placeholder={'' + constantsDefaultConfig[key]}
                defaultValue={configItem.str(constants[key])}
                onChanged={value =>
                  indexTsjrpcClientMethods.updateConstConfig({ config: { [key]: configItem.unzip(value) } })
                }
              />
            );
          })}
        </>
      }
    />
  );
};
