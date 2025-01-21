import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import {
  SchAttachmentTypesSokiInvocatorMethods,
  SchDayEventsSokiInvocatorMethods,
  SchDaysSokiInvocatorMethods,
  SchEventTypesSokiInvocatorMethods,
  SchGamesSokiInvocatorMethods,
  SchGeneralSokiInvocatorMethods,
  SchListsSokiInvocatorMethods,
  SchPhotosSokiInvocatorMethods,
  SchRolesSokiInvocatorMethods,
  SchUsersSokiInvocatorMethods,
} from 'shared/api/invocators/schedules/invocators.model';

class SchGeneralSokiInvocatorClient extends SokiInvocatorClient<SchGeneralSokiInvocatorMethods> {
  constructor() {
    super('SchGeneralSokiInvocatorClient', {
      create: true,
      remove: true,
      copySchedule: true,
      rename: true,
      setDefaultUserRights: true,
      setScheduleRegisterType: true,
      setTopic: true,
      setDescription: true,
      setStartTime: true,
      setFirstDayAsTech: true,
      setTgChatRequisites: true,
      toggleIsTgInform: true,
      setTgInformTime: true,
    });
  }
}
export const schGeneralSokiInvocatorClient = new SchGeneralSokiInvocatorClient();

class SchDaysSokiInvocatorClient extends SokiInvocatorClient<SchDaysSokiInvocatorMethods> {
  constructor() {
    super('SchDaysSokiInvocatorClient', {
      addDay: true,
      setBeginTime: true,

      setTopic: true,
      setDescription: true,
      addEvent: true,
      removeEvent: true,
      moveEvent: true,
    });
  }
}
export const schDaysSokiInvocatorClient = new SchDaysSokiInvocatorClient();

class SchDayEventsSokiInvocatorClient extends SokiInvocatorClient<SchDayEventsSokiInvocatorMethods> {
  constructor() {
    super('SchDayEventsSokiInvocatorClient', {
      setTopic: true,
      setTm: true,
      setDescription: true,
      setIsNeedTgInform: true,
      toggleIsSecret: true,
      addAttachment: true,
      addAttachmentRef: true,
      removeAttachment: true,
      setRatePoint: true,
      setRateComment: true,
      putKeyValueAttachment: true,
      setKeyValueAttachmentValue: true,
      setKeyValueAttachmentKey: true,
      changeKeyValueAttachmentKey: true,
      addKeyValueAttachmentListItem: true,
      setKeyValueAttachmentListItemValue: true,
      removeKeyValueAttachmentListItemValue: true,
      moveKeyValueAttachment: true,
      moveKeyValueAttachmentListItem: true,
      updateCheckListAttachmentValue: true,
    });
  }
}
export const schDayEventsSokiInvocatorClient = new SchDayEventsSokiInvocatorClient();

class SchEventTypesSokiInvocatorClient extends SokiInvocatorClient<SchEventTypesSokiInvocatorMethods> {
  constructor() {
    super('SchEventTypesSokiInvocatorClient', {
      create: true,
      setTitle: true,
      setTm: true,
      bindAttImagine: true,
      removeAttImagine: true,
      setAttImaginePeriod: true,
    });
  }
}
export const schEventTypesSokiInvocatorClient = new SchEventTypesSokiInvocatorClient();

class SchAttachmentTypesSokiInvocatorClient extends SokiInvocatorClient<SchAttachmentTypesSokiInvocatorMethods> {
  constructor() {
    super('SchAttachmentTypesSokiInvocatorClient', {
      create: true,
      setTitle: true,
      setDescription: true,
      setIcon: true,
      setUse: true,
      setRolesUses: true,
      setListsUses: true,
      setTitleValue: true,
      createTitleValue: true,
      setWhoCanLevel: true,
      toggleUserWhoCan: true,
    });
  }
}
export const schAttachmentTypesSokiInvocatorClient = new SchAttachmentTypesSokiInvocatorClient();

class SchPhotosSokiInvocatorClient extends SokiInvocatorClient<SchPhotosSokiInvocatorMethods> {
  constructor() {
    super('SchPhotosSokiInvocatorClient', {
      putSharedPhotos: true,
      getSharedPhotos: true,
    });
  }
}
export const schPhotosSokiInvocatorClient = new SchPhotosSokiInvocatorClient();

class SchUsersSokiInvocatorClient extends SokiInvocatorClient<SchUsersSokiInvocatorMethods> {
  constructor() {
    super('SchUsersSokiInvocatorClient', {
      addUsersByExcel: true,
      addMeByLink: true,
      setUserFio: true,
      setUserRights: true,
      addUserListUnitMembership: true,
      removeUserListUnitMembership: true,
    });
  }
}
export const schUsersSokiInvocatorClient = new SchUsersSokiInvocatorClient();

class SchRolesSokiInvocatorClient extends SokiInvocatorClient<SchRolesSokiInvocatorMethods> {
  constructor() {
    super('SchRolesSokiInvocatorClient', {
      createRole: true,
      setRoleIcon: true,
      setRoleTitle: true,
      addRoleCategory: true,
      setRoleCategoryTitle: true,
      setCategoryForRole: true,
      setRoleUser: true,
      makeFreeRole: true,
    });
  }
}
export const schRolesSokiInvocatorClient = new SchRolesSokiInvocatorClient();

class SchListsSokiInvocatorClient extends SokiInvocatorClient<SchListsSokiInvocatorMethods> {
  constructor() {
    super('SchListsSokiInvocatorClient', {
      createCategory: true,
      setCategoryTitle: true,
      setCategoryMembersTitle: true,
      setCategoryMentorsTitle: true,
      setCategoryIcon: true,
      createUnit: true,
      setUnitDescription: true,
      setUnitTitle: true,
    });
  }
}
export const schListsSokiInvocatorClient = new SchListsSokiInvocatorClient();

class SchGamesSokiInvocatorClient extends SokiInvocatorClient<SchGamesSokiInvocatorMethods> {
  constructor() {
    super('SchGamesSokiInvocatorClient', {
      addCriteria: true,
      setCriteriaTitle: true,
      setSortedDict: true,
      toggleStrikedUser: true,
      addGame: true,
      setTeams: true,
      setTitle: true,
    });
  }
}
export const schGamesSokiInvocatorClient = new SchGamesSokiInvocatorClient();
