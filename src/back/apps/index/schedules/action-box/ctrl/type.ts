// import {
//   ActionBox,
//   IScheduleWidget,
//   ScheduleWidgetCleans,
//   ScheduleWidgetRegType,
//   scheduleWidgetRegTypeRights,
//   scheduleWidgetRegTypeTitles,
// } from 'shared/api';
// import { smylib } from 'shared/utils';
// import { ScheduleWidgetActionBoxCleans } from '../cleans';

// const findTitleSelf = { id: ScheduleWidgetRegType.Public };
// function findType(this: typeof findTitleSelf, item: typeof findTitleSelf) {
//   return item.id === this.id;
// }

// export const scheduleWidgetCtrlTypeActionBox: ActionBox<IScheduleWidget['ctrl']['type']> = {
//   U: {
//     RRej: true,
//     args: {
//       value: '#Number',
//     },
//     title: args => {
//       const schedule = ScheduleWidgetActionBoxCleans.getSchedule(args.schw);
//       if (schedule === undefined) return '';

//       if (!smylib.isNum(args.value)) return `В расписании <b>${schedule.title}</b> изменение типа`;

//       const isSwPublic = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
//         args.value,
//         ScheduleWidgetRegType.Public,
//       );

//       const isSwBeforeRegistration = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
//         args.value,
//         ScheduleWidgetRegType.BeforeRegistration,
//       );

//       const isSwHideContent = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
//         args.value,
//         ScheduleWidgetRegType.HideContent,
//       );

//       try {
//         findTitleSelf.id = ScheduleWidgetRegType.Public;
//         const publicRule = scheduleWidgetRegTypeTitles.find(findType, findTitleSelf)!;

//         findTitleSelf.id = ScheduleWidgetRegType.BeforeRegistration;
//         const beforeRegistrationRule = scheduleWidgetRegTypeTitles.find(findType, findTitleSelf)!;

//         findTitleSelf.id = ScheduleWidgetRegType.HideContent;
//         const hideContentRule = scheduleWidgetRegTypeTitles.find(findType, findTitleSelf)!;

//         return (
//           `В расписании <b>${schedule.title}</b> изменение типа:` +
//           `\n\n${ScheduleWidgetCleans.putInTgTag(isSwPublic ? '' : 's', publicRule.title)}` +
//           `\n${ScheduleWidgetCleans.putInTgTag(
//             isSwPublic && isSwBeforeRegistration ? '' : 's',
//             beforeRegistrationRule.title,
//           )}` +
//           `\n${ScheduleWidgetCleans.putInTgTag(
//             isSwPublic && isSwBeforeRegistration && isSwHideContent ? '' : 's',
//             hideContentRule.title,
//           )}`
//         );
//       } catch (error) {
//         return `В расписании <b>${schedule.title}</b> изменение типа`;
//       }
//     },
//   },
// };
