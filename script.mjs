import fs from 'fs';
// export * from './src/back/apps/bible/kas';

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

const chapters = [];

const bookPath = './src/back/apps/bible/';

fs.readdirSync(bookPath + '+nrt').forEach(name => {
  if (!name.endsWith('htm')) return;

  const content = '' + fs.readFileSync(`${bookPath}+nrt/${name}`);

  chapters[parseInt(name) - 1] = content
    .replace(/<\/?HTML>|<\/?BODY>/g, '')
    .replace(/ - /g, ' — ')
    .replace(/<\/?p\/?>\d* ?/g, '')
    .replace(/ , .|([\n\s])["„]/g, '$1«')
    .replace(/„/g, '«')
    .replace(/"/g, '»')
    .replace(/<font color=/g, '<span class=')
    .replace(/<(\/?)font/g, '<$1span')
    .trim()
    .split(/<h4>.+?<\/h4>/)
    .filter((_, i) => i)
    .map(chapter =>
      chapter
        .trim()
        .split(/[\r\n]+/)
        .map(v => v.trim()),
    );
});

fs.writeFileSync(`${bookPath}nrt.json`, JSON.stringify({ chapters }, null, '  '));

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// const chapters = Array.from({ length: 40 }, () => null);

// const bookPath = './src/back/apps/bible/';

// fs.readdirSync(bookPath + '+kas').forEach(name => {
//   if (!name.endsWith('HTM')) return;

//   const content = '' + fs.readFileSync(`${bookPath}/${name}`);

//   chapters[parseInt(name) - 1] = content
//     .replace(/<\/?HTML>|<\/?BODY>/g, '')
//     .replace(/<\/?p>\d* ?/g, '')
//     .replace(/ , .|([\n\s])["„]/g, '$1«')
//     .replace(/„/g, '«')
//     .replace(/"/g, '»')
//     .replace(/ - /g, ' — ')
//     .trim()
//     .replace(/<Стих 14 прежних.+?>/g, ' ')
//     .split(/<h4>.+?<\/h4>/)
//     .filter((_, i) => i)
//     .map(chapter => chapter.trim().split(/[\r\n]+/));
// });

// fs.writeFileSync(`${bookPath}kas.json`, JSON.stringify({ chapters }, null, '  '));
