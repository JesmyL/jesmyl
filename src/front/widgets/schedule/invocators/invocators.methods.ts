import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import {
  SchAttachmentTypesSokiInvocatorMethods,
  SchDayEventsSokiInvocatorMethods,
  SchDaysSokiInvocatorMethods,
  SchEventTypesSokiInvocatorMethods,
  SchGamesSokiInvocatorMethods,
  SchGeneralSokiInvocatorModel,
  SchListsSokiInvocatorMethods,
  SchPhotosSokiInvocatorMethods,
  SchRolesSokiInvocatorMethods,
  SchUsersSokiInvocatorMethods,
} from 'shared/api';

export const schGeneralSokiInvocatorClient =
  new (class SchGeneralSokiInvocatorClient extends SokiInvocatorClient<SchGeneralSokiInvocatorModel> {
    constructor() {
      super({
        className: 'SchGeneralSokiInvocatorClient',
        methods: {
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
          setIsTgInformMe: true,
        },
      });
    }
  })();

export const schDaysSokiInvocatorClient =
  new (class SchDaysSokiInvocatorClient extends SokiInvocatorClient<SchDaysSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchDaysSokiInvocatorClient',
        methods: {
          addDay: true,
          setBeginTime: true,

          setTopic: true,
          setDescription: true,
          addEvent: true,
          removeEvent: true,
          moveEvent: true,
          setEventList: true,
        },
      });
    }
  })();

export const schDayEventsSokiInvocatorClient =
  new (class SchDayEventsSokiInvocatorClient extends SokiInvocatorClient<SchDayEventsSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchDayEventsSokiInvocatorClient',
        methods: {
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
        },
      });
    }
  })();

export const schEventTypesSokiInvocatorClient =
  new (class SchEventTypesSokiInvocatorClient extends SokiInvocatorClient<SchEventTypesSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchEventTypesSokiInvocatorClient',
        methods: {
          create: true,
          setTitle: true,
          setTm: true,
          bindAttImagine: true,
          removeAttImagine: true,
          setAttImaginePeriod: true,
          putMany: true,
        },
      });
    }
  })();

export const schAttachmentTypesSokiInvocatorClient =
  new (class SchAttachmentTypesSokiInvocatorClient extends SokiInvocatorClient<SchAttachmentTypesSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchAttachmentTypesSokiInvocatorClient',
        methods: {
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
        },
      });
    }
  })();

export const schPhotosSokiInvocatorClient =
  new (class SchPhotosSokiInvocatorClient extends SokiInvocatorClient<SchPhotosSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchPhotosSokiInvocatorClient',
        methods: {
          putSharedPhotos: true,
          getSharedPhotos: true,
        },
      });
    }
  })();

export const schUsersSokiInvocatorClient =
  new (class SchUsersSokiInvocatorClient extends SokiInvocatorClient<SchUsersSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchUsersSokiInvocatorClient',
        methods: {
          addUsersByExcel: true,
          addMe: true,
          setUserFio: true,
          setUserRights: true,
          addUserListUnitMembership: true,
          removeUserListUnitMembership: true,
        },
      });
    }
  })();

export const schRolesSokiInvocatorClient =
  new (class SchRolesSokiInvocatorClient extends SokiInvocatorClient<SchRolesSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchRolesSokiInvocatorClient',
        methods: {
          createRole: true,
          setRoleIcon: true,
          setRoleTitle: true,
          addRoleCategory: true,
          setRoleCategoryTitle: true,
          setCategoryForRole: true,
          setRoleUser: true,
          makeFreeRole: true,
        },
      });
    }
  })();

export const schListsSokiInvocatorClient =
  new (class SchListsSokiInvocatorClient extends SokiInvocatorClient<SchListsSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchListsSokiInvocatorClient',
        methods: {
          createCategory: true,
          setCategoryTitle: true,
          setCategoryMembersTitle: true,
          setCategoryMentorsTitle: true,
          setCategoryIcon: true,
          createUnit: true,
          setUnitDescription: true,
          setUnitTitle: true,
        },
      });
    }
  })();

export const schGamesSokiInvocatorClient =
  new (class SchGamesSokiInvocatorClient extends SokiInvocatorClient<SchGamesSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchGamesSokiInvocatorClient',
        methods: {
          addCriteria: true,
          setCriteriaTitle: true,
          setSortedDict: true,
          toggleStrikedUser: true,
          addGame: true,
          setTeams: true,
          setTitle: true,
        },
      });
    }
  })();
