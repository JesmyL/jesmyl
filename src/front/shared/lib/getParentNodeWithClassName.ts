import { makeRegExp } from 'regexpert';

export const makePseudoElementCorrectContentText = (text: string) =>
  text?.replace(makeRegExp("/'/g"), "\\'").replace(makeRegExp('/\\n/g'), "''\\A''");

export const getParentNodeWithClassName = <ClassName extends string>(
  event: { target: unknown },
  stopClassName: string,
  classNamesOnWay?: ClassName[],
) => {
  let node = event.target as HTMLElement | null;
  const classNamesOnWaySet = new Set(classNamesOnWay);
  const foundClassNames = {} as Record<ClassName, true | und>;

  while (node) {
    if (classNamesOnWaySet.size) {
      const nodeClassList = node.classList;

      classNamesOnWaySet.forEach(className => {
        if (nodeClassList.contains(className)) {
          foundClassNames[className] = true;
          classNamesOnWaySet.delete(className);
        }
      });
    }

    if (node.classList.contains(stopClassName)) break;

    node = node.parentElement;
  }

  return { foundClassNames, node };
};
