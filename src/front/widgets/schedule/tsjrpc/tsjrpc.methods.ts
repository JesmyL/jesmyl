import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import {
  SchAttachmentTypesTsjrpcMethods,
  SchDayEventsTsjrpcMethods,
  SchDaysTsjrpcMethods,
  SchEventTypesTsjrpcMethods,
  SchGamesTsjrpcMethods,
  SchGeneralTsjrpcModel,
  SchListsTsjrpcMethods,
  SchPhotosTsjrpcMethods,
  SchRolesTsjrpcMethods,
  SchUsersTsjrpcMethods,
} from 'shared/api';

export const schGeneralTsjrpcClient = new (class SchGeneral extends TsjrpcClient<SchGeneralTsjrpcModel> {
  constructor() {
    super({
      scope: 'SchGeneral',
    });
  }
})();

export const schDaysTsjrpcClient = new (class SchDays extends TsjrpcClient<SchDaysTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchDays',
    });
  }
})();

export const schDayEventsTsjrpcClient = new (class SchDayEvents extends TsjrpcClient<SchDayEventsTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchDayEvents',
    });
  }
})();

export const schEventTypesTsjrpcClient = new (class SchEventTypes extends TsjrpcClient<SchEventTypesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchEventTypes',
    });
  }
})();

export const schAttachmentTypesTsjrpcClient =
  new (class SchAttachmentTypes extends TsjrpcClient<SchAttachmentTypesTsjrpcMethods> {
    constructor() {
      super({
        scope: 'SchAttachmentTypes',
      });
    }
  })();

export const schPhotosTsjrpcClient = new (class SchPhotos extends TsjrpcClient<SchPhotosTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchPhotos',
    });
  }
})();

export const schUsersTsjrpcClient = new (class SchUsers extends TsjrpcClient<SchUsersTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchUsers',
    });
  }
})();

export const schRolesTsjrpcClient = new (class SchRoles extends TsjrpcClient<SchRolesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchRoles',
    });
  }
})();

export const schListsTsjrpcClient = new (class SchLists extends TsjrpcClient<SchListsTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchLists',
    });
  }
})();

export const schGamesTsjrpcClient = new (class SchGames extends TsjrpcClient<SchGamesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchGames',
    });
  }
})();
