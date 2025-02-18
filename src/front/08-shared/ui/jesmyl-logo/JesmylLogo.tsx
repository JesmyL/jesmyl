import './JesmylLogo.scss';

export default function JesmylLogo(props: { className?: string; onAnimationIteration?: () => void }) {
  return (
    <div
      onAnimationIteration={props.onAnimationIteration}
      className={`jesmyl-smile ${props.className || ''}`}
    >
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 306 386.64"
        className="smile-container"
      >
        <path
          className="smile-dot"
          d="M82.54,2.24c13.69,5.94,19.98,21.85,14.05,35.55S74.74,57.77,61.04,51.83C47.35,45.9,41.06,29.98,47,16.29
    C52.93,2.59,68.84-3.7,82.54,2.24z"
        />
        <path
          className="smile-line"
          d="M160.32,30.33c68.8,21.21,118.35,85.23,118.35,160.92c0,93-75.47,168.39-168.57,168.39
c-30.08,0-58.32-7.87-82.76-21.66"
        />
      </svg>
    </div>
  );
}
