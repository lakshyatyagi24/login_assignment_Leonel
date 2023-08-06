import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import SubPage4 from './SubPage4';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  industry_name: yup.string().required('You must enter industry_name'),
  designation: yup.string().required('You must enter designation'),
  salary: yup.string().required('You must enter salary'),
  user_experiences: yup.string().required('You must enter experience'),
});

const Page4 = React.forwardRef((props, ref) => {

  const [paneData, setData] = useState([]);

  const childComponentRef = useRef(null);
  const [paneCount, setCount] = useState(1)

  const childFunction = () => {
    var data = childComponentRef.current.childFunction();
    if (data == 0) { return 0 }
    var prevPaneData = paneData;
    prevPaneData.push(data);
    return prevPaneData;
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));

  const addPane = () => {
    var count = paneCount + 1;
    if (count < 7) {
      var data = childComponentRef.current.childFunction();
      if (data == 0) { return }
      setCount(count);
      var prevPaneData = paneData;
      prevPaneData.push(data);
      setData(prevPaneData);
    }
  }

  const deletePane = () => {
    var count = paneCount;
    if (count > 1) {
      setCount(count - 1);
      var prevPaneData = paneData.slice(0, count - 1);
      setData(prevPaneData);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <form>
        {
          new Array(paneCount).fill(0).map((val, index) => {
            return (
              <SubPage4 key={index} ref={childComponentRef} />
            )
          })
        }
      </form>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button variant="contained" color="success" onClick={addPane}>
            +Add
          </Button>
          <Grid />
        </Grid><Grid item xs={1}>
          <Button variant="contained" color="error" onClick={deletePane}>
            -Delete
          </Button>
        </Grid>
      </Grid >
    </Box>
  );
})

export default Page4;
