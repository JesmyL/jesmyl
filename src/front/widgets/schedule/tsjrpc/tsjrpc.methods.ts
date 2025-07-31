import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
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

export const schDaysTsjrpcClient = new (class SchDays extends TsjrpcClient<SchDaysTsjrpcMethods> {
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

export const schDayEventsTsjrpcClient = new (class SchDayEvents extends TsjrpcClient<SchDayEventsTsjrpcMethods> {
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

export const schEventTypesTsjrpcClient = new (class SchEventTypes extends TsjrpcClient<SchEventTypesTsjrpcMethods> {
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

export const schAttachmentTypesTsjrpcClient =
  new (class SchAttachmentTypes extends TsjrpcClient<SchAttachmentTypesTsjrpcMethods> {
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

export const schPhotosTsjrpcClient = new (class SchPhotos extends TsjrpcClient<SchPhotosTsjrpcMethods> {
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

export const schUsersTsjrpcClient = new (class SchUsers extends TsjrpcClient<SchUsersTsjrpcMethods> {
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

export const schRolesTsjrpcClient = new (class SchRoles extends TsjrpcClient<SchRolesTsjrpcMethods> {
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

export const schListsTsjrpcClient = new (class SchLists extends TsjrpcClient<SchListsTsjrpcMethods> {
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

export const schGamesTsjrpcClient = new (class SchGames extends TsjrpcClient<SchGamesTsjrpcMethods> {
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
