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
  new (class SchGeneral extends SokiInvocatorClient<SchGeneralSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'SchGeneral',
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

export const schDaysSokiInvocatorClient = new (class SchDays extends SokiInvocatorClient<SchDaysSokiInvocatorMethods> {
  constructor() {
    super({
      scope: 'SchDays',
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
  new (class SchDayEvents extends SokiInvocatorClient<SchDayEventsSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchDayEvents',
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
  new (class SchEventTypes extends SokiInvocatorClient<SchEventTypesSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchEventTypes',
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
  new (class SchAttachmentTypes extends SokiInvocatorClient<SchAttachmentTypesSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchAttachmentTypes',
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
  new (class SchPhotos extends SokiInvocatorClient<SchPhotosSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchPhotos',
        methods: {
          putSharedPhotos: true,
          getSharedPhotos: true,
        },
      });
    }
  })();

export const schUsersSokiInvocatorClient =
  new (class SchUsers extends SokiInvocatorClient<SchUsersSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchUsers',
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
  new (class SchRoles extends SokiInvocatorClient<SchRolesSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchRoles',
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
  new (class SchLists extends SokiInvocatorClient<SchListsSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchLists',
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
  new (class SchGames extends SokiInvocatorClient<SchGamesSokiInvocatorMethods> {
    constructor() {
      super({
        scope: 'SchGames',
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
