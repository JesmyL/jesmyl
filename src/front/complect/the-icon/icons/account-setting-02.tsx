import { FC } from 'react';
import { TheIconWrapper } from '../icon-wrapper';
import { TheIconProps, TheIconSelfPack } from '../model';

const d: Record<string, string> = {
  d1: 'M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z',
  d2: 'M8.5 16C9.19863 14.7923 10.5044 13.9797 12 13.9797C13.4956 13.9797 14.8014 14.7923 15.5 16M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8955 11.5 10 10.6046 10 9.5C10 8.39543 10.8955 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z',
  d3: 'M21.5685 6.64432L21.0749 5.78772C20.7016 5.13989 20.515 4.81598 20.1974 4.68681C19.8798 4.55765 19.5206 4.65957 18.8023 4.86341L17.5821 5.20711C17.1235 5.31287 16.6423 5.25287 16.2236 5.03772L15.8867 4.84335C15.5276 4.61336 15.2514 4.27426 15.0985 3.87567L14.7646 2.87829C14.545 2.21827 14.4352 1.88826 14.1738 1.6995C13.9125 1.51074 13.5653 1.51074 12.8709 1.51074H11.7561C11.0618 1.51074 10.7146 1.51074 10.4532 1.6995C10.1918 1.88826 10.082 2.21827 9.86247 2.87829L9.5285 3.87567C9.37562 4.27426 9.09943 4.61336 8.74035 4.84335L8.40346 5.03772C7.98471 5.25287 7.50357 5.31287 7.04496 5.20711L5.82473 4.86341C5.10639 4.65957 4.74723 4.55765 4.42965 4.68681C4.11207 4.81598 3.92543 5.13989 3.55213 5.78772L3.05855 6.64432C2.70864 7.25157 2.53368 7.5552 2.56764 7.87842C2.60159 8.20164 2.83581 8.46211 3.30424 8.98305L4.33528 10.1357C4.58728 10.4547 4.76619 11.0107 4.76619 11.5106C4.76619 12.0107 4.58734 12.5665 4.33531 12.8856L3.30424 14.0383C2.83581 14.5593 2.6016 14.8197 2.56764 15.143C2.53368 15.4662 2.70864 15.7698 3.05855 16.377L3.55212 17.2336C3.92541 17.8814 4.11207 18.2054 4.42965 18.3345C4.74723 18.4637 5.1064 18.3618 5.82475 18.1579L7.04492 17.8142C7.50361 17.7084 7.98485 17.7685 8.40365 17.9837L8.74048 18.1781C9.09949 18.4081 9.37562 18.7471 9.52848 19.1457L9.86247 20.1432C10.082 20.8032 10.1918 21.1332 10.4532 21.322C10.7146 21.5107 11.0618 21.5107 11.7561 21.5107H12.8709C13.5653 21.5107 13.9125 21.5107 14.1738 21.322C14.4352 21.1332 14.545 20.8032 14.7646 20.1432L15.0986 19.1457C15.2514 18.7471 15.5275 18.4081 15.8866 18.1781L16.2234 17.9837C16.6422 17.7685 17.1234 17.7084 17.5821 17.8142L18.8023 18.1579C19.5206 18.3618 19.8798 18.4637 20.1974 18.3345C20.515 18.2054 20.7016 17.8814 21.0749 17.2336L21.5685 16.377C21.9184 15.7698 22.0933 15.4662 22.0594 15.143C22.0254 14.8197 21.7912 14.5593 21.3228 14.0383L20.2917 12.8856C20.0397 12.5665 19.8608 12.0107 19.8608 11.5106C19.8608 11.0107 20.0398 10.4547 20.2917 10.1357L21.3228 8.98305C21.7912 8.46211 22.0254 8.20164 22.0594 7.87842C22.0933 7.5552 21.9184 7.25157 21.5685 6.64432Z',
  d4: 'M8.75098 15.5029C9.44961 14.2952 10.7554 13.4826 12.251 13.4826C13.7466 13.4826 15.0524 14.2952 15.751 15.5029M14.251 9.00293C14.251 10.1075 13.3556 11.0029 12.251 11.0029C11.1465 11.0029 10.251 10.1075 10.251 9.00293C10.251 7.89836 11.1465 7.00293 12.251 7.00293C13.3556 7.00293 14.251 7.89836 14.251 9.00293Z',
  d5: 'M13.4565 1.26262C13.2071 1.23405 10.5436 1.26285 10.5436 1.26285C10.2656 1.29469 9.97337 1.3681 9.70064 1.56535C9.42804 1.7625 9.26624 2.01716 9.14844 2.27124C9.04264 2.49946 8.60974 3.7964 8.50959 4.098C8.43185 4.51292 8.0042 5.26594 6.91551 4.95862C6.91551 4.95862 5.04518 4.42953 4.78104 4.38753C4.48729 4.34082 4.16593 4.33486 3.83362 4.47022C3.50143 4.60553 3.27539 4.83436 3.09742 5.073C2.93729 5.28771 1.66743 7.55254 1.66743 7.55254C1.55549 7.81142 1.47292 8.1037 1.50828 8.44076C1.54364 8.77786 1.68508 9.04656 1.84835 9.27647C1.99495 9.48291 3.44422 11.1029 3.44422 11.1029C3.70919 11.4042 4.08015 12.1849 3.44424 12.8969C3.44424 12.8969 1.99495 14.5169 1.84835 14.7234C1.68508 14.9533 1.54364 15.222 1.50828 15.5591C1.47292 15.8961 1.5555 16.1884 1.66743 16.4473C1.66743 16.4473 2.93728 18.7121 3.09741 18.9268C3.27538 19.1654 3.50143 19.3943 3.83363 19.5296C4.16594 19.665 4.48731 19.659 4.78107 19.6123C5.0452 19.5703 6.91546 19.0412 6.91546 19.0412C7.30798 18.9129 8.17632 18.9054 8.50956 19.9018C8.6097 20.2034 9.04264 21.5005 9.14844 21.7287C9.26624 21.9828 9.42803 22.2374 9.70064 22.4346C9.97337 22.6318 10.2657 22.7055 10.5436 22.7373C10.793 22.7659 13.4565 22.7373 13.4565 22.7373C13.7344 22.7055 14.0267 22.6318 14.2994 22.4346C14.572 22.2374 14.7338 21.9828 14.8516 21.7287C14.9574 21.5005 15.3904 20.2034 15.4905 19.9018C15.61 19.4987 16.0962 18.7623 17.0846 19.0412C17.4126 19.1344 18.9549 19.5703 19.219 19.6123C19.5128 19.659 19.8341 19.665 20.1664 19.5296C20.4987 19.3943 20.7247 19.1654 20.9027 18.9268C21.0628 18.7121 22.3326 16.4473 22.3326 16.4473C22.4446 16.1884 22.5272 15.8961 22.4918 15.5591C22.4564 15.222 22.315 14.9533 22.1517 14.7234C22.0051 14.5169 20.7696 13.135 20.5558 12.897C19.9524 12.2214 20.3044 11.4194 20.5559 11.1029C20.6207 11.0307 20.7796 10.8532 20.9736 10.6352C21.419 10.1346 22.0496 9.42028 22.1517 9.27647C22.315 9.04656 22.4564 8.77786 22.4918 8.44076C22.5272 8.10369 22.4446 7.81142 22.3326 7.55254L20.9027 5.073C20.7247 4.83436 20.4986 4.60553 20.1665 4.47022C19.8342 4.33486 19.5128 4.34082 19.219 4.38753C18.9549 4.42953 17.4126 4.86535 17.0846 4.95862C16.1466 5.22321 15.631 4.49511 15.4905 4.09799C15.3903 3.79641 14.9574 2.49945 14.8516 2.27124C14.7338 2.01716 14.572 1.7625 14.2994 1.56535C14.0267 1.3681 13.7344 1.29446 13.4565 1.26262ZM12.0002 6.75098C10.4814 6.75098 9.25015 7.98219 9.25015 9.50098C9.25015 11.0198 10.4814 12.251 12.0002 12.251C13.5189 12.251 14.7502 11.0198 14.7502 9.50098C14.7502 7.98219 13.5189 6.75098 12.0002 6.75098ZM9.14933 16.3765C9.71941 15.391 10.7831 14.7307 12.0001 14.7307C13.2171 14.7307 14.2808 15.391 14.8509 16.3765C15.0583 16.7351 15.5171 16.8576 15.8757 16.6502C16.2342 16.4428 16.3567 15.984 16.1493 15.6254C15.3222 14.1955 13.7743 13.2307 12.0001 13.2307C10.226 13.2307 8.6781 14.1955 7.85092 15.6254C7.64351 15.984 7.76603 16.4428 8.12458 16.6502C8.48313 16.8576 8.94192 16.7351 9.14933 16.3765Z',
  d6: 'M10.5436 1.26285C10.5436 1.26285 13.2071 1.23405 13.4565 1.26262C13.7344 1.29446 14.0267 1.3681 14.2994 1.56535C14.572 1.7625 14.7338 2.01716 14.8516 2.27124C14.9574 2.49945 15.3903 3.79641 15.4905 4.09799C15.631 4.49511 16.1466 5.22321 17.0846 4.95862C17.4126 4.86535 18.9549 4.42953 19.219 4.38753C19.5128 4.34082 19.8342 4.33486 20.1665 4.47022C20.4986 4.60553 20.7247 4.83436 20.9027 5.073L22.3326 7.55254C22.4446 7.81142 22.5272 8.10369 22.4918 8.44076C22.4564 8.77786 22.315 9.04656 22.1517 9.27647C22.0496 9.42028 21.419 10.1346 20.9736 10.6352C20.7796 10.8532 20.6207 11.0307 20.5559 11.1029C20.3044 11.4194 19.9524 12.2214 20.5558 12.897C20.7696 13.135 22.0051 14.5169 22.1517 14.7234C22.315 14.9533 22.4564 15.222 22.4918 15.5591C22.5272 15.8961 22.4446 16.1884 22.3326 16.4473C22.3326 16.4473 21.0628 18.7121 20.9027 18.9268C20.7247 19.1654 20.4987 19.3943 20.1664 19.5296C19.8341 19.665 19.5128 19.659 19.219 19.6123C18.9549 19.5703 17.4126 19.1344 17.0846 19.0412C16.0962 18.7623 15.61 19.4987 15.4905 19.9018C15.3904 20.2034 14.9574 21.5005 14.8516 21.7287C14.7338 21.9828 14.572 22.2374 14.2994 22.4346C14.0267 22.6318 13.7344 22.7055 13.4565 22.7373C13.4565 22.7373 10.793 22.7659 10.5436 22.7373C10.2657 22.7055 9.97337 22.6318 9.70064 22.4346C9.42803 22.2374 9.26624 21.9828 9.14844 21.7287C9.04264 21.5005 8.6097 20.2034 8.50956 19.9018C8.17632 18.9054 7.30798 18.9129 6.91546 19.0412C6.91546 19.0412 5.0452 19.5703 4.78107 19.6123C4.48731 19.659 4.16594 19.665 3.83363 19.5296C3.50143 19.3943 3.27538 19.1654 3.09741 18.9268C2.93728 18.7121 1.66743 16.4473 1.66743 16.4473C1.5555 16.1884 1.47292 15.8961 1.50828 15.5591C1.54364 15.222 1.68508 14.9533 1.84835 14.7234C1.99495 14.5169 3.44424 12.8969 3.44424 12.8969C4.08015 12.1849 3.70919 11.4042 3.44422 11.1029C3.44422 11.1029 1.99495 9.48291 1.84835 9.27647C1.68508 9.04656 1.54364 8.77786 1.50828 8.44076C1.47292 8.1037 1.55549 7.81142 1.66743 7.55254C1.66743 7.55254 2.93729 5.28771 3.09742 5.073C3.27539 4.83436 3.50143 4.60553 3.83362 4.47022C4.16593 4.33486 4.48729 4.34082 4.78104 4.38753C5.04518 4.42953 6.91551 4.95862 6.91551 4.95862C8.0042 5.26594 8.43185 4.51292 8.50959 4.098C8.60974 3.7964 9.04264 2.49946 9.14844 2.27124C9.26624 2.01716 9.42804 1.7625 9.70064 1.56535C9.97337 1.3681 10.2656 1.29469 10.5436 1.26285Z',
  d7: 'M9.25015 9.50098C9.25015 7.98219 10.4814 6.75098 12.0002 6.75098C13.5189 6.75098 14.7502 7.98219 14.7502 9.50098C14.7502 11.0198 13.5189 12.251 12.0002 12.251C10.4814 12.251 9.25015 11.0198 9.25015 9.50098Z',
  d8: 'M12.0001 14.7307C10.7831 14.7307 9.71941 15.391 9.14933 16.3765C8.94192 16.7351 8.48313 16.8576 8.12458 16.6502C7.76603 16.4428 7.64351 15.984 7.85092 15.6254C8.6781 14.1955 10.226 13.2307 12.0001 13.2307C13.7742 13.2307 15.3222 14.1955 16.1493 15.6254C16.3567 15.984 16.2342 16.4428 15.8757 16.6502C15.5171 16.8576 15.0583 16.7351 14.8509 16.3765C14.2808 15.391 13.2172 14.7307 12.0001 14.7307Z',
  d9: 'M14.9527 2H9.04738V4.58152L7.15473 5.69367L4.95267 4.40192L2 9.59808L4.20152 10.8895L4.20153 13.1106L2.0001 14.4019L4.95277 19.5981L7.15477 18.3064L9.04738 19.4185V22H14.9527V19.4185L16.8453 18.3064L19.0472 19.5981L21.9999 14.4019L19.7986 13.1106L19.7986 10.8894L22 9.59808L19.0473 4.40192L16.8453 5.69363L14.9527 4.58152V2Z',
  d10: 'M9.0475 1.25C8.63329 1.25 8.2975 1.58579 8.2975 2V4.15233L7.15452 4.82396L5.33227 3.75501C5.15915 3.65346 4.95256 3.62553 4.75869 3.67747C4.56483 3.72941 4.39987 3.85689 4.30071 4.03139L1.34804 9.22754C1.14539 9.58417 1.26683 10.0374 1.62064 10.245L3.45164 11.3191L3.45164 12.681L1.62074 13.755C1.26693 13.9626 1.14549 14.4158 1.34814 14.7725L4.30081 19.9686C4.39997 20.1431 4.56493 20.2706 4.75879 20.3225C4.95266 20.3745 5.15925 20.3465 5.33237 20.245L7.15457 19.1761L8.2975 19.8477V22C8.2975 22.4142 8.63329 22.75 9.0475 22.75H14.9528C15.367 22.75 15.7028 22.4142 15.7028 22V19.8477L16.8457 19.1761L18.6679 20.245C18.841 20.3465 19.0476 20.3745 19.2414 20.3225C19.4353 20.2706 19.6003 20.1431 19.6994 19.9686L22.6521 14.7725C22.8547 14.4158 22.7333 13.9626 22.3795 13.755L20.5487 12.681L20.5487 11.319L22.3796 10.245C22.7334 10.0374 22.8548 9.58417 22.6522 9.22754L19.6995 4.03139C19.6004 3.85689 19.4354 3.72941 19.2415 3.67747C19.0477 3.62553 18.8411 3.65346 18.668 3.75501L16.8458 4.82393L15.7028 4.15233V2C15.7028 1.58579 15.367 1.25 14.9528 1.25H9.0475ZM12.0003 6.75C10.4815 6.75 9.25031 7.98122 9.25031 9.5C9.25031 11.0188 10.4815 12.25 12.0003 12.25C13.5191 12.25 14.7503 11.0188 14.7503 9.5C14.7503 7.98122 13.5191 6.75 12.0003 6.75ZM9.14948 16.3755C9.71957 15.39 10.7833 14.7297 12.0003 14.7297C13.2173 14.7297 14.281 15.39 14.8511 16.3755L16.1495 15.6244C15.3223 14.1945 13.7744 13.2297 12.0003 13.2297C10.2262 13.2297 8.67825 14.1945 7.85107 15.6244L9.14948 16.3755Z',
};

export const IconAccountSetting02StrokeRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-stroke-rounded IconAccountSetting02StrokeRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02DuotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-duotone-rounded IconAccountSetting02DuotoneRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d3} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d3} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        d={d.d4} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02TwotoneRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-twotone-rounded IconAccountSetting02TwotoneRounded"
    >
      <path 
        d={d.d1} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinecap="round" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02SolidRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-solid-rounded IconAccountSetting02SolidRounded"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d5} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02BulkRounded: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-bulk-rounded IconAccountSetting02BulkRounded"
    >
      <path 
        opacity="var(--icon-opacity)" 
        d={d.d6} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d7} 
        fill="var(--icon-fill)" 
      />
      <path 
        d={d.d8} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02StrokeSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-stroke-sharp IconAccountSetting02StrokeSharp"
    >
      <path 
        d={d.d9} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
        strokeLinejoin="round" 
      />
      <path 
        d={d.d2} 
        stroke="var(--icon-stroke)" 
        strokeWidth="var(--icon-stroke-width)" 
      />
    </TheIconWrapper>
  );
};

export const IconAccountSetting02SolidSharp: FC<TheIconProps> = (props: TheIconProps): JSX.Element => {
  return (
    <TheIconWrapper
      {...props}
      name="account-setting-02-solid-sharp IconAccountSetting02SolidSharp"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={d.d10} 
        fill="var(--icon-fill)" 
      />
    </TheIconWrapper>
  );
};

export const iconPackOfAccountSetting02: TheIconSelfPack = {
  name: 'AccountSetting02',
  StrokeRounded: IconAccountSetting02StrokeRounded,
  DuotoneRounded: IconAccountSetting02DuotoneRounded,
  TwotoneRounded: IconAccountSetting02TwotoneRounded,
  SolidRounded: IconAccountSetting02SolidRounded,
  BulkRounded: IconAccountSetting02BulkRounded,
  StrokeSharp: IconAccountSetting02StrokeSharp,
  SolidSharp: IconAccountSetting02SolidSharp,
};