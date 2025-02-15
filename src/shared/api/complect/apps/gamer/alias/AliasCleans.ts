import { smylib } from 'shared/utils';
import { AliasWordInfo, GamerAliasRoomState } from './alias.model';

export class AliasCleans {
  static computeGameScore = (
    corrects: AliasWordInfo[],
    incorrects: AliasWordInfo[],
    fix: number[] | Record<number, string[]>,
  ) => {
    return (
      corrects.reduce(
        (sum, winfo) =>
          sum +
          ((Array.isArray(fix) ? fix.includes(winfo.wordi) : fix[winfo.wordi]?.length) ? -winfo.minus : winfo.plus),
        0,
      ) -
      incorrects.reduce(
        (sum, winfo) =>
          sum +
          ((Array.isArray(fix) ? fix.includes(winfo.wordi) : fix[winfo.wordi]?.length) ? -winfo.plus : winfo.minus),
        0,
      )
    );
  };

  static takeSpeakerDetails = (state: GamerAliasRoomState, currentSpeakeri?: number) => {
    let membersCount = 0;
    let currTeami = -1;
    const speakeri = state.speakeri || 0;

    let startCurrentMembersi = -1;
    let finishCurrentMembersi = -1;

    let startNextMembersi = -1;
    let finishNextMembersi = -1;

    state.teams.forEach((team, teami, teama) => {
      membersCount += team.members.length;

      if (currTeami !== -1 || membersCount <= speakeri) return;

      currTeami = teami;
      startCurrentMembersi = membersCount - team.members.length;
      finishCurrentMembersi = membersCount;

      if (teami === teama.length - 1) {
        startNextMembersi = 0;
        finishNextMembersi = teama[0].members.length;
      } else {
        startNextMembersi = membersCount;
        finishNextMembersi = membersCount + teama[teami + 1].members.length;
      }
    });

    if (currentSpeakeri !== undefined) {
      const currentTeamSpeaks = state.speaks.slice(startCurrentMembersi, finishCurrentMembersi);
      const currentTeamMinSpeak = Math.min(...currentTeamSpeaks);
      const currentTeamSpeakersList = smylib.mapFilter(currentTeamSpeaks, (speaks, speaksi) =>
        speaks === currentTeamMinSpeak && currentSpeakeri !== speaksi + startCurrentMembersi ? speaksi : undefined,
      );

      if (currentTeamSpeakersList.length) {
        return [
          startCurrentMembersi + currentTeamSpeakersList[0], // next speakeri
          currTeami,
        ] as const;
      }
    }

    const nextTeamSpeaks = state.speaks.slice(startNextMembersi, finishNextMembersi);
    const nextTeamMinSpeak = Math.min(...nextTeamSpeaks);
    const nextTeamSpeakersList = smylib.mapFilter(nextTeamSpeaks, (speaks, speaksi) =>
      speaks === nextTeamMinSpeak ? speaksi : undefined,
    );

    return [
      startNextMembersi + nextTeamSpeakersList[0], // next speakeri
      currTeami,
    ] as const;
  };

  static removeRandomSortedInfos = (id: string) => {
    return delete this.tokenizedWordInfoStorage[id];
  };

  private static tokenizedWordInfoStorage: Record<string, AliasWordInfo[]> = {};

  // static randomSortedInfos = (
  //   id: string,
  //   dicts: number[] | und,
  //   packs: AliasWordsPack[],
  //   nounsDict: NounPronsType | und,
  //   pronounsDict: NounPronsType | und,
  // ): AliasWordInfo[] => {
  //   if (dicts === undefined || nounsDict === undefined || pronounsDict === undefined) return [];

  //   if (this.tokenizedWordInfoStorage[id] !== undefined) return this.tokenizedWordInfoStorage[id];

  //   const packInfos: AliasWordInfo[][] = [];

  //   dicts.forEach((max, packi) => {
  //     if (max === 0) return 0;

  //     const packWords = packs[packi].words;

  //     if (smylib.isNum(packWords)) {
  //       const nouns = smylib.toRandomSorted(smylib.keys(nounsDict.words).slice(0, -1));
  //       let pronounsSorted: string[] = [];
  //       let nounsSorted: string[] = [];
  //       const isSpecialMax = max < 0;

  //       if (!isSpecialMax) {
  //         const pronouns = smylib.toRandomSorted(smylib.keys(pronounsDict.words).slice(0, -1));
  //         const minLen = Math.min(nouns.length, pronouns.length);

  //         pronounsSorted = pronouns.slice(0, minLen);
  //         nounsSorted = nouns.slice(0, minLen);
  //       } else nounsSorted = nouns;

  //       packInfos.push(
  //         nounsSorted.slice(0, max).map((noun, nouni): AliasWordInfo => {
  //           const weight = isSpecialMax
  //             ? nounsDict.words[noun] - 1
  //             : nounsDict.words[noun] + pronounsDict.words[pronounsSorted[nouni]];

  //           return {
  //             wordi: nouni,
  //             minus: 1,
  //             plus: weight,
  //             word: isSpecialMax
  //               ? noun.toUpperCase().replace(makeRegExp('/[^-а-яё ]/gi'), '')
  //               : makeTwiceKnownName(pronounsSorted[nouni], noun).join(' ').toUpperCase(),
  //           };
  //         }),
  //       );
  //     } else {
  //       const words = smylib
  //         .keys(packWords)
  //         .slice(0, -1)
  //         .filter(word => packWords[word] <= max);

  //       packInfos.push(
  //         words.map((word, wordi): AliasWordInfo => {
  //           return {
  //             wordi,
  //             word,
  //             plus: packWords[word],
  //             minus: (max || 0) + 1 - (packWords[word] || 0),
  //           };
  //         }),
  //       );
  //     }

  //     SMyLib.entries(packs[packi]);
  //   });

  //   const infoLine: AliasWordInfo[] = packInfos.flat();

  //   for (let i = 0; i < infoLine.length; i++) {
  //     if (infoLine[i]) infoLine[i].wordi = i;
  //   }

  //   return (this.tokenizedWordInfoStorage[id] = smylib.toRandomSorted(infoLine));
  // };
}
