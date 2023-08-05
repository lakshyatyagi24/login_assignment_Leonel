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
  industry_name: yup.string().required('You must enter industry_name'),
  designation: yup.string().required('You must enter designation'),
  salary: yup.string().required('You must enter salary'),
  user_experiences: yup.string().required('You must enter experience'),
});


const defaultValues = {
  industry_name: "",
  designation: "",
};

const IndustryExperienceDetails = React.forwardRef((props, ref) => {
  const { control, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  const childFunction = () => {
    var validater = 0;
    Object.values(control._formValues).forEach(value => {
      if (value == '' || value == null) {
        validater = 1;
      }
    })
    if (Object.keys(errors).length || validater) { return 0; }
    return control._formValues; 
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));


  return (
    <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <form>
        <Grid container spacing={2}>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                name="industry_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Industry Name"
                    autoFocus
                    type="name"
                    error={!!errors.industry_name}
                    helperText={errors?.industry_name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Designation"
                    autoFocus
                    type="name"
                    error={!!errors.designation}
                    helperText={errors?.designation?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Salary"
                    autoFocus
                    type="number"
                    error={!!errors.salary}
                    helperText={errors?.salary?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="user_experiences"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Total Year of Experience"
                    autoFocus
                    type="number"
                    error={!!errors.user_experiences}
                    helperText={errors?.user_experiences?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
})

export default IndustryExperienceDetails;
