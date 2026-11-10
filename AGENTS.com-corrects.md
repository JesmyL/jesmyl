# AGENTS.com-corrects.md

Rules for correcting song-text data files in `src/back/apps/cm/coms/+case/`.
Read this file before editing any of those JSON files.

## Progress

- Correction passes are incremental, processed in batches of 20 songs sorted by the `w` field ascending.
- DONE: songs ranked 1–200 by `w` (batches 1-20, 21-40, 41-60, 61-80, 81-100, 101-120, 121-140, 141-160, 161-180, 181-200) are fully corrected (punctuation + case rules applied, edge-whitespace trimmed).
- NEXT: continue from rank 201 by `w` ascending.

## 1. Scope

- Edit only files in `src/back/apps/cm/coms/+case/`.
- In each file only the `n` (name) and `t` (lyric phrases) fields may change.
- Never touch `w`, `bpm`, `nl`, `al`, `c`, `o`, `am`, `d`, or any other field.
- Never rename, create, or delete files.
- Never `git add` / stage anything. Never commit.

## 2. Batch order

- [ ] Process files in batches ordered by the `w` field **ascending** — not by filename.
- [ ] The filename usually equals `w` (e.g. `1610363410236.json` ↔ `"w": 1610363410236`), but always sort by the field itself.

## 3. Invariants (must hold for every file)

- [ ] Never move, add, or remove a word, space, or line break.
- [ ] Every word, space, and `\n` stays exactly where it was.
- [ ] Never change the form of any word — no spelling corrections at all, even if a word looks like a typo. Letter sequence and vowel count stay identical.
- [ ] Only punctuation and letter case may change.
- [ ] Exceptions, both in `n` only (§7): surrounding spaces are stripped, and a spaced dash `слово - слово` becomes `слово — слово`.
- [ ] Exception (§3.1): edge whitespace is trimmed from `n` and from every `\n`-line of every `t` string.
- [ ] Do not reformat the JSON: keep the file's existing indentation, key order, and compact/expanded layout.

### 3.1 Edge whitespace trimming

Apply in every correction pass, on every file:

- [ ] `n` must be `trim()`'d — no leading or trailing whitespace.
- [ ] Every line inside each `t` string (each `\n`-separated line) must be `trim()`'d — no leading or trailing spaces on any line.
- [ ] Only whitespace at the edges of `n` and of each lyric line changes. Words, inner spacing between words, punctuation, and case stay untouched, and the `\n` structure stays exactly as it was.
- [ ] If a value has nothing to trim, do not rewrite the file for it.

## 4. Language routing

| `l` | Language | Action |
|-----|----------|--------|
| absent or `0` | Russian | Apply Russian rules |
| `1` | Ukrainian | Apply Ukrainian rules (the `укр.` variants below) |
| `2`, `3` | Kazakh, English | Skip the file |

- [ ] Also skip a file whose text is in Latin script, regardless of `l`.

## 5. Punctuation

- [ ] Add or fix `.` `;` `,` `!` `?` where the grammar requires it.
- [ ] Attach each punctuation mark to the preceding word — no space before it.
- [ ] Leave existing dashes exactly as they are, including spacing: `слово- слово` stays `слово- слово`.
- [ ] Add a dash only where the grammar clearly requires one, and match the file's own dash style.
- [ ] Compound hyphens (`слово-слово`) stay untouched.
- [ ] Exception: in the name field `n` a spaced dash `слово - слово` becomes the em-dash `слово — слово` (§7); lyrics keep their dashes as-is.

## 6. Quotes

- [ ] The only allowed quote character is straight double `"`.
- [ ] Replace `„` `“` `«` `»` `‘` `’` `'` with `"` where they actually function as quotes.
- [ ] Never add new quotes where none existed.
- [ ] Word-internal apostrophes (e.g. укр. `м'ята`, `п'ять`) are not quotes — they are part of the word and stay as-is.

## 7. Case — names (`n`)

- [ ] The name must start with a capital letter.
- [ ] Every other existing capitalization in the name stays exactly as authored — never lowercase it.
- [ ] Strip leading and trailing spaces: `" Имя Господа - крепкая башня"` → `"Имя Господа — крепкая башня"`.
- [ ] A dash with spaces on both sides (`слово - слово`) must be the em-dash with spaces: `"Имя Господа — крепкая башня"`.
- [ ] A hyphen glued to a word (`слово- слово`, `слово-слово`) stays untouched — the existing-dash rule of §5 still applies.

## 8. Case — lyrics (`t`)

Everything is lowercase — including sentence-initial words and words after `.` `!` `?` — except for the Synodal-tradition capitals below.

### 8.1 Uppercase — God / Christ names and titles

**General principle:** ANY noun used as a title of God or Christ is uppercase — even when it is not in the lists below (e.g. `Лев`, `Ходатай`, `Первосвященник`, `Судья` / `Судьёй`, `Искупитель`, `Мессия`, `Трон`, `Сторож`, `Советник`). The lists are examples, not a closed set. A word that only *describes* God in a predicate stays lowercase — see `Всемогущий` in §8.2.

- [ ] `Бог`, `Господь`, `Господин`, `Господ`, `Иисус` / `Ісус`, `Христос`, `Спаситель`, `Агнец`, `Отец`, `Отче`, `Творец`, `Вседержитель`, `Сын`.
- [ ] `Мессия`, `Искупитель`, `Ходатай`, `Первосвященник`, `Судья` / `Судьёй`, `Лев` (of Christ — `Лев иудейский` keeps `иудейский` lowercase).
- [ ] `Трон` when it is God's throne (`к Трону идущих`).
- [ ] `Сторож`, `Советник` as titles of Christ (`Сторож души и Советник`).
- [ ] `Царь` when it refers to Christ (`Царь иудейский` — `иудейский` stays lowercase).
- [ ] `Пастырь` / `Пастир`, `Друг` (of Christ), `Утешитель` / `Втішитель`, `Вождь` (of Christ), `Наставник`, `Путеводитель` (Christ vocatives).
- [ ] `Церковь` / `Церква` — only for the universal body of Christ; a building or local congregation stays lowercase.
- [ ] `Святый` as a standing name; the predicate `свят` stays lowercase.
- [ ] `Дитя`, `Младенец`, `Мальчик` — titles of the infant Christ.

### 8.2 Uppercase — adjectives and special words about God

Adjectives describing God or Christ stay **lowercase** unless they are listed here (e.g. `вечный` in `вечный Отец`). This holds **even when the adjective sits inside a title phrase whose noun is uppercase**: the noun is capitalized, the adjective is not — e.g. `Лоза святая`, `Царь иудейский`. Adjectives derived from a listed title-noun (`Божий`) and the set phrases below are the only exceptions.

- [ ] `Божий` / `Божия` / `Божие`.
- [ ] `Небесный` in `Отец Небесный` and `Царство Небесное`.
- [ ] `Небо` / `Неба` / `Небу` / `Небом` / `Небе` / `Небеса` / `Небес` / `Небесах` — God's dwelling, ALWAYS uppercase (`граждане Неба`, `ключи от Неба`, `на Небеса`, `в Небесах`); the ordinary sky / atmosphere stays lowercase.
- [ ] `Святилище` / `Святилища` / `Святилищу` / `Святилищем` / `Святилище` — God's dwelling, uppercase (`во Святилище Твоё`), same rule as `Небо`; an ordinary pagan or figurative sanctuary stays lowercase unless it denotes God's own dwelling.
- [ ] `Всемогущий` — uppercase ONLY as a standalone title naming God by itself. As a predicate or attribution to `Бог` it is lowercase: `наш Бог великий и всемогущий`, `Бог всемогущий`.
- [ ] `Вселенная` / `Вселенной` — God's creation together with the Creator.
- [ ] `Имя` / `Имени` — God's own name (`Имя Твоё`, `Имени Твоему`); a name given to people stays lowercase.
- [ ] `Кровь` / `Кров` — of Christ.
- [ ] `Слово` — Logos; an ordinary `слово` stays lowercase.
- [ ] `Любовь` — personified as God Himself (`к нам Любовь с небес пришла`); abstract `любовь` as an attribute stays lowercase.

### 8.3 Holy Spirit

- [ ] `Дух` about the Holy Spirit is ALWAYS uppercase: `Святой Дух`, `Дух Святой`, укр. `Дух` / `Святий Дух`.
- [ ] `дух` about a human spirit stays lowercase (`дух оживи во мне`).

### 8.4 Uppercase — pronouns about God / Christ

- [ ] Russian: `Он`, `Его`, `Ему`, `Им`, `Ним`, `Него`, `Ты`, `Тебя`, `Тебе`, `Тобой`, `Твой` / `Твоя` / `Твоё` / `Твои` / `Твоих` / `Твою`, `Свой` / `Своей` / `Своё`, `Собой`, `Себя`.
- [ ] `Сам` about God or Christ.
- [ ] Relative `Кто` / `Который` / `Которого` about God or Christ.
- [ ] `Тот` / `Того` / `Тому` / `Тем` / `Том` (`Тому`, `Кого` — e.g. `Ты- Тот, Кого прославляем`) and `Кого` / `Кому` / `Кем` when they point at God or Christ.
- [ ] Ukrainian: `Він`, `Його`, `Йому`, `Нім`, `Ти`, `Тебе`, `Тобі`, `Тобою`, `Твій` / `Твоя` / `Твоє` / `Твої`, `Його`.

### 8.5 Always lowercase

- [ ] `благодать` / grace — **and all pronouns pointing at it**, even the capitalized shapes: `Тобой` / `твой` when addressing grace, `Она`, `Её`, `Ей`; укр. `Вона`, `Її`, `Їй`, `Твої` to grace.
- [ ] Pronouns about human listeners: укр. `ти` / `твої` / `твій`.
- [ ] Metaphorical `свет`.
- [ ] `аллилуйя`, `нет`, `врата`, `земля` (soil / ground / homeland), `родина`, `батьківщину`, `ангелы`, `храм` / `храмі`.
- [ ] `Земля` as the planet — astronomical proper name, uppercase (`в космосе Земля`); the soil / ground / homeland senses keep `земля` lowercase.
- [ ] `один` — unlike `Сам`.
- [ ] Words inside similes, e.g. `пастух` in `как пастух`.

> Referent, not spelling, decides case: the same `Твой` is uppercase about God and lowercase about grace or a human listener.

## 9. Ambiguous personification

- [ ] If a personified metaphor might or might not be God, leave it as-is and ask the user.
- [ ] List each such case with the quoted phrase plus a recommendation.
- [ ] Never guess on these.

### Settled decisions (apply directly, do not re-ask)

| Phrase | Decision |
|--------|----------|
| `благодать` (+ its pronouns) | lowercase |
| `один дух` where the referent is the Holy Spirit | `Дух` uppercase |
| `Церковь` as the universal body | uppercase |
| `имя Своё` given to people | lowercase |
| heavenly / metaphorical `свет` | lowercase |
| `сторож души и советник` (titles of Christ) | `Сторож`, `Советник` uppercase |
| `Небо` / `Небеса` as God's dwelling | uppercase (`граждане Неба`, `ключи от Неба`) |
| `Святилище` as God's dwelling (`во Святилище Твоё`) | uppercase, same rule as `Небо` |
| adjectives about God / Christ inside a title phrase | lowercase — noun capitalized, adjective not (`Лоза святая`, `Царь иудейский`); only `Божий` and `Небесный` (`Отец Небесный`, `Царство Небесное`) are uppercase |
| `Земля` as the planet (astronomical proper name, `в космосе Земля`) | uppercase; soil / ground / homeland stay `земля` lowercase |
| `Бог великий и всемогущий` | `всемогущий` lowercase as predicate; uppercase only as a standalone title |
| spaced dash `слово - слово` inside a name (`n`) | em-dash `слово — слово`, surrounding spaces stripped |
| personified `Любовь` as God Himself (`к нам Любовь с небес пришла`) | uppercase; abstract `любовь` as an attribute stays lowercase |
| `Дитя`, `Младенец`, `Мальчик` (titles of the infant Christ) | uppercase |
| `в Небесах` (heavenly realm, Eph 1:3 sense) | uppercase, same rule as `Небо` / `Небеса` |
| `дух оживи во мне` (human spirit revived in me) | lowercase, human spirit |
| `небо — есть заветный край` (heaven as God's dwelling) | uppercase `Небо` |
| `осанна` | lowercase, like `аллилуйя` (liturgical exclamation, never capitalized) |
| `Кто-то` referring to God (knocking at the door imagery) | UPPERCASE; an indefinite pronoun about a person stays lowercase |

## 10. Per-file verification

- [ ] JSON still parses.
- [ ] Diff touches only `n` and `t` string contents.
- [ ] Word count, space count, and `\n` count are unchanged in every edited phrase.
- [ ] No word's letters changed — only punctuation and case.
- [ ] No stray non-straight quote characters remain where quotes occur.
- [ ] `n` and every `\n`-line of every `t` string have no leading/trailing whitespace (§3.1).
- [ ] Nothing staged, nothing committed.
