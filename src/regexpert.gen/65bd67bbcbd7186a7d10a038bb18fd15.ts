/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/utils/cm/ComUtils')

namespace N65bd67bbcbd7186a7d10a038bb18fd15_1 {
  type $0 = `${''|`.${string}`}${`-` | ''}${$1}${$2}${$bassChord | ''}${$14 | ''}`;
  type $1 = `${string}${`#` | ''}` | string;
  type $2 = `+` | `11` | $3;
  type $3 = `${$4 | ''}${$5 | ''}`;
  type $4 = `m` | `min` | `${`7` | ''}sus` | `maj` | `dim` | `add`;
  type $5 = `${number}${$6 | ''}`;
  type $6 = `/${number}`;
  type $bassChord = `/${$8}${$9}`;
  type $8 = $1;
  type $9 = `+` | `11` | $10;
  type $10 = `${$11 | ''}${$12 | ''}`;
  type $11 = $4;
  type $12 = `${number}${$13 | ''}`;
  type $13 = $6;
  type $14 = `${$dotSeparations}${$16}${$17}${$22 | ''}`;
  type $dotSeparations = `.${string}` | `-` | `.${string}-`;
  type $16 = $1;
  type $17 = `+` | `11` | $18;
  type $18 = `${$19 | ''}${$20 | ''}`;
  type $19 = $4;
  type $20 = `${number}${$21 | ''}`;
  type $21 = $6;
  type $22 = `/${$23}${$24}`;
  type $23 = $1;
  type $24 = `+` | `11` | $25;
  type $25 = `${$26 | ''}${$27 | ''}`;
  type $26 = $4;
  type $27 = `${number}${$28 | ''}`;
  type $28 = $6;

  export interface I extends Record<
    `/^\\.*-?([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?))(?<bassChord>/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?)))?((?<dotSeparations>\\.+|-|\\.+-)([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?))(/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?)))?)*$/`,
    {
      $0: $0;
      $1: $1;
      $2: $2;
      $3?: $3;
      $4?: $4;
      $5?: $5;
      $6?: $6;
      bassChord?: $bassChord;
      $8?: $8;
      $9?: $9;
      $10?: $10;
      $11?: $11;
      $12?: $12;
      $13?: $13;
      $14?: $14;
      dotSeparations?: $dotSeparations;
      $16?: $16;
      $17?: $17;
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
      $28?: $28
    }
  > { '': '' }
}

namespace N65bd67bbcbd7186a7d10a038bb18fd15_2 {
  type $0 = `${$1}${$2}${$7 | ''}`;
  type $1 = `${string}${`#` | ''}` | string;
  type $2 = `+` | `11` | $3;
  type $3 = `${$4 | ''}${$5 | ''}`;
  type $4 = `m` | `min` | `${`7` | ''}sus` | `maj` | `dim` | `add`;
  type $5 = `${number}${$6 | ''}`;
  type $6 = `/${number}`;
  type $7 = `/${$8}${$9}`;
  type $8 = $1;
  type $9 = `+` | `11` | $10;
  type $10 = `${$11 | ''}${$12 | ''}`;
  type $11 = $4;
  type $12 = `${number}${$13 | ''}`;
  type $13 = $6;

  export interface I extends Record<
    `/^([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?))(/([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?)))?$/`,
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
      $13?: $13
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N65bd67bbcbd7186a7d10a038bb18fd15_1.I,
    N65bd67bbcbd7186a7d10a038bb18fd15_2.I {
    '': ''
}