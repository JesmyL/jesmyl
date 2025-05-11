/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/ComUtils');

namespace N65bd67bbcbd7186a7d10a038bb18fd15_1 {
  type $0 = string; // `${''|`.${string}`}${`-` | ''}${$1}${$2}${$7 | ''}${$bassChord | ''}${$16 | ''}`;
  type $1 = `${string}${`#` | ''}` | string;
  type $2 = `+` | `11` | $3;
  type $3 = `${$4 | ''}${$5 | ''}`;
  type $4 = `m` | `min` | `${`7` | ''}sus` | `maj` | `dim` | `add`;
  type $5 = `${number}${$6 | ''}`;
  type $6 = `/${number}`;
  type $7 = `${string}${U1}`;
  type $bassChord = `/${$9}${$10}${$15 | ''}`;
  type $9 = $1;
  type $10 = `+` | `11` | $11;
  type $11 = `${$12 | ''}${$13 | ''}`;
  type $12 = $4;
  type $13 = `${number}${$14 | ''}`;
  type $14 = $6;
  type $15 = `${string}${U2}`;
  type $16 = `${$dotSeparations}${$18}${$19}${$24 | ''}${$25 | ''}`;
  type $dotSeparations = `.${string}` | `-` | `.${string}-`;
  type $18 = $1;
  type $19 = `+` | `11` | $20;
  type $20 = `${$21 | ''}${$22 | ''}`;
  type $21 = $4;
  type $22 = `${number}${$23 | ''}`;
  type $23 = $6;
  type $24 = `${string}${U3}`;
  type $25 = `/${$26}${$27}${$32 | ''}`;
  type $26 = $1;
  type $27 = `+` | `11` | $28;
  type $28 = `${$29 | ''}${$30 | ''}`;
  type $29 = $4;
  type $30 = `${number}${$31 | ''}`;
  type $31 = $6;
  type $32 = `${string}${U4}`;
  
  type U1 = `5` | `7` | `9` | `11` | `13`;
  type U2 = `5` | `7` | `9` | `11` | `13`;
  type U3 = `5` | `7` | `9` | `11` | `13`;
  type U4 = `5` | `7` | `9` | `11` | `13`;

  export interface I extends Record<
    `/^\\.*-?([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*(?<bassChord>/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*)?((?<dotSeparations>\\.+|-|\\.+-)([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*(/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*)?)*$/`,
    {
      $0: $0;
      $1: $1;
      $2: $2;
      $3?: $3;
      $4?: $4;
      $5?: $5;
      $6?: $6;
      $7?: $7;
      bassChord?: $bassChord;
      $9?: $9;
      $10?: $10;
      $11?: $11;
      $12?: $12;
      $13?: $13;
      $14?: $14;
      $15?: $15;
      $16?: $16;
      dotSeparations?: $dotSeparations;
      $18?: $18;
      $19?: $19;
      $20?: $20;
      $21?: $21;
      $22?: $22;
      $23?: $23;
      $24?: $24;
      $25?: $25;
      $26?: $26;
      $27?: $27;
      $28?: $28;
      $29?: $29;
      $30?: $30;
      $31?: $31;
      $32?: $32
    }
  > { '': '' }
}

namespace N65bd67bbcbd7186a7d10a038bb18fd15_2 {
  type $0 = `${$1}${$2}${$7 | ''}${$8 | ''}`;
  type $1 = `${string}${`#` | ''}` | string;
  type $2 = `+` | `11` | $3;
  type $3 = `${$4 | ''}${$5 | ''}`;
  type $4 = `m` | `min` | `${`7` | ''}sus` | `maj` | `dim` | `add`;
  type $5 = `${number}${$6 | ''}`;
  type $6 = `/${number}`;
  type $7 = `${string}${U1}`;
  type $8 = `/${$9}${$10}${$15 | ''}`;
  type $9 = $1;
  type $10 = `+` | `11` | $11;
  type $11 = `${$12 | ''}${$13 | ''}`;
  type $12 = $4;
  type $13 = `${number}${$14 | ''}`;
  type $14 = $6;
  type $15 = `${string}${U2}`;
  
  type U1 = `5` | `7` | `9` | `11` | `13`;
  type U2 = `5` | `7` | `9` | `11` | `13`;

  export interface I extends Record<
    `/^([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*(/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))([#b](?:5|7|9|11|13))*)?$/`,
    {
      $0: $0;
      $1: $1;
      $2: $2;
      $3?: $3;
      $4?: $4;
      $5?: $5;
      $6?: $6;
      $7?: $7;
      $8?: $8;
      $9?: $9;
      $10?: $10;
      $11?: $11;
      $12?: $12;
      $13?: $13;
      $14?: $14;
      $15?: $15
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N65bd67bbcbd7186a7d10a038bb18fd15_1.I,
    N65bd67bbcbd7186a7d10a038bb18fd15_2.I {
    '': ''
}