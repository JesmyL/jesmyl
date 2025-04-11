import React, { FC, JSX } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M17 9.5L12 3L7 9.5L12 21L17 9.5Z',
  d2: 'M17.5 4L22 9.5H17M17.5 4L17 9.5M17.5 4L12 3L6.5 4M17 9.5H7M6.5 4L2 9.5H7M6.5 4L7 9.5',
  d3: 'M22 9.5L12 21L2 9.5',
  d4: 'M17.5 4L22 9.5H17L17.5 4Z',
  d5: 'M2 9.5L6.5 4L7 9.5H2Z',
  d6: 'M17.6342 3.2621L12.1342 2.2621C12.0454 2.24597 11.9546 2.24597 11.8658 2.2621L6.36584 3.2621C6.19056 3.29397 6.03235 3.38719 5.91953 3.52507L1.41953 9.02507C1.18812 9.30791 1.19425 9.71637 1.43405 9.99213L11.434 21.4921C11.5765 21.6559 11.7829 21.75 12 21.75C12.2171 21.75 12.4235 21.6559 12.566 21.4921L22.566 9.99213C22.8058 9.71637 22.8119 9.30791 22.5805 9.02507L18.0805 3.52507C17.9677 3.38719 17.8094 3.29397 17.6342 3.2621ZM7.5 8L6 4.99949L6.17873 8.74954L2.5 9.49954L6.50826 10.2495L11 18.5L8.14391 10.2495H15.8561L13 18.5L17.4917 10.2495L21.5 9.49954L17.8213 8.74954L18 4.99949L16.5 8L12.7185 3.93359L15.4769 8.74954H8.52315L11.2815 3.93359L7.5 8Z',
  d7: 'M11.8658 2.2621C11.9546 2.24597 12.0454 2.24597 12.1342 2.2621L17.6342 3.2621C17.8094 3.29397 17.9677 3.38719 18.0805 3.52507L22.5805 9.02507C22.8119 9.30791 22.8058 9.71637 22.566 9.99213L12.566 21.4921C12.4235 21.6559 12.2171 21.75 12 21.75C11.7829 21.75 11.5765 21.6559 11.434 21.4921L1.43405 9.99213C1.19425 9.71637 1.18812 9.30791 1.41953 9.02507L5.91953 3.52507C6.03235 3.38719 6.19056 3.29397 6.36584 3.2621L11.8658 2.2621Z',
  d8: 'M6 4.99949L7.5 8L11.2815 3.93359L8.52315 8.74954H15.4769L12.7185 3.93359L16.5 8L18 4.99949L17.8213 8.74954L21.5 9.49954L17.4917 10.2495L13 18.5L15.8561 10.2495H8.14391L11 18.5L6.50826 10.2495L2.5 9.49954L6.17873 8.74954L6 4.99949Z',
  d9: 'M12 3L17 9.5M12 3L7 9.5M12 3L17.5 4M12 3L6.5 4M17 9.5L12 21M17 9.5H22M17 9.5L17.5 4M17 9.5H7M12 21L7 9.5M12 21L22 9.5M12 21L2 9.5M7 9.5H2M7 9.5L6.5 4M22 9.5L17.5 4M6.5 4L2 9.5',
  d10: 'M17.7814 3.3019L12 2.25L6.21858 3.3019L1.25 9.37886L12 21.75L22.75 9.37886L17.7814 3.3019ZM7.5 8L6 4.99949L6.17873 8.74954L2.5 9.49954L6.50826 10.2495L11 18.5L8.14391 10.2495H15.8561L13 18.5L17.4917 10.2495L21.5 9.49954L17.8213 8.74954L18 4.99949L16.5 8L12.7185 3.93359L15.4769 8.74954H8.52315L11.2815 3.93359L7.5 8Z',
};

export const IconSketchStrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch StrokeRounded"
    >
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSketchDuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch DuotoneRounded"
    >
      <g    i-c="o7">
      <path 
        d={d.d4}
        i-c="f"
      />
      <path 
        d={d.d5}
        i-c="f"
      />
      </g>
      <path 
        d={d.d1}
        i-c="f o7"
      />
      <path 
        d={d.d1}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSketchTwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch TwotoneRounded"
    >
      <path 
        d={d.d1}
        i-c="o7 s sj sr sw"
      />
      <path 
        d={d.d2}
        i-c="s sj sr sw"
      />
      <path 
        d={d.d3}
        i-c="s sj sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSketchSolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch SolidRounded"
    >
      <path 
        d={d.d6}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const IconSketchBulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch BulkRounded"
    >
      <path 
        d={d.d7}
        i-c="f o7"
      />
      <path 
        d={d.d8}
        i-c="f"
      />
    </TheIconWrapper>
  );
};

export const IconSketchStrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch StrokeSharp"
    >
      <path 
        d={d.d9}
        i-c="s sr sw"
      />
    </TheIconWrapper>
  );
};

export const IconSketchSolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      the-icon="Sketch SolidSharp"
    >
      <path 
        d={d.d10}
        i-c="c f fr"
      />
    </TheIconWrapper>
  );
};

export const iconPackOfSketch: TheIconSelfPack = [
  'Sketch',
  IconSketchStrokeRounded,
  IconSketchDuotoneRounded,
  IconSketchTwotoneRounded,
  IconSketchSolidRounded,
  IconSketchBulkRounded,
  IconSketchStrokeSharp,
  IconSketchSolidSharp,
];