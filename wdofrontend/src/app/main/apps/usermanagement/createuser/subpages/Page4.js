import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';

import Cookies from 'js-cookie';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required('You must enter First name'),
  lastName: yup.string().required('You must enter Last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});


const defaultValues = {
  industry_name: "",
  designation: "",
  salary: 0,
  user_experiences: 0
};

function Page4() {

  const [paneCount, setState] = useState(1);

  const {control, formState} = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  return (
    <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <form>
        <Grid container spacing={2}>
          
          {pane}
          <Grid item xs={1}>
            <Button variant="contained" color="success">
              +Add
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="warning">
              -Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Page4;
