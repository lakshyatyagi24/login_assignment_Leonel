import { memo } from 'react';
import Box from '@mui/material/Box';

function SplashScreen() {
  return (
    <div id="splash-screen">
      <div className="logo">
        <img width="500" src="assets/images/logo/wdo-logo01.png" alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          '& > div': {
            backgroundColor: 'yellow',
          },
        }}
      >
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </Box>
    </div>
  );
}

export default memo(SplashScreen);
