/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/com/const');

namespace N29bcbc8a097f201543d0c66c61ce3789_1 {
  type $0 = string; // `${`|` | ''}${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$lightModificators}${$hardModificators | ''}${$bassChord | ''}${$repeats}${`|` | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2;
  type $hardModificators = U6;
  type $bassChord = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type $simpleChord_bass = `${U12}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U13;
  type $hardModificators_bass = U17;
  type $repeats = U23 | '';
  type $simpleChord_lastRepeat = `${U25}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeat = `+` | U26;
  type $hardModificators_lastRepeat = U30;
  type $simpleChord_lastRepeatBass = `${U37}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeatBass = `+` | U38;
  type $hardModificators_lastRepeatBass = U42;
  
  type U1 = `${string}${`#` | ''}` | string;
  type U2 = `${U3 | ''}${U4 | ''}`;
  type U3 = `min` | `sus` | `maj` | `dim` | `add`;
  type U4 = `${number}${U5 | ''}`;
  type U5 = `/${number}`;
  type U6 = `${U7 | ''}${U8 | ''}${U9 | ''}${U10 | ''}${U11 | ''}`;
  type U7 = `${string}5`;
  type U8 = `${string}7`;
  type U9 = `${string}9`;
  type U10 = `${string}11`;
  type U11 = `${string}13`;
  type U12 = U1;
  type U13 = `${U14 | ''}${U15 | ''}`;
  type U14 = U3;
  type U15 = `${number}${U16 | ''}`;
  type U16 = U5;
  type U17 = `${U18 | ''}${U19 | ''}${U20 | ''}${U21 | ''}${U22 | ''}`;
  type U18 = U7;
  type U19 = U8;
  type U20 = U9;
  type U21 = U10;
  type U22 = U11;
  type U23 = string; // `${U24}${$simpleChord_lastRepeat}${$lightModificators_lastRepeat}${$hardModificators_lastRepeat | ''}${U36 | ''}`;
  type U24 = `${RepeatingString<`.`>}` | `-` | `${RepeatingString<`.`>}-`;
  type U25 = U1;
  type U26 = `${U27 | ''}${U28 | ''}`;
  type U27 = U3;
  type U28 = `${number}${U29 | ''}`;
  type U29 = U5;
  type U30 = `${U31 | ''}${U32 | ''}${U33 | ''}${U34 | ''}${U35 | ''}`;
  type U31 = U7;
  type U32 = U8;
  type U33 = U9;
  type U34 = U10;
  type U35 = U11;
  type U36 = `/${$simpleChord_lastRepeatBass}${$lightModificators_lastRepeatBass}${$hardModificators_lastRepeatBass | ''}`;
  type U37 = U1;
  type U38 = `${U39 | ''}${U40 | ''}`;
  type U39 = U3;
  type U40 = `${number}${U41 | ''}`;
  type U41 = U5;
  type U42 = `${U43 | ''}${U44 | ''}${U45 | ''}${U46 | ''}${U47 | ''}`;
  type U43 = U7;
  type U44 = U8;
  type U45 = U9;
  type U46 = U10;
  type U47 = U11;

  export interface I extends Record<
    `/^\\|?\\.*-?(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?<bassChord>/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?(?<repeats>(?:(?:\\.+|-|\\.+-)(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?)*)\\|?$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      lightModificators: $lightModificators;
      hardModificators?: $hardModificators;
      bassChord?: $bassChord;
      simpleChord_bass?: $simpleChord_bass;
      lightModificators_bass?: $lightModificators_bass;
      hardModificators_bass?: $hardModificators_bass;
      repeats: $repeats;
      simpleChord_lastRepeat: $simpleChord_lastRepeat;
      lightModificators_lastRepeat: $lightModificators_lastRepeat;
      hardModificators_lastRepeat?: $hardModificators_lastRepeat;
      simpleChord_lastRepeatBass: $simpleChord_lastRepeatBass;
      lightModificators_lastRepeatBass: $lightModificators_lastRepeatBass;
      hardModificators_lastRepeatBass?: $hardModificators_lastRepeatBass
    }
  > { '': '' }
}

namespace N29bcbc8a097f201543d0c66c61ce3789_2 {
  type $0 = string; // `${$simpleChord}${$lightModificators}${$hardModificators | ''}${U12 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2;
  type $hardModificators = U6;
  type $simpleChord_bass = `${U13}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U14;
  type $hardModificators_bass = U18;
  
  type U1 = `${string}${`#` | ''}` | string;
  type U2 = `${U3 | ''}${U4 | ''}`;
  type U3 = `min` | `sus` | `maj` | `dim` | `add`;
  type U4 = `${number}${U5 | ''}`;
  type U5 = `/${number}`;
  type U6 = `${U7 | ''}${U8 | ''}${U9 | ''}${U10 | ''}${U11 | ''}`;
  type U7 = `${string}5`;
  type U8 = `${string}7`;
  type U9 = `${string}9`;
  type U10 = `${string}11`;
  type U11 = `${string}13`;
  type U12 = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type U13 = U1;
  type U14 = `${U15 | ''}${U16 | ''}`;
  type U15 = U3;
  type U16 = `${number}${U17 | ''}`;
  type U17 = U5;
  type U18 = `${U19 | ''}${U20 | ''}${U21 | ''}${U22 | ''}${U23 | ''}`;
  type U19 = U7;
  type U20 = U8;
  type U21 = U9;
  type U22 = U10;
  type U23 = U11;

  export interface I extends Record<
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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
  type $0 = string; // `${$simpleChord}${$lightModificators}${$hardModificators | ''}${U12 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2;
  type $hardModificators = U6;
  type $simpleChord_bass = `${U13}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U14;
  type $hardModificators_bass = U18;
  
  type U1 = `${string}${`#` | ''}` | string | `B`;
  type U2 = `${U3 | ''}${U4 | ''}`;
  type U3 = `min` | `sus` | `maj` | `dim` | `add`;
  type U4 = `${number}${U5 | ''}`;
  type U5 = `/${number}`;
  type U6 = `${U7 | ''}${U8 | ''}${U9 | ''}${U10 | ''}${U11 | ''}`;
  type U7 = `${string}5`;
  type U8 = `${string}7`;
  type U9 = `${string}9`;
  type U10 = `${string}11`;
  type U11 = `${string}13`;
  type U12 = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type U13 = U1;
  type U14 = `${U15 | ''}${U16 | ''}`;
  type U15 = U3;
  type U16 = `${number}${U17 | ''}`;
  type U17 = U5;
  type U18 = `${U19 | ''}${U20 | ''}${U21 | ''}${U22 | ''}${U23 | ''}`;
  type U19 = U7;
  type U20 = U8;
  type U21 = U9;
  type U22 = U10;
  type U23 = U11;

  export interface I extends Record<
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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