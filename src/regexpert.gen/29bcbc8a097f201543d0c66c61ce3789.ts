/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/com/const');

namespace N29bcbc8a097f201543d0c66c61ce3789_1 {
  type $0 = string; // U1;
  type $simpleChord = `${U2}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | `aug` | `${number | ``}${U4}${U5}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U6}` | `${number | ``}sus${U7}` | `${U8}${U9 | ''}`;
  type $hardModificators = U10;
  type $bassChord = `/${U16}`;
  type $repeats = U17 | '';
  type $simpleChord_lastRepeat = `${U19}${`m` | ''}${`7` | ''}`;
  type $lightModificators_lastRepeat = `+` | `aug` | `${number | ``}${U21}${U22}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U23}` | `${number | ``}sus${U24}` | `${U25}${U26 | ''}`;
  type $hardModificators_lastRepeat = U27;
  
  type U1 = string; // `${`|` | ''}${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$lightModificators | ''}${$hardModificators | ''}${$bassChord | ''}${$repeats}${`|` | ''}` | `.`;
  type U2 = U3;
  type U3 = `${string}${`#` | ''}` | `${string}`;
  type U4 = `min` | `maj`;
  type U5 = `7` | `9` | `11` | `13`;
  type U6 = `9` | `11` | `13`;
  type U7 = `2` | `4`;
  type U8 = `${number}` | `1${number}`;
  type U9 = `/${number}`;
  type U10 = `${U11 | ''}${U12 | ''}${U13 | ''}${U14 | ''}${U15 | ''}`;
  type U11 = `${string}5`;
  type U12 = `${string}7`;
  type U13 = `${string}9`;
  type U14 = `${string}11`;
  type U15 = `${string}13`;
  type U16 = `${string}${`#` | ''}` | `${string}`;
  type U17 = `${U18}${$simpleChord_lastRepeat}${$lightModificators_lastRepeat | ''}${$hardModificators_lastRepeat | ''}${U33 | ''}` | `${`.` | ''}-.`;
  type U18 = `${RepeatingString<`.`>}${`-` | ''}` | `-`;
  type U19 = U20;
  type U20 = `${string}${`#` | ''}` | `${string}`;
  type U21 = U4;
  type U22 = U5;
  type U23 = U6;
  type U24 = U7;
  type U25 = `${number}` | `1${number}`;
  type U26 = `/${number}`;
  type U27 = `${U28 | ''}${U29 | ''}${U30 | ''}${U31 | ''}${U32 | ''}`;
  type U28 = `${string}5`;
  type U29 = `${string}7`;
  type U30 = `${string}9`;
  type U31 = `${string}11`;
  type U32 = `${string}13`;
  type U33 = `/${U34}`;
  type U34 = `${string}${`#` | ''}` | `${string}`;

  export interface I extends Record<
    `/^(?:\\|?\\.*-?(?<simpleChord>(?:(?:[ACDFG]#?|[EH]))m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?<bassChord>/(?:[ACDFG]#?|[EH]))?(?<repeats>(?:(?:\\.+-?|-)(?<simpleChord>(?:(?:[ACDFG]#?|[EH]))m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?:[ACDFG]#?|[EH]))?|\\.?-\\.)*)\\|?|\\.)$/`,
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
  type $0 = string; // `${$simpleChord}${$lightModificators | ''}${$hardModificators | ''}${U15 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | `aug` | `${number | ``}${U3}${U4}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U5}` | `${number | ``}sus${U6}` | `${U7}${U8 | ''}`;
  type $hardModificators = U9;
  type $simpleChord_bass = `${U16}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | `aug` | `${number | ``}${U18}${U19}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U20}` | `${number | ``}sus${U21}` | `${U22}${U23 | ''}`;
  type $hardModificators_bass = U24;
  
  type U1 = U2;
  type U2 = `${string}${`#` | ''}` | `${string}`;
  type U3 = `min` | `maj`;
  type U4 = `7` | `9` | `11` | `13`;
  type U5 = `9` | `11` | `13`;
  type U6 = `2` | `4`;
  type U7 = `${number}` | `1${number}`;
  type U8 = `/${number}`;
  type U9 = `${U10 | ''}${U11 | ''}${U12 | ''}${U13 | ''}${U14 | ''}`;
  type U10 = `${string}5`;
  type U11 = `${string}7`;
  type U12 = `${string}9`;
  type U13 = `${string}11`;
  type U14 = `${string}13`;
  type U15 = `/${$simpleChord_bass}${$lightModificators_bass | ''}${$hardModificators_bass | ''}`;
  type U16 = U17;
  type U17 = `${string}${`#` | ''}` | `${string}`;
  type U18 = U3;
  type U19 = U4;
  type U20 = U5;
  type U21 = U6;
  type U22 = `${number}` | `1${number}`;
  type U23 = `/${number}`;
  type U24 = `${U25 | ''}${U26 | ''}${U27 | ''}${U28 | ''}${U29 | ''}`;
  type U25 = `${string}5`;
  type U26 = `${string}7`;
  type U27 = `${string}9`;
  type U28 = `${string}11`;
  type U29 = `${string}13`;

  export interface I extends Record<
    `/^(?<simpleChord>(?:(?:[ACDFG]#?|[EH]))m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:(?:[ACDFG]#?|[EH]))m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      lightModificators?: $lightModificators;
      hardModificators?: $hardModificators;
      simpleChord_bass: $simpleChord_bass;
      lightModificators_bass?: $lightModificators_bass;
      hardModificators_bass?: $hardModificators_bass
    }
  > { '': '' }
}

namespace N29bcbc8a097f201543d0c66c61ce3789_3 {
  type $0 = string; // `${$simpleChord}${$lightModificators | ''}${$hardModificators | ''}${U15 | ''}`;
  type $simpleChord = `${U1}${`m` | ''}${`7` | ''}`;
  type $lightModificators = `+` | `aug` | `${number | ``}${U3}${U4}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U5}` | `${number | ``}sus${U6}` | `${U7}${U8 | ''}`;
  type $hardModificators = U9;
  type $simpleChord_bass = `${U16}${`m` | ''}${`7` | ''}`;
  type $lightModificators_bass = `+` | `aug` | `${number | ``}${U18}${U19}` | `${number | ``}dim${`7` | ''}` | `${number | ``}add${U20}` | `${number | ``}sus${U21}` | `${U22}${U23 | ''}`;
  type $hardModificators_bass = U24;
  
  type U1 = U2 | `B`;
  type U2 = `${string}${`#` | ''}` | `${string}`;
  type U3 = `min` | `maj`;
  type U4 = `7` | `9` | `11` | `13`;
  type U5 = `9` | `11` | `13`;
  type U6 = `2` | `4`;
  type U7 = `${number}` | `1${number}`;
  type U8 = `/${number}`;
  type U9 = `${U10 | ''}${U11 | ''}${U12 | ''}${U13 | ''}${U14 | ''}`;
  type U10 = `${string}5`;
  type U11 = `${string}7`;
  type U12 = `${string}9`;
  type U13 = `${string}11`;
  type U14 = `${string}13`;
  type U15 = `/${$simpleChord_bass}${$lightModificators_bass | ''}${$hardModificators_bass | ''}`;
  type U16 = U17 | `B`;
  type U17 = `${string}${`#` | ''}` | `${string}`;
  type U18 = U3;
  type U19 = U4;
  type U20 = U5;
  type U21 = U6;
  type U22 = `${number}` | `1${number}`;
  type U23 = `/${number}`;
  type U24 = `${U25 | ''}${U26 | ''}${U27 | ''}${U28 | ''}${U29 | ''}`;
  type U25 = `${string}5`;
  type U26 = `${string}7`;
  type U27 = `${string}9`;
  type U28 = `${string}11`;
  type U29 = `${string}13`;

  export interface I extends Record<
    `/^(?<simpleChord>(?:(?:[ACDFG]#?|[EH])|B)m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?(?:/(?<simpleChord>(?:(?:[ACDFG]#?|[EH])|B)m?7?)(?<lightModificators>\\+|aug|\\d{0,2}(?:min|maj)(?:7|9|11|13)|\\d{0,2}dim7?|\\d{0,2}add(?:9|11|13)|\\d{0,2}sus(?:2|4)|(?:[5679]|1[13])(?:/\\d{1,2})?)?(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))?)?$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      lightModificators?: $lightModificators;
      hardModificators?: $hardModificators;
      simpleChord_bass: $simpleChord_bass;
      lightModificators_bass?: $lightModificators_bass;
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