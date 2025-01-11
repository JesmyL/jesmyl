import { SokiServerDoAction, SokiServerDoActionProps, SokiServicePack } from 'shared/api';
import { indexService } from '../../../apps/index/service';
import wedService from '../../../apps/wed/service';
import { SokiServerConnection } from './70-Connection';

const services: SokiServicePack = {
  index: indexService,
  wed: wedService,
};

export class SokiServerServices extends SokiServerConnection implements SokiServerDoAction<'ServiceActions'> {
  async doOnServiceActions(props: SokiServerDoActionProps) {
    if (props.eventBody.service === undefined || !props.eventData.appName) return false;
    const { appName, client, eventData, requestId } = props;
    const service = props.eventBody.service;

    if (services[eventData.appName] === undefined) {
      this.send(
        {
          requestId,
          service: {
            key: service.key,
            errorMessage: 'У данного приложения нет сервиса',
          },
          appName,
        },
        client,
      );

      return false;
    }

    services[eventData.appName]?.(service.key, service.value, () => this.capsules.get(client), props)
      .then(value => {
        this.send(
          {
            requestId,
            service: {
              key: service.key,
              value,
            },
            appName,
          },
          client,
        );
      })
      .catch(error => {
        this.send(
          {
            requestId,
            service: {
              key: service.key,
              errorMessage: error,
            },
            appName,
          },
          client,
        );
      });

    return false;
  }
}
