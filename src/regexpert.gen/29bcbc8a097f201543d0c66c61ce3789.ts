/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/com/const');

namespace N29bcbc8a097f201543d0c66c61ce3789_1 {
  type $0 = string; // U1;
  type $simpleChord = `${U2}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U3 | '';
  type $hardModificators = U8;
  type $bassChord = `/${string}${`#` | ''}` | `${string}`;
  type $repeats = U14 | '';
  type $simpleChord_lastRepeat = `${U16}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeat = `+` | U17 | '';
  type $hardModificators_lastRepeat = U22;
  
  type U1 = string; // `${`|` | ''}${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$lightModificators}${$hardModificators | ''}${$bassChord | ''}${$repeats}${`|` | ''}` | `.`;
  type U2 = `${string}${`#` | ''}` | `${string}`;
  type U3 = U4;
  type U4 = `${number | ``}${U5}${U6 | ''}`;
  type U5 = `min` | `sus` | `maj` | `dim` | `add`;
  type U6 = `${number}${U7 | ''}`;
  type U7 = `/${number}`;
  type U8 = `${U9 | ''}${U10 | ''}${U11 | ''}${U12 | ''}${U13 | ''}`;
  type U9 = `${string}5`;
  type U10 = `${string}7`;
  type U11 = `${string}9`;
  type U12 = `${string}11`;
  type U13 = `${string}13`;
  type U14 = `${U15}${$simpleChord_lastRepeat}${$lightModificators_lastRepeat}${$hardModificators_lastRepeat | ''}${U28 | ''}`;
  type U15 = `${RepeatingString<`.`>}` | `-` | `${RepeatingString<`.`>}-`;
  type U16 = `${string}${`#` | ''}` | `${string}`;
  type U17 = U18;
  type U18 = `${number | ``}${U19}${U20 | ''}`;
  type U19 = U5;
  type U20 = `${number}${U21 | ''}`;
  type U21 = `/${number}`;
  type U22 = `${U23 | ''}${U24 | ''}${U25 | ''}${U26 | ''}${U27 | ''}`;
  type U23 = `${string}5`;
  type U24 = `${string}7`;
  type U25 = `${string}9`;
  type U26 = `${string}11`;
  type U27 = `${string}13`;
  type U28 = `/${string}${`#` | ''}` | `${string}`;

  export interface I extends Record<
    `/^(?:\\|?\\.*-?(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?<bassChord>/[ACDFG]#?|[EH])?(?<repeats>(?:(?:\\.+|-|\\.+-)(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/[ACDFG]#?|[EH])?)*)\\|?|\\.)$/`,
    {
      $0: $0;
      simpleChord?: $simpleChord;
      lightModificators?: $lightModificators;
      hardModificators?: $hardModificators;
      bassChord?: $bassChord;
      repeats?: $repeats;
      simpleChord_lastRepeat?: $simpleChord_lastRepeat;
      lightModificators_lastRepeat?: $lightModificators_lastRepeat;
      hardModificators_lastRepeat?: $hardModificators_lastRepeat
    }
  > { '': '' }
}

namespace N29bcbc8a097f201543d0c66c61ce3789_2 {
  type $0 = string; // `${$simpleChord}${$lightModificators}${$hardModificators | ''}${U13 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2 | '';
  type $hardModificators = U7;
  type $simpleChord_bass = `${U14}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U15 | '';
  type $hardModificators_bass = U20;
  
  type U1 = `${string}${`#` | ''}` | `${string}`;
  type U2 = U3;
  type U3 = `${number | ``}${U4}${U5 | ''}`;
  type U4 = `min` | `sus` | `maj` | `dim` | `add`;
  type U5 = `${number}${U6 | ''}`;
  type U6 = `/${number}`;
  type U7 = `${U8 | ''}${U9 | ''}${U10 | ''}${U11 | ''}${U12 | ''}`;
  type U8 = `${string}5`;
  type U9 = `${string}7`;
  type U10 = `${string}9`;
  type U11 = `${string}11`;
  type U12 = `${string}13`;
  type U13 = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type U14 = `${string}${`#` | ''}` | `${string}`;
  type U15 = U16;
  type U16 = `${number | ``}${U17}${U18 | ''}`;
  type U17 = U4;
  type U18 = `${number}${U19 | ''}`;
  type U19 = `/${number}`;
  type U20 = `${U21 | ''}${U22 | ''}${U23 | ''}${U24 | ''}${U25 | ''}`;
  type U21 = `${string}5`;
  type U22 = `${string}7`;
  type U23 = `${string}9`;
  type U24 = `${string}11`;
  type U25 = `${string}13`;

  export interface I extends Record<
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      lightModificators: $lightModificators;
      hardModificators?: $hardModificators;
      simpleChord_bass: $simpleChord_bass;
      lightModificators_bass: $lightModificators_bass;
      hardModificators_bass?: $hardModificators_bass
    }
  > { '': '' }
}

namespace N29bcbc8a097f201543d0c66c61ce3789_3 {
  type $0 = string; // `${$simpleChord}${$lightModificators}${$hardModificators | ''}${U13 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2 | '';
  type $hardModificators = U7;
  type $simpleChord_bass = `${U14}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U15 | '';
  type $hardModificators_bass = U20;
  
  type U1 = `${string}${`#` | ''}` | `${string}` | `B`;
  type U2 = U3;
  type U3 = `${number | ``}${U4}${U5 | ''}`;
  type U4 = `min` | `sus` | `maj` | `dim` | `add`;
  type U5 = `${number}${U6 | ''}`;
  type U6 = `/${number}`;
  type U7 = `${U8 | ''}${U9 | ''}${U10 | ''}${U11 | ''}${U12 | ''}`;
  type U8 = `${string}5`;
  type U9 = `${string}7`;
  type U10 = `${string}9`;
  type U11 = `${string}11`;
  type U12 = `${string}13`;
  type U13 = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type U14 = `${string}${`#` | ''}` | `${string}` | `B`;
  type U15 = U16;
  type U16 = `${number | ``}${U17}${U18 | ''}`;
  type U17 = U4;
  type U18 = `${number}${U19 | ''}`;
  type U19 = `/${number}`;
  type U20 = `${U21 | ''}${U22 | ''}${U23 | ''}${U24 | ''}${U25 | ''}`;
  type U21 = `${string}5`;
  type U22 = `${string}7`;
  type U23 = `${string}9`;
  type U24 = `${string}11`;
  type U25 = `${string}13`;

  export interface I extends Record<
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add)(?:\\d{1,2}(?:/\\d{1,2})?)?))?)(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      lightModificators: $lightModificators;
      hardModificators?: $hardModificators;
      simpleChord_bass: $simpleChord_bass;
      lightModificators_bass: $lightModificators_bass;
      hardModificators_bass?: $hardModificators_bass
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N29bcbc8a097f201543d0c66c61ce3789_1.I,
    N29bcbc8a097f201543d0c66c61ce3789_2.I,
    N29bcbc8a097f201543d0c66c61ce3789_3.I {
    '': ''
}