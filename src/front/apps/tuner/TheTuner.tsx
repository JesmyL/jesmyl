import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { useEffect, useState } from 'react';
import { TunerApplication } from './app';
import './Tuner.scss';
import './TunerStyle.scss';

let tunerContainer: HTMLDivElement | und;
let tunerApplication: (TunerApplication & { frequencyData?: Uint8Array }) | und;
const effect = () => () => (tunerContainer = undefined);

export function TheTuner() {
  const [started, setStarted] = useState(false);

  useEffect(effect, []);

  return (
    <PageContainerConfigurer
      className="tuner-application"
      withoutBackButton
      headTitle="Тюнер"
      contentClass={`tuner-container p-2 ${started ? 'started' : ''}`}
      content={
        <>
          <div
            ref={elem => {
              if (elem && !tunerContainer) {
                tunerContainer = elem;
                setTimeout(() => {
                  tunerApplication = new TunerApplication();
                  tunerApplication.start();
                });
              }
            }}
            className="start-button"
            onClick={() => {
              setStarted(true);
              if (tunerApplication == null) return;
              tunerApplication.tuner.init();
              tunerApplication.frequencyData = new Uint8Array(tunerApplication.tuner.analyser?.frequencyBinCount ?? 0);
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
