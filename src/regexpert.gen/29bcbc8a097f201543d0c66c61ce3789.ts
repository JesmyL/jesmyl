/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/com/const');

namespace N29bcbc8a097f201543d0c66c61ce3789_1 {
  type $0 = string; // `${`|` | ''}${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$lightModificators}${$hardModificators | ''}${$bassChord | ''}${$repeats}${`|` | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | U2;
  type $hardModificators = U7;
  type $bassChord = `/${$simpleChord_bass}${$lightModificators_bass}${$hardModificators_bass | ''}`;
  type $simpleChord_bass = `${U13}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | U14;
  type $hardModificators_bass = U19;
  type $repeats = U25 | '';
  type $simpleChord_lastRepeat = `${U27}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeat = `+` | U28;
  type $hardModificators_lastRepeat = U33;
  type $simpleChord_lastRepeatBass = `${U40}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeatBass = `+` | U41;
  type $hardModificators_lastRepeatBass = U46;
  
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
  type U13 = `${string}${`#` | ''}` | `${string}`;
  type U14 = `${U15 | ''}${U17 | ''}`;
  type U15 = `${number | ``}${U16}`;
  type U16 = U4;
  type U17 = `${number}${U18 | ''}`;
  type U18 = `/${number}`;
  type U19 = `${U20 | ''}${U21 | ''}${U22 | ''}${U23 | ''}${U24 | ''}`;
  type U20 = `${string}5`;
  type U21 = `${string}7`;
  type U22 = `${string}9`;
  type U23 = `${string}11`;
  type U24 = `${string}13`;
  type U25 = string; // `${U26}${$simpleChord_lastRepeat}${$lightModificators_lastRepeat}${$hardModificators_lastRepeat | ''}${U39 | ''}`;
  type U26 = `${RepeatingString<`.`>}` | `-` | `${RepeatingString<`.`>}-`;
  type U27 = `${string}${`#` | ''}` | `${string}`;
  type U28 = `${U29 | ''}${U31 | ''}`;
  type U29 = `${number | ``}${U30}`;
  type U30 = U4;
  type U31 = `${number}${U32 | ''}`;
  type U32 = `/${number}`;
  type U33 = `${U34 | ''}${U35 | ''}${U36 | ''}${U37 | ''}${U38 | ''}`;
  type U34 = `${string}5`;
  type U35 = `${string}7`;
  type U36 = `${string}9`;
  type U37 = `${string}11`;
  type U38 = `${string}13`;
  type U39 = `/${$simpleChord_lastRepeatBass}${$lightModificators_lastRepeatBass}${$hardModificators_lastRepeatBass | ''}`;
  type U40 = `${string}${`#` | ''}` | `${string}`;
  type U41 = `${U42 | ''}${U44 | ''}`;
  type U42 = `${number | ``}${U43}`;
  type U43 = U4;
  type U44 = `${number}${U45 | ''}`;
  type U45 = `/${number}`;
  type U46 = `${U47 | ''}${U48 | ''}${U49 | ''}${U50 | ''}${U51 | ''}`;
  type U47 = `${string}5`;
  type U48 = `${string}7`;
  type U49 = `${string}9`;
  type U50 = `${string}11`;
  type U51 = `${string}13`;

  export interface I extends Record<
    `/^\\|?\\.*-?(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?<bassChord>/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?(?<repeats>(?:(?:\\.+|-|\\.+-)(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?)*)\\|?$/`,
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
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH])m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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
    `/^(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:[ACDFG]#?|[EH]|B)m?7?)(?<lightModificators>\\+|(?:(?:\\d{,2}(?:min|sus|maj|dim|add))?(?:\\d{1,2}(?:/\\d{1,2})?)?))(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
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