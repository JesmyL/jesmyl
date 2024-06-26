import { useEffect, useState } from 'react';
import PhaseContainerConfigurer from '../../../complect/phase-container/PhaseContainerConfigurer';
import { TunerApplication } from './app';
import './TunerStyle.scss';
import './Tuner.scss';
import useTunerNav from './useTunerNav';

let tunerContainer: HTMLDivElement | null;
let tunerApplication: any;

export default function TheTuner() {
  const [started, setStarted] = useState(false);

  useEffect(
    () => () => {
      tunerContainer = null;
    },
    [],
  );

  const { goBack } = useTunerNav();

  return (
    <PhaseContainerConfigurer
      goBack={goBack}
      className="tuner-application"
      withoutBackButton
      headTitle="Тюнер"
      contentClass={`tuner-container ${started ? 'started' : ''}`}
      content={
        <>
          <div
            ref={elem => {
              if (elem && !tunerContainer) {
                tunerContainer = elem;
                tunerApplication = new TunerApplication();
                tunerApplication.start();
              }
            }}
            className="start-button"
            onClick={() => {
              setStarted(true);
              tunerApplication.tuner.init();
              tunerApplication.frequencyData = new Uint8Array(tunerApplication.tuner.analyser.frequencyBinCount);
            }}
          >
            Start
          </div>
          <div className="tuner-content">
            <canvas className="frequency-bars" />
            <div className="meter">
              <div className="meter-dot" />
              <div className="meter-pointer" />
            </div>
            <div className="notes">
              <div className="notes-list" />
              <div className="frequency">
                {' '}
                <span>Hz</span>
              </div>
            </div>
            <div
              hidden
              className="a4"
            >
              A<sub>4</sub> = <span>440</span> Hz
            </div>
          </div>
        </>
      }
    />
  );
}
