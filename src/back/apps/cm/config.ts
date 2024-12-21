import { itIt, smylib } from 'shared/utils';
import { Executer } from '../../complect/executer/Executer';
import { filer } from '../../complect/filer/Filer';
import { FilerAppConfig } from '../../complect/filer/Filer.model';

const makeComNames = (wids: number | number[]): string => {
  const coms: { n: string; w: number }[] = filer.contents.cm?.cols?.data.coms;

  if (!Array.isArray(coms)) return '';

  const getComName = (wid: number) => coms.find(com => com.w === wid)?.n;

  if (smylib.isNum(wids)) return getComName(wids) ?? '';

  return wids.map(getComName).filter(itIt).join('\n');
};

const config: FilerAppConfig = {
  title: 'Песни возрождённых',
  requirements: {
    cols: null,
    meetings: null,
    chordTracks: null,
    mp3Rules: {
      level: 50,
    },
    eeStorage: {
      level: 50,
    },
  },
  actions: Executer.prepareActionList({
    '/chordTracks': {
      expected: {},
      level: 50,
      action: 'updateChordTracksDict',
      title: 'Изменение изображений аккордов',
      method: 'set_all',
      args: {
        value: '#Dict',
      },
    },
    '/cols': {
      '/cats': {
        '<add>': {
          level: 70,
          action: 'catAdd',
          title: 'Добавлена новая Категория',
          method: 'push',
          value: {
            w: '{catw}',
            s: [],
          },
          args: {
            catw: '#Number',
          },
        },
        '<rem>': {
          level: 100,
          action: 'catDel',
          title: 'Категория "$name" удалена',
          method: 'remove',
          value: ['w', '===', '{catw}'],
          args: {
            catw: '#Number',
          },
        },
        '/[w === {catw}]': {
          args: {
            catw: '#Number',
          },
          '/n': {
            level: 70,
            action: 'catRename',
            method: 'set',
            title: '$prev?{{Категория "$prev" переименована на}{Новой Категории задано имя}} "$value"',
            args: {
              value: '#String',
            },
          },
          '/s': {
            level: 70,
            action: 'catClearStack',
            method: 'set',
            title: 'У категории "$name" очищен список песен',
            value: [],
          },
          '/k': {
            level: 100,
            action: 'catSetKind',
            method: 'set',
            title: 'Категории "$name" присвоен тип $kindn',
            args: {
              value: ['full', 'list', 'dict', 'lang:ru', 'lang:ua'],
            },
          },
          '/m': {
            level: 30,
            action: 'catModified',
            method: 'set',
            args: {
              value: '#Number',
            },
          },
          '<comBinding>': {
            args: {
              comw: '#Number',
            },
            '/s': {
              '<bind>': {
                level: 50,
                action: 'catBindCom',
                title: 'К Категории "$name" прикреплена Песня "$comn"',
                method: 'push',
              },
              '<unbind>': {
                level: 50,
                action: 'catUnbindCom',
                title: 'Песня "$comn" откреплена от Категории "$name"',
                method: 'remove',
                value: ['.', '===', '{comw}'],
              },
            },
          },
          '/d': {
            expected: {},
            '/{comw}': {
              level: 50,
              action: 'setCatNativeNum',
              title: 'Песня "$name" $value?{{в категории "$catn" обозначена №$value}{отнесена к категории "$catn"}}',
              method: 'set',
              args: {
                catw: '#Number',
                value: '#Number',
              },
            },
            '<remove>': {
              '/{comw}': {
                level: 50,
                action: 'deleteCatNativeNum',
                title:
                  'Нативный номер$prev{{ (№$prev)}} песни "$name", ранее обозначенный в категории "$catn", был удалён',
                method: 'delete',
                args: {
                  catw: '#Number',
                },
              },
            },
          },
        },
      },
      '/coms': {
        '<rem>': {
          action: 'comDel',
          title: 'Песня "$name" удалена',
          level: 70,
          method: 'remove',
          value: ['w', '===', '{comw}'],
          args: {
            comw: '#Number',
          },
        },
        '<add>': {
          level: 50,
          action: 'comAdd',
          title: 'Добавлена новая Песня "$name;"',
          method: 'push',
          args: {
            value: '#Dict',
            name: '#String',
          },
        },
        '/[w === {comw}]': {
          args: {
            comw: '#Number',
          },
          '/{coln}': {
            level: 50,
            action: 'removeBlock',
            title: 'Из песни "$name" удалён $ink{{$value}{-й }}$switch{{$coln}{t}{Текстовый блок}{c}{блок Аккордов}}',
            method: 'remove',
            args: {
              value: '#Number',
              coln: ['c', 't'],
            },
          },
          '/{coln}/{newi}': {
            level: 50,
            action: 'replaceBlock',
            title:
              'В Песне "$name" $switch{{$coln}{t}{текстовый блок}{c}{блок Аккордов}{блок}} перемещён$ink{{$previ}{}{ с позиции }}$ink{{$newi}{}{ на позицию }}',
            method: 'set',
            args: {
              value: '#String',
              coln: ['t', 'c'],
              newi: '#Number',
            },
          },
          '/n': {
            level: 50,
            action: 'comRename',
            title: '$prev?{{Песня "$prev" переименована на}{Новой Песне задано имя}} "$value"',
            method: 'set',
            args: {
              value: '#String',
            },
          },
          '/b': {
            level: 50,
            action: 'comSetDefaultBemolType',
            title: 'Тип знаков песни "$name" изменён на $value!{{диезный}{бемольный}}',
            method: 'set',
            args: {
              value: '#Num',
            },
          },
          '/bpm': {
            level: 50,
            action: 'setComBeatsPerMinute',
            title: 'Значение ударов в минуту песни "$name" изменено на $value',
            method: 'set',
            args: {
              value: '#Number',
            },
          },
          '/s': {
            level: 50,
            action: 'setComMeterSize',
            title: 'Значение размерности песни "$name" изменено на $value/4',
            method: 'set',
            args: {
              value: [3, 4],
            },
          },
          '/p': {
            level: 60,
            action: 'comSetTransPosition',
            title: 'В Песне "$name" изменена тональность: "$prev" -> "$value"',
            method: 'set',
            args: {
              value: '#Number',
            },
          },
          '/l': {
            level: 50,
            action: 'comSetLangi',
            title: 'Язык в песне "$name", обозначен как $comLang{{$value}}',
            method: 'set',
            args: {
              value: '#Num',
            },
          },
          '/{coln}/{index}': {
            level: 50,
            action: 'changeBlocks',
            title:
              'В Песне "$name" $prev?{{изменён}{добавлен}} $ink{{$index}{-й}} блок $switch{{$coln}{t}{Текстов}{c}{Аккордов}}:\n\n<b>Было:</b>\n$prev;\n\n<b>Стало:</b>\n$value;',
            method: 'set',
            args: {
              value: '#String',
              coln: ['t', 'c'],
              index: '#Number',
            },
          },
          '/o/w': {
            level: 50,
            action: 'comResortOrders',
            title: 'В песне "$name" была пересортировка блоков',
            method: 'resort',
            args: {
              value: '#List',
            },
          },
          '/a': {
            level: 50,
            action: 'comSetAudio',
            title: 'В песне "$name" изменены ссылки на аудио-файлы',
            method: 'set',
            args: {
              value: '#String',
            },
          },
          '/k': {
            level: 50,
            action: 'comSetTranslationPushKind',
            title: 'В песне "$name" изменён вариант группировки слайдов для трансляций',
            method: 'set',
            args: {
              value: '#Number',
            },
          },
          '/o': {
            args: {
              ordw: '#Number',
            },
            '<add>': {
              level: 50,
              action: 'comAddOrderBlock',
              title: 'В песню "$name" добавлен Порядковый блок',
              method: 'insert_before_item_or_push',
              value: {
                findAfterItem: '{?findAfterOrder}',
                insertValue: {
                  w: '{ordw}',
                  c: '{?chordsi}',
                  t: '{texti}',
                  s: '{type}',
                  a: '{?anchor}',
                  u: '{?uniq}',
                  p: '{?positions}',
                },
              },
              args: {
                texti: '#number',
                chordsi: '#number',
                type: '#string',
                anchor: '#number',
                uniq: '#number',
                positions: '#list',
                findAfterOrder: '#list',
              },
            },
            '<addAnc>': {
              level: 50,
              action: 'comAddOrderAnchorBlock',
              title: 'Добавлена ссылка на $blockn в песне "$name"',
              method: 'push',
              value: {
                w: '{ordw}',
                a: '{anchor}',
              },
              args: {
                anchor: '#Number',
              },
            },
            '<rem>': {
              level: 50,
              action: 'removeOrderBlock',
              title: 'Из песни "$name" $isAnchor?{{удалена ссылка на}{удалён блок}} $blockn',
              method: 'remove',
              value: ['w', '===', '{ordw}'],
            },
            '/[w === {ordw}]': {
              '/s': {
                level: 50,
                action: 'comSetOrderType',
                title:
                  '$newBlockn{{В песне "$name" тип $blockn заменён на $newBlockn}{Изменение типа блока в песне "$name"}}',
                method: 'set',
                args: {
                  value: '#String',
                },
              },
              '/p': {
                expected: [],
                action: 'comSetOrderChordPositionBlock',
                method: 'set',
                title: 'В песне "$name", в порядковом  блоке полностью изменена аппликатура',
                args: {
                  value: '#List',
                },
                '/{linei}': {
                  level: 50,
                  action: 'comSetOrderChordPositionLine',
                  title:
                    'В песне "$name", в блоке $blockn;$ink{{$linei}{-й строке}{, в }} изменена аппликатура: $lineTitle',
                  method: 'set',
                  args: {
                    value: '#List',
                    linei: '#Number',
                  },
                },
              },
              '/u': {
                level: 50,
                action: 'addOrderUnitUniq',
                title: 'Блок $blockn в песне "$name" сделан целевым. ($value)',
                method: 'set',
                args: {
                  value: '#Number',
                },
              },
              '/{coln}': {
                level: 50,
                action: 'updateOrderStick',
                title:
                  'В Песне "$name" позиция в порядке $ink{{$ordi}} у $switch{{$coln}{t}{Текстовых блоков}{c}{блоков Аккордов}} $switch{{$value}{-1}{сброшена}{изменена в значение $value}}',
                method: 'set',
                args: {
                  coln: ['t', 'c'],
                },
              },
              '/o': {
                level: 50,
                action: 'comSetOrderOpenedBlock',
                title: 'В песне "$name" ссылка на $blockn $value?{{показана}{скрыта}} в свёрнутом режиме',
                method: 'set',
                args: {
                  value: '#Num',
                },
              },
              '/{fieldn}': {
                level: 50,
                action: 'comSetOrderStringBlock',
                title:
                  'В песне "$name", к $isa?{{ссылке на блок}{блоку}} $blockn прикреплён $i-й $ist?{{Текстовый блок}{блок Аккордов}}',
                method: 'set',
                args: {
                  fieldn: ['t', 'c'],
                  value: '#number',
                },
              },
              '/r': {
                level: 50,
                action: 'comSetOrderRepeatBlock',
                title:
                  'В песне "$name" $value!!{{значение повторений $isAnchor?{{ссылки на блок}{блока}} $blockn было сброшено}{$isAnchor?{{ссылка на }}блок $blockn повторяется $value $declension{{$value}{раз}{раза}{раз}}}}',
                method: 'set',
                args: {
                  value: ['#number', '#object'],
                },
              },
              '/v': {
                level: 50,
                action: 'comSetOrderVisibleSign',
                title:
                  'В песне "$name" $isAnchor?{{ссылка на }}блок "$blockn" сделан$isAnchor?{{а}} $value!{{не}}видим$isAnchor?{{ой}{ым}}',
                method: 'set',
                args: {
                  value: '#Num',
                },
              },
              '/e': {
                level: 50,
                action: 'comSetOrderEmptiedVal',
                title:
                  'В песне "$name" название $isAnchor?{{ссылки на блок}{блока}} "$blockn" $value!{{вставлено}{убрано}}',
                method: 'set',
                args: {
                  value: '#Num',
                },
              },
              '/f': {
                expected: {},
                '/{fieldn}': {
                  level: 50,
                  action: 'comSetOrderFieldValue',
                  title:
                    'В песне "$name" блоку "$blockn" установлен параметр $switch{{$fieldn}{md}{модулирования}} в значение "$value"',
                  method: 'set',
                  args: {
                    value: '#Number',
                  },
                },
              },
              '<inheritance>': {
                '/inh': {
                  expected: {},
                  '/{fieldn}': {
                    args: {
                      fieldn: ['r', 'v'],
                    },
                    expected: [],
                    '/{inhIndex}': {
                      level: 50,
                      action: 'setAnchorInheritValue',
                      title:
                        'В песне "$name" для $ink{{$ink{{$inhIndex}}}}-й части ссылки на блок "$blockn" $value{{установлено новое значение $switch{{$fieldn}{r}{повторений}} в значение "$value"}{значение $switch{{$fieldn}{r}{повторений}} было удалено}}',
                      method: 'set',
                      args: {
                        value: '#any',
                        inhIndex: '#Number',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/mp3Rules': {
      expected: [],
      '<add>': {
        action: 'addMp3Rule',
        method: 'push',
        args: {
          value: '#Dict',
        },
      },
      '/[w === {mp3w}]': {
        action: 'updateMp3Rule',
        title: 'Изменено MP3 правило',
        method: 'set_all',
        args: {
          mp3w: '#Number',
          value: '#Dict',
        },
      },
    },
    '<canEditEERules>': {
      level: 80,
      action: 'canEditEERules',
    },
    '/eeStorage/{word}': {
      action: 'setEERuleWordTrack',
      title: "Задано правило правописания е/ё для слова '$word'",
      method: 'set',
      args: {
        word: '#String',
        value: ['#list', '#number'],
      },
    },
    '/meetings': {
      action: 'meetingsInit',
      value: {
        contexts: {},
        names: [],
        events: [],
      },
      '/names': {
        action: 'addMeetingsName',
        method: 'push',
        title: 'Добавлено новое наименование контекста "$value"',
        args: {
          value: '#String',
        },
      },
      '/contexts/{contextw}': {
        action: 'addMeetingsContext',
        method: 'set',
        title: 'Добавлен новый контекст для событий',
        value: {
          c: '{value}',
        },
        args: {
          contextw: '#Number',
          value: '#List',
        },
      },
      '/events': {
        args: {
          eventn: '#String',
          eventw: '#Number',
        },
        '<add>': {
          level: 50,
          action: 'addMeetingsEvent',
          title: 'Добавлено новое событие "$eventn"',
          method: 'push',
          value: {
            w: '{eventw}',
            n: '{eventn}',
            b: '{begin}',
            e: '{end}',
            s: [],
            c: '{contextw}',
          },
          args: {
            begin: '#Number',
            end: '#Number',
            contextw: '#Number',
          },
        },
        '<rem>': {
          level: 50,
          action: 'remMeetingEvent',
          title: 'Событие "$eventn" удалено',
          method: 'remove',
          value: ['w', '===', '{eventw}'],
        },
        '/[w === {eventw}]': {
          '<stack>': {
            side: {
              '/h': {
                method: 'push',
                value: {
                  w: '{@setNewWid()}',
                  s: '{$$currentValue}',
                },
              },
            },
            '/s': {
              level: 50,
              action: 'setMeetingEventStack',
              shortTitle: 'В событии "$eventn" изменён список песен',
              title: args => {
                return `В событии "$eventn" изменён список песен:\n\n${makeComNames(args.value as number[])}`;
              },
              method: 'set',
              args: {
                value: '#List',
              },
            },
          },
          '<ctx>': {
            level: 50,
            action: 'setMeetingEventContext',
            title: 'Событие "$eventn" перемещено в другой контекст',
            method: 'set_all',
            value: {
              c: '{contextw}',
            },
            args: {
              contextw: '#Number',
            },
          },
          '/r': {
            level: 50,
            action: 'setMeetingEventRegular',
            title: 'Событие "$eventn" сделано $value!{{не}}регулярным',
            method: 'set',
          },
          '/n': {
            level: 50,
            action: 'meetingEventRename',
            title: 'Событие "$prev" переименовано в "$value"',
            method: 'set',
          },
        },
      },
    },
  }),
};

export default config;
