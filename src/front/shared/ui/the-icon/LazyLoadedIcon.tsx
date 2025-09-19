import { indexIDB } from '$index/db/index-idb';
import { HTMLAttributes, useEffect, useState } from 'react';
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
  if (pack !== undefined) {
    return (
      <svg
        {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
        {...props}
        dangerouslySetInnerHTML={makeStameskaIconSvgHTMLProp(pack!, kind)}
      />
    );
  }

  if (cachedStaticProps[`${icon}/${kind}`] === undefined) {
    if (cachedPacks[icon] !== undefined) {
      return (
        <svg
          {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
          {...props}
          dangerouslySetInnerHTML={
            (cachedStaticProps[`${icon}/${kind}`] = makeStameskaIconSvgHTMLProp(cachedPacks[icon], kind))
          }
        />
      );
    }

    return (
      <WithoutStaticProps
        icon={icon}
        kind={kind}
        withoutAnimation={withoutAnimation}
        className={className}
        children={children}
        {...props}
      />
    );
  }

  return (
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={cachedStaticProps[`${icon}/${kind}`]}
    />
  );
}

const cachedStaticProps: PRecord<
  `${KnownStameskaIconName}/${StameskaIconKind}`,
  ReturnType<typeof makeStameskaIconSvgHTMLProp>
> = {};

const cachedPacks: PRecord<KnownStameskaIconName, StameskaIconPack> = {};

const WithoutStaticProps = ({ icon, className, kind = 'StrokeRounded', withoutAnimation, ...props }: LazyIconProps) => {
  const [staticIconProps, setStaticIconProps] = useState<ReturnType<typeof makeStameskaIconSvgHTMLProp>>();

  useEffect(() => {
    (async () => {
      const pack = (cachedPacks[icon] ??= icon && (await indexIDB.tb.iconPacks.get(icon))?.pack);

      setStaticIconProps((cachedStaticProps[`${icon}/${kind}`] = makeStameskaIconSvgHTMLProp(pack!, kind)));
    })();
  }, [icon, kind]);

  return (
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={staticIconProps}
    />
  );
};
