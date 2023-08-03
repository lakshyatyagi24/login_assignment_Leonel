import LinearProgress from '@mui/material/LinearProgress';
import clsx from 'clsx';

function CreateUserProgress({ steps, className }) {
  return (
    <LinearProgress
      className={clsx('w-full h-2', className)}
      variant="determinate"
      value={(steps.progress.currentStep * 100) / steps.totalSteps}
      color="secondary"
    />
  );
}

export default CreateUserProgress;
