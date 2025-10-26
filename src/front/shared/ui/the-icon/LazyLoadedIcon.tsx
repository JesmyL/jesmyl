import { indexIDB, indexIsPlayAnimationsAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { HTMLAttributes, useEffect, useState } from 'react';
import { emptyFunc, itInvokeIt } from 'shared/utils';
import {
  makeStameskaIconSvgAttributeProps,
  makeStameskaIconSvgHTMLProp,
  StameskaIconKind,
  StameskaIconPack,
} from 'stameska-icon/utils';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  icon: KnownStameskaIconName;
  kind?: StameskaIconKind;
  withoutAnimation?: boolean;
  pack?: StameskaIconPack;
};

export default function TheIconLazy({
  icon,
  kind = 'StrokeRounded',
  withoutAnimation,
  className,
  children,
  pack,
  ...props
}: LazyIconProps) {
  withoutAnimation = withoutAnimation ?? !indexIsPlayAnimationsAtom.get();

  if (pack !== undefined) {
    return (
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
      <svg
        {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
        {...props}
        dangerouslySetInnerHTML={makeStameskaIconSvgHTMLProp(pack!, kind)}
        children={undefined}
      />
    );
  }

  if (cachedStaticProps[`${icon}/${kind}`] === undefined) {
    if (cachedPacks[icon] !== undefined) {
      return (
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
        <svg
          {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
          {...props}
          dangerouslySetInnerHTML={
            (cachedStaticProps[`${icon}/${kind}`] = makeStameskaIconSvgHTMLProp(cachedPacks[icon], kind))
          }
          children={undefined}
        />
      );
    }

    return (
      <WithoutStaticProps
        icon={icon}
        kind={kind}
        withoutAnimation
        className={className}
        children={children}
        {...props}
      />
    );
  }

  return (
    // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={cachedStaticProps[`${icon}/${kind}`]}
      children={undefined}
    />
  );
}

const cachedStaticProps: PRecord<
  `${KnownStameskaIconName}/${StameskaIconKind}`,
  ReturnType<typeof makeStameskaIconSvgHTMLProp>
> = {};

const cachedPacks: PRecord<KnownStameskaIconName, StameskaIconPack> = {};

const packsUpdateListenersSet = new Set<() => void>();
let createTimeout: TimeOut;

indexIDB.tb.iconPacks.hook('creating', () => {
  clearTimeout(createTimeout);
  createTimeout = setTimeout(() => {
    packsUpdateListenersSet.forEach(itInvokeIt);
  }, 1000);
});

const packFetches: PRecord<KnownStameskaIconName, Promise<{ pack: StameskaIconPack }>> = {};

const WithoutStaticProps = ({ icon, className, kind = 'StrokeRounded', withoutAnimation, ...props }: LazyIconProps) => {
  const [staticIconProps, setStaticIconProps] = useState<ReturnType<typeof makeStameskaIconSvgHTMLProp>>();

  useEffect(() => {
    let fetchTimeout: TimeOut;

    (async () => {
      const pack = icon && (await indexIDB.tb.iconPacks.get(icon))?.pack;

      fetchTimeout = setTimeout(async () => {
        updatePack((await (packFetches[icon] ??= indexTsjrpcClientMethods.getIconPack({ icon }))).pack, emptyFunc);
      }, 3000);

      const updatePack = (pack: StameskaIconPack | nil, elseCb: () => void) => {
        if (pack) {
          clearTimeout(fetchTimeout);
          cachedPacks[icon] ??= pack;
          cachedStaticProps[`${icon}/${kind}`] = makeStameskaIconSvgHTMLProp(pack, kind);
        } else elseCb();

        setStaticIconProps(makeStameskaIconSvgHTMLProp(pack!, kind));
      };

      updatePack(pack, () => {
        if (icon)
          packsUpdateListenersSet.add(async () => {
            const pack = (await indexIDB.tb.iconPacks.get(icon))?.pack;

            updatePack(pack, emptyFunc);
          });
      });
    })();

    return () => clearTimeout(fetchTimeout);
  }, [icon, kind]);

  return (
    // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={staticIconProps}
      children={undefined}
    />
  );
};
