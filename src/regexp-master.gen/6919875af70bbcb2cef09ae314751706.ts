type T6919875af70bbcb2cef09ae314751706_1_$0 = `${T6919875af70bbcb2cef09ae314751706_1_before}${T6919875af70bbcb2cef09ae314751706_1_beforeSpaces}${T6919875af70bbcb2cef09ae314751706_1_hashes}${T6919875af70bbcb2cef09ae314751706_1_blockHashPosition}${T6919875af70bbcb2cef09ae314751706_1_associations | ''}${` ` | ''}${T6919875af70bbcb2cef09ae314751706_1_info | ''}${T6919875af70bbcb2cef09ae314751706_1_beforeCommentSpaces}${T6919875af70bbcb2cef09ae314751706_1_comment}${U6919875af70bbcb2cef09ae314751706_1_1}`;
type T6919875af70bbcb2cef09ae314751706_1_before = `` | `\\n`;
type T6919875af70bbcb2cef09ae314751706_1_beforeSpaces = `${` ` | ''}`;
type T6919875af70bbcb2cef09ae314751706_1_hashes = `#${string}`;
type T6919875af70bbcb2cef09ae314751706_1_blockHashPosition = `${string}`;
type T6919875af70bbcb2cef09ae314751706_1_associations = `${`_` | ''}${T6919875af70bbcb2cef09ae314751706_1_secretWidStr | ''}${T6919875af70bbcb2cef09ae314751706_1_modificators | ''}`;
type T6919875af70bbcb2cef09ae314751706_1_secretWidStr = `${string}`;
type T6919875af70bbcb2cef09ae314751706_1_modificators = `${`!` | ''}`;
type T6919875af70bbcb2cef09ae314751706_1_info = `[${T6919875af70bbcb2cef09ae314751706_1_blockHeader | ''}]`;
type T6919875af70bbcb2cef09ae314751706_1_blockHeader = `${string}`;
type T6919875af70bbcb2cef09ae314751706_1_beforeCommentSpaces = `${` ` | ''}`;
type T6919875af70bbcb2cef09ae314751706_1_comment = `${string}`;
type U6919875af70bbcb2cef09ae314751706_1_1 = `\\n${` ` | ''}#` | ``;

type T6919875af70bbcb2cef09ae314751706_2_$0 = `${T6919875af70bbcb2cef09ae314751706_2_translate}:${T6919875af70bbcb2cef09ae314751706_2_book}${` ` | ''}${T6919875af70bbcb2cef09ae314751706_2_chapter}:${T6919875af70bbcb2cef09ae314751706_2_verseDiapason}`;
type T6919875af70bbcb2cef09ae314751706_2_translate = `${string}`;
type T6919875af70bbcb2cef09ae314751706_2_book = `${T6919875af70bbcb2cef09ae314751706_2_bookPrefix | ''}${T6919875af70bbcb2cef09ae314751706_2_bookTitle}`;
type T6919875af70bbcb2cef09ae314751706_2_bookPrefix = `${T6919875af70bbcb2cef09ae314751706_2_bookNumberWithSuffix | ''}${` ` | ''}`;
type T6919875af70bbcb2cef09ae314751706_2_bookNumberWithSuffix = `${T6919875af70bbcb2cef09ae314751706_2_bookNumber | ''}${`-` | ''}${T6919875af70bbcb2cef09ae314751706_2_bookNumberSuffix | ''}` | `${T6919875af70bbcb2cef09ae314751706_2_bookTitleFrom | ''}`;
type T6919875af70bbcb2cef09ae314751706_2_bookNumber = `${number}`;
type T6919875af70bbcb2cef09ae314751706_2_bookNumberSuffix = `${string}`;
type T6919875af70bbcb2cef09ae314751706_2_bookTitleFrom = `От`;
type T6919875af70bbcb2cef09ae314751706_2_bookTitle = `${string}`;
type T6919875af70bbcb2cef09ae314751706_2_chapter = `${number}`;
type T6919875af70bbcb2cef09ae314751706_2_verseDiapason = `${T6919875af70bbcb2cef09ae314751706_2_verseFrom}${T6919875af70bbcb2cef09ae314751706_2_verseTail | ''}`;
type T6919875af70bbcb2cef09ae314751706_2_verseFrom = `${number}`;
type T6919875af70bbcb2cef09ae314751706_2_verseTail = `-${T6919875af70bbcb2cef09ae314751706_2_verseTo | ''}`;
type T6919875af70bbcb2cef09ae314751706_2_verseTo = `${number}`;


interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Record<
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${string})(?<associations>_?(?<secretWidStr>[${string}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    {
      $0: T6919875af70bbcb2cef09ae314751706_1_$0;
      before: T6919875af70bbcb2cef09ae314751706_1_before;
      beforeSpaces: T6919875af70bbcb2cef09ae314751706_1_beforeSpaces;
      hashes: T6919875af70bbcb2cef09ae314751706_1_hashes;
      blockHashPosition: T6919875af70bbcb2cef09ae314751706_1_blockHashPosition;
      associations?: T6919875af70bbcb2cef09ae314751706_1_associations;
      secretWidStr?: T6919875af70bbcb2cef09ae314751706_1_secretWidStr;
      modificators?: T6919875af70bbcb2cef09ae314751706_1_modificators;
      info?: T6919875af70bbcb2cef09ae314751706_1_info;
      blockHeader?: T6919875af70bbcb2cef09ae314751706_1_blockHeader;
      beforeCommentSpaces: T6919875af70bbcb2cef09ae314751706_1_beforeCommentSpaces;
      comment: T6919875af70bbcb2cef09ae314751706_1_comment}
  >,
  Record<
    `/(?<translate>${string}):(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
    {
      $0: T6919875af70bbcb2cef09ae314751706_2_$0;
      translate: T6919875af70bbcb2cef09ae314751706_2_translate;
      book: T6919875af70bbcb2cef09ae314751706_2_book;
      bookPrefix?: T6919875af70bbcb2cef09ae314751706_2_bookPrefix;
      bookNumberWithSuffix?: T6919875af70bbcb2cef09ae314751706_2_bookNumberWithSuffix;
      bookNumber?: T6919875af70bbcb2cef09ae314751706_2_bookNumber;
      bookNumberSuffix?: T6919875af70bbcb2cef09ae314751706_2_bookNumberSuffix;
      bookTitleFrom?: T6919875af70bbcb2cef09ae314751706_2_bookTitleFrom;
      bookTitle: T6919875af70bbcb2cef09ae314751706_2_bookTitle;
      chapter: T6919875af70bbcb2cef09ae314751706_2_chapter;
      verseDiapason: T6919875af70bbcb2cef09ae314751706_2_verseDiapason;
      verseFrom: T6919875af70bbcb2cef09ae314751706_2_verseFrom;
      verseTail?: T6919875af70bbcb2cef09ae314751706_2_verseTail;
      verseTo?: T6919875af70bbcb2cef09ae314751706_2_verseTo}
  > {' ': ''}