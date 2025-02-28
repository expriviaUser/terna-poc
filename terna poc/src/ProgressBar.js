import ProgressBar  from 'react-bootstrap/ProgressBar';

function ProgressBarLabel({now, variant}) {
  return <ProgressBar now={now} variant={variant} label={`${now}%`} />;
}

export default ProgressBarLabel;