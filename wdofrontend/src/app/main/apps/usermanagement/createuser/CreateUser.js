import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import { useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Step, StepContent, StepLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import StepInfo from './StepInfo';
import CreateUserProgress from './CreateUserProgress';

import Page1 from './subpages/Page1';
import Page2 from './subpages/Page2';
import Page3 from './subpages/Page3';
import Page4 from './subpages/Page4';
import Page5 from './subpages/Page5';

function CreateUser() {
  const [usersteps, setSteps] = useState({
    title: "Create A New User",
    steps: [
      { order: 0, title: 'Personal Details', subtitle: 'Enter your Personal details' },
      { order: 1, title: 'Qualification Details', subtitle: 'Enter your Qualification details' },
      { order: 2, title: 'Address', subtitle: 'Enter your Address' },
      { order: 3, title: 'Industry Experience', subtitle: 'Enter your Industry experience' },
      { order: 4, title: 'Document Upload', subtitle: 'Enter your Document upload' },
    ],
    currentStep: 1,
    totalSteps: 5,
  });
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const theme = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const pageLayout = useRef(null);
  const currentStep = usersteps.currentStep;

  function updateCurrentStep(index) {
    if (index > usersteps.totalSteps || index <= 0) {
      return;
    }
    setSteps(prevState => (
      {
        ...prevState,
        currentStep: index
      }));
  }

  function handleNext() {
    updateCurrentStep(currentStep + 1);
  }

  function handleBack() {
    updateCurrentStep(currentStep - 1);
  }

  function handleStepChange(index) {
    updateCurrentStep(index + 1);
  }

  const activeStep = currentStep !== 0 ? currentStep : 1;

  let mainContent = null;

  console.log(usersteps.currentStep);

  switch (usersteps.currentStep) {
    case 1:
      mainContent = (<div
        className="flex justify-center p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16"
      >
        <Paper className="w-full mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
          <div
            className="prose prose-sm dark:prose-invert w-full max-w-full"
            dir={theme.direction}
          />
          <Page1 />
        </Paper>
      </div>);
      break;
    case 2:
      mainContent = (<div
        className="flex justify-center p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16"
      >
        <Paper className="w-full mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
          <div
            className="prose prose-sm dark:prose-invert w-full max-w-full"
            dir={theme.direction}
          />
          <Page2 />
        </Paper>
      </div>);
      break;
    case 3:
      mainContent = (<div
        className="flex justify-center p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16"
      >
        <Paper className="w-full mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
          <div
            className="prose prose-sm dark:prose-invert w-full max-w-full"
            dir={theme.direction}
          />
          <Page3 />
        </Paper>
      </div>);
      break;
    case 4:
      mainContent = (<div
        className="flex justify-center p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16"
      >
        <Paper className="w-full mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
          <div
            className="prose prose-sm dark:prose-invert w-full max-w-full"
            dir={theme.direction}
          />
          <Page4 />
        </Paper>
      </div>);
      break;
    case 5:
      mainContent = (<div
        className="flex justify-center p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16"
      >
        <Paper className="w-full mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
          <div
            className="prose prose-sm dark:prose-invert w-full max-w-full"
            dir={theme.direction}
          />
          <Page5 />
        </Paper>
      </div>);
      break;
    default:
      break;
  }

  return (
    <FusePageSimple
      content={
        <div className="w-full">
          <SwipeableViews index={0} enableMouseEvents onChangeIndex={handleStepChange}>
            {mainContent}
          </SwipeableViews>
          <Hidden lgDown>
            <div className="flex justify-center w-full sticky bottom-0 p-16 pb-32 z-10">
              <ButtonGroup
                variant="contained"
                aria-label=""
                className="rounded-full"
                color="secondary"
              >
                <Button
                  className="min-h-56 rounded-full"
                  size="large"
                  startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
                  onClick={handleBack}
                >
                  Prev
                </Button>
                <Button
                  className="pointer-events-none min-h-56"
                  size="large"
                >{`${activeStep}/${usersteps.totalSteps}`}</Button>
                <Button
                  className="min-h-56 rounded-full"
                  size="large"
                  endIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-right</FuseSvgIcon>}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </Hidden>

          <Hidden lgUp>
            <Box
              sx={{ backgroundColor: 'background.paper' }}
              className="flex sticky bottom-0 z-10 items-center w-full p-16 border-t-1"
            >
              <IconButton
                onClick={(ev) => setLeftSidebarOpen(true)}
                aria-label="open left sidebar"
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
              </IconButton>

              <Typography className="mx-8">{`${activeStep}/${usersteps.totalSteps}`}</Typography>

              <CreateUserProgress className="flex flex-1 mx-8" steps={usersteps} />

              <IconButton onClick={handleBack}>
                <FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>
              </IconButton>

              <IconButton onClick={handleNext}>
                <FuseSvgIcon>heroicons-outline:arrow-narrow-right</FuseSvgIcon>
              </IconButton>
            </Box>
          </Hidden>
        </div>
      }


      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarWidth={300}
      leftSidebarContent={
        <>
          <div className="p-32">
            <StepInfo steps={usersteps} />
          </div>
          <Divider />
          <Stepper classes={{ root: 'p-32' }} activeStep={activeStep - 1} orientation="vertical">
            {usersteps.steps.map((step, index) => {
              return (
                <Step
                  key={index}
                  sx={{
                    '& .MuiStepLabel-root, & .MuiStepContent-root': {
                      cursor: 'pointer!important',
                    },
                    '& .MuiStepContent-root': {
                      color: 'text.secondary',
                      fontSize: 13,
                    },
                  }}
                  onClick={() => handleStepChange(step.order)}
                  expanded
                >
                  <StepLabel
                    className="font-medium"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: 'background.default',
                        '& .MuiStepIcon-text': {
                          fill: (_theme) => _theme.palette.text.secondary,
                        },
                        '&.Mui-completed': {
                          color: 'secondary.main',
                          '& .MuiStepIcon-text ': {
                            fill: (_theme) => _theme.palette.secondary.contrastText,
                          },
                        },
                        '&.Mui-active': {
                          color: 'secondary.main',
                          '& .MuiStepIcon-text ': {
                            fill: (_theme) => _theme.palette.secondary.contrastText,
                          },
                        },
                      },
                    }}
                  >
                    {step.title}
                  </StepLabel>
                  <StepContent>{step.subtitle}</StepContent>
                </Step>
              );
            })}
          </Stepper>
        </>
      }
      scroll="content"
      ref={pageLayout}
    />
  );
}

export default CreateUser;
