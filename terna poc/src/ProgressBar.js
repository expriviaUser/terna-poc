import ProgressBar  from 'react-bootstrap/ProgressBar';

function ProgressBarLabel(now) {
  return <ProgressBar  now={now} label={`${now}%`} />;
}

export default ProgressBarLabel;