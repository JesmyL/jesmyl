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

export const getParentNodeWithAttributeName = (event: { target: unknown }, stopAttributeName: string) => {
  let node = event.target as HTMLElement | null;
  let attr: string | null = null;

  while (node) {
    if (node.hasAttribute(stopAttributeName)) {
      attr = node.getAttribute(stopAttributeName);
      break;
    }
    node = node.parentElement;
  }

  return { node, attr };
};
