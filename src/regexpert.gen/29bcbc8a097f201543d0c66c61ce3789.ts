/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/com/const');

namespace N29bcbc8a097f201543d0c66c61ce3789_1 {
  type $0 = string; // U1;
  type $simpleChord = `${U2}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U3;
  type $hardModificators = U8;
  type $bassChord = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type $simpleChord_bass = `${U14}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U15;
  type $hardModificators_bass = U20;
  type $repeats = U26 | '';
  type $simpleChord_lastRepeat = `${U28}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeat = `+` | U29;
  type $hardModificators_lastRepeat = U34;
  type $simpleChord_lastRepeatBass = `${U41}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeatBass = `+` | U42;
  type $hardModificators_lastRepeatBass = U47;
  
  type U1 = string; // `${`|` | ''}${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$lightModificators}${$hardModificators | ''}${$bassChord | ''}${$repeats}${`|` | ''}` | `.`;
  type U2 = `${string}${`#` | ''}` | `${string}`;
  type U3 = `${U4 | ''}${U6 | ''}`;
  type U4 = `${number | ``}${U5}`;
  type U5 = `min` | `sus` | `maj` | `dim` | `add`;
  type U6 = `${number}${U7 | ''}`;
  type U7 = `/${number}`;
  type U8 = `${U9 | ''}${U10 | ''}${U11 | ''}${U12 | ''}${U13 | ''}`;
  type U9 = `${string}5`;
  type U10 = `${string}7`;
  type U11 = `${string}9`;
  type U12 = `${string}11`;
  type U13 = `${string}13`;
  type U14 = `${string}${`#` | ''}` | `${string}`;
  type U15 = `${U16 | ''}${U18 | ''}`;
  type U16 = `${number | ``}${U17}`;
  type U17 = U5;
  type U18 = `${number}${U19 | ''}`;
  type U19 = `/${number}`;
  type U20 = `${U21 | ''}${U22 | ''}${U23 | ''}${U24 | ''}${U25 | ''}`;
  type U21 = `${string}5`;
  type U22 = `${string}7`;
  type U23 = `${string}9`;
  type U24 = `${string}11`;
  type U25 = `${string}13`;
  type U26 = string; // `${U27}${$simpleChord_lastRepeat}${$lightModificators_lastRepeat}${$hardModificators_lastRepeat | ''}${U40 | ''}`;
  type U27 = `${RepeatingString<`.`>}` | `-` | `${RepeatingString<`.`>}-`;
  type U28 = `${string}${`#` | ''}` | `${string}`;
  type U29 = `${U30 | ''}${U32 | ''}`;
  type U30 = `${number | ``}${U31}`;
  type U31 = U5;
  type U32 = `${number}${U33 | ''}`;
  type U33 = `/${number}`;
  type U34 = `${U35 | ''}${U36 | ''}${U37 | ''}${U38 | ''}${U39 | ''}`;
  type U35 = `${string}5`;
  type U36 = `${string}7`;
  type U37 = `${string}9`;
  type U38 = `${string}11`;
  type U39 = `${string}13`;
  type U40 = `/${$simpleChord_lastRepeatBass}${$lightModificators_lastRepeatBass}${$hardModificators_lastRepeatBass | ''}`;
  type U41 = `${string}${`#` | ''}` | `${string}`;
  type U42 = `${U43 | ''}${U45 | ''}`;
  type U43 = `${number | ``}${U44}`;
  type U44 = U5;
  type U45 = `${number}${U46 | ''}`;
  type U46 = `/${number}`;
  type U47 = `${U48 | ''}${U49 | ''}${U50 | ''}${U51 | ''}${U52 | ''}`;
  type U48 = `${string}5`;
  type U49 = `${string}7`;
  type U50 = `${string}9`;
  type U51 = `${string}11`;
  type U52 = `${string}13`;

  export interface I extends Record<
    `/^(?:\\|?\\.*-?(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?<bassChord>/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?(?<repeats>(?:(?:\\.+|-|\\.+-)(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?)*)\\|?|\\.)$/`,
    {
      $0: $0;
      simpleChord?: $simpleChord;
      lightModificators?: $lightModificators;
      hardModificators?: $hardModificators;
      bassChord?: $bassChord;
      simpleChord_bass?: $simpleChord_bass;
      lightModificators_bass?: $lightModificators_bass;
      hardModificators_bass?: $hardModificators_bass;
      repeats?: $repeats;
      simpleChord_lastRepeat?: $simpleChord_lastRepeat;
      lightModificators_lastRepeat?: $lightModificators_lastRepeat;
      hardModificators_lastRepeat?: $hardModificators_lastRepeat;
      simpleChord_lastRepeatBass?: $simpleChord_lastRepeatBass;
      lightModificators_lastRepeatBass?: $lightModificators_lastRepeatBass;
      hardModificators_lastRepeatBass?: $hardModificators_lastRepeatBass
    }
  > { '': '' }
}

namespace N29bcbc8a097f201543d0c66c61ce3789_2 {
  type $0 = string; // `${$simpleChord}${$lightModificators}${$hardModificators | ''}${U13 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2;
  type $hardModificators = U7;
  type $simpleChord_bass = `${U14}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U15;
  type $hardModificators_bass = U20;
  
  type U1 = `${string}${`#` | ''}` | `${string}`;
  type U2 = `${U3 | ''}${U5 | ''}`;
  type U3 = `${number | ``}${U4}`;
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
  type U15 = `${U16 | ''}${U18 | ''}`;
  type U16 = `${number | ``}${U17}`;
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
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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
  type $lightModificators = `+` | U2;
  type $hardModificators = U7;
  type $simpleChord_bass = `${U14}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U15;
  type $hardModificators_bass = U20;
  
  type U1 = `${string}${`#` | ''}` | `${string}` | `B`;
  type U2 = `${U3 | ''}${U5 | ''}`;
  type U3 = `${number | ``}${U4}`;
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
  type U15 = `${U16 | ''}${U18 | ''}`;
  type U16 = `${number | ``}${U17}`;
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
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{0,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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