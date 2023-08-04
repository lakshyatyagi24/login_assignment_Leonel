import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';

function StepInfo({ steps, className }) {
  if (!steps) {
    return null;
  }

  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between mb-16">
        {steps.currentStep > 0 && (
          <FuseSvgIcon className="text-green-600" size={25}>
            heroicons-solid:badge-check
          </FuseSvgIcon>
        )}
      </div>

      <Typography className="text-16 font-medium">{steps.title}</Typography>
      <Typography className="flex items-center space-x-6 text-13 mt-8" color="text.secondary">
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-solid:academic-cap
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          {steps.currentStep === 2 && 'Completed once'}
          {steps.currentStep === 3 && 'Completed twice'}
          {steps.currentStep > 3 && `Completed ${steps.currentStep-1} times`}
          {steps.currentStep <= 1 && 'Never completed'}
        </span>
      </Typography>
    </div>
  );
}

export default StepInfo;
