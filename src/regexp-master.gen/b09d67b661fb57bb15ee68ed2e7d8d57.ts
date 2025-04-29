type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$0 = `${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_bookn}${`${string}` | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$2 | ''}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_bookn = `${number | ''}${`${string}` | ''}${string}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$2 = `${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_chapterStr | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$4 | ''}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_chapterStr = `${number}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$4 = `${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$5 | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseStr | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$7 | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_finishVerseStr | ''}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$5 = `:` | `${string}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseStr = `${number}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$7 = `${`${string}` | ''}${Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseSeparator | ''}${`${string}` | ''}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseSeparator = `${string}`;
type Tb09d67b661fb57bb15ee68ed2e7d8d57_1_finishVerseStr = `${number}`;


interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Record<
    `/(?<bookn>\\d?\\s*[а-яё]+)\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>\\d{1,3})(\\s*(?<verseSeparator>[-,]?)\\s*)(?<finishVerseStr>\\d{1,3})?)?)?/i`,
    {
      $0: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$0;
      bookn: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_bookn;
      $2?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$2;
      chapterStr?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_chapterStr;
      $4?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$4;
      $5?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$5;
      verseStr?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseStr;
      $7?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_$7;
      verseSeparator?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_verseSeparator;
      finishVerseStr?: Tb09d67b661fb57bb15ee68ed2e7d8d57_1_finishVerseStr}
  > {' ': ''}