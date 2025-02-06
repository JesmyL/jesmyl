// import { WedGuest } from '../../../shared/api/complect/apps/wed/complect/model';
// import { Executer } from '../../complect/executer/Executer';
// import { FilerAppConfig } from '../../complect/filer/Filer.model';
// import { jesmylTgBot } from '../../sides/telegram-bot/bot';

// const config: FilerAppConfig = {
//   title: 'Свадьбы',
//   requirements: {
//     guests: {},
//   },
//   actions: Executer.prepareActionList({
//     '/guests': {
//       expected: [],
//       action: 'putGuest',
//       method: 'setOrPush:mi',
//       setSystems: ['mi'],
//       title: 'Изменения для гостя $guestName;',

//       '<remove>': {
//         action: 'removeGuest',
//         value: ['mi', '===', '{value}'],
//         method: 'remove',
//         title: 'Гость $guestName; удалён',
//       },

//       '<add many>': {
//         action: 'concatGuestList',
//         method: 'concat',
//         setItemSystems: ['mi'],
//         title: 'Список гостей пополнен',
//       },

//       '/[mi === {guestMi}]': {
//         args: {
//           guestMi: '#Number',
//         },
//         '<answer>': {
//           action: 'setGuestAnswer',
//           method: 'set_all',
//           canBeUnauthorized: true,
//           title:
//             'Гость <b>$guestName;</b> $will!{{<s>НЕ</s> }}будет присутствовать на свадьбе.$text{{\n\n nКомментарий: $text}}',
//           value: {
//             t: '{text}',
//             w: '{will}',
//           },
//           args: {
//             will: [0, 1],
//             text: '#string',
//             guestName: '#String',
//           },
//           onSuccess: (args, value: WedGuest) => {
//             jesmylTgBot.bot.sendMessage(
//               370756745,
//               `<b>${args?.guestName || `${value.ln || ''} ${value.fn}`.trim()}</b> ` +
//                 `${value.w ? '' : 'не '}${value.wn ? 'будут' : 'будут'} присутствовать на свадьбе` +
//                 (value.t ? `\n\nКомментарий:\n${value.t}` : ''),
//               { parse_mode: 'HTML' },
//             );
//           },
//         },

//         '/g': {
//           action: 'setPropositionSentMark',
//           method: 'set',
//           title: 'Для гостя $guestName; пригласительная ссылка $value!{{не}} отправлена',
//         },
//       },
//     },
//   }),
// };

// export default config;
